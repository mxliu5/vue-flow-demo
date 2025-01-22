// 选项式api写法
/* 列表页进入详情页后，返回到列表页，保存上一次筛选条件的值 */
import { defineStore } from "pinia";
const useFilterStore = defineStore(
  "filter",
  {
    state: () => ({
      queryCache: {} as any        // 进入详情页缓存的值；以页面路由名称为key.每个页面对应一个值
    }),
    actions: {
      // 保存当前页面查询条件的值
      saveQueryChche(key:string, obj: any) {
        if (key) {
          this.queryCache[key] = obj
        }
      },
      // 清空当前页面查询条件的值
      resetQueryChche(key: string) {
        if (key) {
          this.queryCache[key] = null
        }
      }
    }
  }
);
export default useFilterStore