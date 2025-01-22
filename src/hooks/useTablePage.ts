/*
* @Description: 表格组件公共的方法
* @Author: mxliu5
* @Date: 2024-11-27
*/
import { ref, reactive, watch } from "vue";
import { onBeforeRouteLeave } from 'vue-router'
import { storeToRefs } from "pinia";
import assign from 'lodash/assign'
import useStore from '@/store'
export default (routeName: string = '', emits ? : any) => {
  
  /* 查询相关 */
  const query = ref<any>({})
  const queryItems = ref<any>({})
  const searchQuery = (obj : any) => {
    query.value = assign({}, query.value, obj)
    console.log('当前查询数据', query.value)
  };

  /* 多选 */
  const selectedIds = ref<any>([])
  const handleSelectionChange = (arr: any) => {
    selectedIds.value = arr.map((v: any) => v.id)
  };

  /* 列表页进入详情页，缓存筛选条件 */
  const isCache = routeName ? true : false  // 如果传了routeName则缓存，否则不缓存。routeName作为页面的key唯一标识符
  const { filter } = useStore()
  const { queryCache } = storeToRefs(filter);
  const cacheQuery = reactive({
    // 初始化查询项
    init: () => {
      const curQueryChahe = queryCache.value[routeName]
      // 如果当前列表页有筛选条件有缓存数据，则将缓存数据进行回显
      if (curQueryChahe) {
        query.value = assign({}, query.value, curQueryChahe)
        for (let key in query.value) {
          if (queryItems.value[key]) {
            if (queryItems.value[key].quick) {
              queryItems.value[key].quick.modelValue = query.value[`${key}_quick`]
            }
          }
        }
      }
      return curQueryChahe
    },
    // 缓存查询项
    save: () => {
      // 缓存的内容不仅包括query绑定值，还包括快速选择日期的单选按钮的绑定值，即quick对应的modelValue值
      const obj: any = {...query.value}
      for (let key in queryItems.value) {
        const quick = queryItems.value[key].quick
        if (quick) {
          obj[`${key}_quick`] = quick.modelValue
        }
      }
      filter.saveQueryChche(routeName, obj)
    },
    // 清空缓存的查询条件
    reset: () => {
      filter.resetQueryChche(routeName)
    }
  })
  // queryItems加载完成后再执行筛选条件的回显
  watch(
    () => [queryItems.value, queryCache.value],
    () => {
      if (isCache) {
        const curQueryChahe = cacheQuery.init()
        // 传给父级组件，在父级组件中回显相应的值。如页面的tab标签回显
        if (emits) {
          emits('queryCacheInit', curQueryChahe)
        }
      }
    }
  )
  // 离开当前页面，根据进入的页面是否为详情页来判断是否缓存当前页面的查询项
  onBeforeRouteLeave((to: any, from: any, next) => {
    if (isCache) {
      if (to.name.includes(routeName)) { // 进入详情页，缓存当前查询条件
        cacheQuery.save()
      } else {                           // 进入其他页面，清除查询条件缓存内容
        cacheQuery.reset()
      }
    }
    next()
  })

  return {
    query,
    queryItems,
    searchQuery,
    selectedIds,
    handleSelectionChange,
    cacheQuery
  }
}