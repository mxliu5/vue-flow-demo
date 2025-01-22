// 选项式api写法
import { defineStore } from "pinia";
const useMenuStore = defineStore(
  "menu",
  {
    state: () => ({
      isCollapse: false
    }),
    actions: {
      collapseChange(bool: boolean) {
        this.isCollapse = bool
      }
    }
  }
);
export default useMenuStore