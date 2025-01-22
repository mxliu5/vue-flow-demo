// .vitepress/theme/index.ts
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
// 导入element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import locale from 'element-plus/es/locale/lang/zh-cn'
// 图标并进行全局注册
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
/* 引入组件库（基于element-plus二次开发） */
import TuringUI from "turing-ui-vue3"
import "turing-ui-vue3/lib/style.css"
// 全局引入公共组件
import { initComponent } from '../../../src/components'
// 引入demo组件
import { VPDemo } from '../vitepress'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.use(ElementPlus, {locale});
    app.use(TuringUI)
    // 注册所有图标
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
    // 在这里导入所有自定义组件
    initComponent(app) // 注册自定义组件
    app.component('VPDemo', VPDemo)
  }
} satisfies Theme