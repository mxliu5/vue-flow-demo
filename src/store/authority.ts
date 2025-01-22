// 选项式api写法
/* 用户信息管理器 */
import { defineStore } from "pinia";
import { cloneDeep } from "lodash-es";
import { getUserInfo, getAuthorityList } from '@/api/authority'
// 菜单信息转换
const transformMenuData = (data: any) => {
  const result = cloneDeep(data);
  const recursiveFun = (arr: any) => {
    arr.forEach((item: any) => {
      if (item.children && item.children.length > 0) {
        recursiveFun(item.children);
      }
    })
  }
  recursiveFun(result);
  return result;
}

const useAuthorityStore = defineStore(
  "authority",
  {
    state: () => ({
      inited: false as boolean,
      userInfo: {} as any,
      menuList: [] as Array<any>
    }),
    getters: {
      userName: (state) => state.userInfo.userName,
      userName_CN: (state) => state.userInfo.userName_CN,
      orgCode: (state) => state.userInfo.orgCode
    },
    actions: {
      // 获取用户信息
      loadAndSetUserInfo() {
        return new Promise(resolve => {
          // 如果是独立系统访问，则获取uap用户信息，如果是作为子应用集成到主应用，获取主应用传过来的用户信息
          getUserInfo().then((res: any) => {
            this.userInfo = res.data || {}
            resolve(this.userInfo)
          })
        })
      },
      // 获取菜单信息
      loadAndSetAuthorityList () {
        return new Promise(resolve => {
          getAuthorityList().then((res: any) => {
            this.menuList = transformMenuData(res.data)
            resolve(this.menuList)
          })
        })
      },
      // 执行系统接口[包括菜单、用户信息、配置文件等接口]
      initSystemInterface () {
        return new Promise(resolve => {
          Promise.all([this.loadAndSetAuthorityList(), this.loadAndSetUserInfo()]).then((values: Array<any>) => {
            this.inited = true
            resolve(values[0])
          })
        })
      }
    }
  }
);
export default useAuthorityStore