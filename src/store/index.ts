import useAuthorityStore from "./authority";
import useMenuStore from "./menu";
import useThemeStore from "./theme";
import useApiStore from "./api";
import useFilterStore from "./filter";
// 统一导出useStore方法
export default function useStore() {
  return {
    authority: useAuthorityStore(),
    menu: useMenuStore(),
    theme: useThemeStore(),
    api: useApiStore(),
    filter: useFilterStore()
  };
}
