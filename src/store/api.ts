// 组合式api写法
/*
* @Description: 一些公共的接口处理，例如下拉列表数据多处被使用。使用时，直接通过api.getAppList即可，无需重新写接口调用的代码
* @Author: mxliu5
* @Date: 2024-10-16
*/
import { defineStore } from "pinia";
import { getAppList, getCityList } from '@/api/mock';
/*
  下拉列表数据过多时的两种优化方案
  1. 使用虚拟下拉列表 <tu-select> 传参useVirtual 避免一次性加载过多数据到dom上，浏览器超负荷导致卡顿
  2. 使用分页+模糊查询展示：每次查 MAX_TOTAL 条数据，可通过模糊搜索名称来筛选想要的数据
     1)、回显处理：判断详情返回的id是否存在当前的options中，如果存在无需处理可以正常回显，如果不存在则需要将当前数据添加到options列表中（前提条件，能获取到当前数据的名称）
     2)、判断是否需要remote远程搜索根据options的数据量 如果总数据量大于 MAX_TOTAL ，则需要远程搜索，如果小于则不需要
         每次请求的时候total重置为 MAX_TOTAL + 1  因为上一次通过模糊查询得到的数据，下次必须要重新获取后台数据
     */
const useApiStore = defineStore(
  "api",
  () => {
    const MAX_TOTAL: number = 1000
    // 应用列表
    function getAppOptions(search?: string) {
      return new Promise((resolve: any) => {
        getAppList({ page: 1, size: MAX_TOTAL, appName: search }).then((res: any) => {
          const arr = res.content || []
          const list = arr.map((v: any) => {
            return {
              ...v,
              value: v.appId,
              label: v.appName
            }
          })
          let total = MAX_TOTAL + 1
          if (!search) {
            total = res.totalElements
          }
          resolve({
            total,
            list
          })
        })
      })
    }
    // 城市列表
    function getCityOptions() {
      return new Promise((resolve: any) => {
        getCityList().then((res: any) => {
          const data = res || []
          const result = data.map((v: any) => {
            return {
              ...v,
              value: v.id,
              label: v.name
            }
          })
          resolve(result)
        })
      })
    }
    return { MAX_TOTAL, getAppOptions, getCityOptions };
  }
);
export default useApiStore