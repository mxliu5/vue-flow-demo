import { createApp } from 'vue'
import App from './App.vue'
import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/dist/helper'
import { createRouter, createWebHashHistory, RouterHistory } from 'vue-router'
import { createPinia } from 'pinia'
import routes from '@/router'
import i18n from '@/utils/i18n'
import useStore from '@/store'
import { errorMessage } from '@/utils/app-tip'
import { $t } from '@/utils/constants'
import { storeC } from 'turing-plugin'
/* 引入element-plus */
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
/* 引入组件库（基于element-plus二次开发） */
import TuringUI from "turing-ui-vue3"
import "turing-ui-vue3/lib/style.css"
/* 引入当前项目公共组件（仅在当前项目中通用的业务组件） */
import { initComponent } from '@/components'
/* 其他 */
import 'virtual:svg-icons-register'; // 注册svg图标
import '@/styles/index.scss'         // 引入公共样式文件


/* 国际化 */
import zhCN from "element-plus/es/locale/lang/zh-cn";
import en from "element-plus/es/locale/lang/en";
const localeKey = storeC.getLocalstorage('localeKey') || 'zh-cn'

const getLocale = () => {
  switch (localeKey) {
    case 'zh-cn': // 中文
      return zhCN
    case 'en': // 英语
      return en
  }
}

/* 配置qiankun */
let app: any = null
let router = null
let history: RouterHistory
const pinia = createPinia()
function render(props: any = {}) {
  const { container } = props
  app = createApp(App)
  // 全局注册props
  app.config.globalProperties.$microProps = props
  history = createWebHashHistory(
    qiankunWindow.__POWERED_BY_QIANKUN__ ? '/' : '/'
  )
  app.use(ElementPlus, { locale: getLocale() }) // element-plus国际化
  app.use(TuringUI, { locale:  localeKey}) // turing-ui国际化
  initComponent(app) // 注册自定义组件
  // 注册所有elemement-icon
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
  router = createRouter({
    history,
    routes
  })
  app.use(router)
  app.use(pinia)
  app.use(i18n)
  app?.mount(container ? container.querySelector('#app') : '#app')
  if (qiankunWindow.__POWERED_BY_QIANKUN__) {
    console.log('我正在作为子应用运行。。。');
  } else {
    routeInterception(router) // 路由拦截
  }
}
renderWithQiankun({
  mount(props: any) {
    render(props)
  },
  bootstrap() {},
  update() {},
  unmount(props: any) {
    console.log('unmount', props)
    app.unmount()
    app._container.innerHTML = ''
    app = null
    history.destroy() // 不卸载router会导致其他应用路由失败
    router = null
  }
})
if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  render({});
}

// 路由拦截
function routeInterception (router: any) {
  router.beforeEach( async (to: any, from: any, next: any) => {
    const { authority } = useStore();
    // 如果首次进入系统，则需要初始化相关接口获取菜单信息，否则直接使用之前调用获取的接口数据
    const menuList: any = authority.inited ? authority.menuList : await authority.initSystemInterface()
    // 根据权限菜单进行页面访问权限控制
    function getPermissionList (data: Array<any>) {
      let list: Array<any> = []
      const recursiveFun = (arr: any) => {
        arr.forEach((item: any) => {
          if (item.children && item.children.length > 0) {
            recursiveFun(item.children);
          } else {
            list.push(item)
          }
        })
      }
      recursiveFun(data)
      return list
    }
    const permissionList = getPermissionList(menuList)
    if (permissionList.findIndex((v: any) => to.path.includes(v.url)) === -1) {
      errorMessage({message: $t('tip.noPermission')})
    } else {
      next()
    }
  })
}
