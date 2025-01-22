# Vite + Vue 3 + TypeScript + Element-plus的通用管理端框架

`公共的逻辑代码部分已实现，开发着重于业务开发即可`

## 技术栈

| 技术栈 | 版本号 | 官网地址 |
|-|-|-|
| Vite |`^4.3.9`| https://v3.vitejs.dev/                                       |
| Vue3 |`^3.2.47`| https://cn.vuejs.org/guide/introduction.htmlElement-plus https://element-plus.org/zh-CN/#/zh-CN |
| typescript |`^5.0.2`| https://www.tslang.cn/docs/handbook/basic-types.html#google_vignette |
| Element-plus|`^2.8.4`| https://element-plus.org/zh-CN/guide/design.html|
| echarts |`^5.5.0`| https://echarts.apache.org/examples/zh/index.html            |
| pinia   |`^2.1.4`| https://pinia.vuejs.org/zh/core-concepts/state.html          |
| vue-i18n |`^9.2.2`| https://vue-i18n.intlify.dev/api/general.html               |
| sass     |`^1.63.6`| https://www.sass.hk/guide/                                   |
| lodash-es |`^4.17.21`| https://www.lodashjs.com/                                    |
| turing-plugin |`^1.1.6`| 内部开发的公共方法库：https://mxliu5.github.io/turing-plugin |
| turing-ui-vue3 |`^0.0.4`| 内部开发的公共组件库：https://mxliu5.github.io/turing-ui-vue3 |



## 命令
- npm i               安装依赖包
- npm run dev         本地执行
- npm run build       打包构建
- npm run docs:dev    本地打开框架使用说明文档
- npm run docs:build  打包构建框架使用说明文档
- npm run docs:preview 预览框架使用说明文档


## 开发前阅读
公共组件、公共方法、公共样式使用已封装的，无需自行封装重复的（方便后期统一维护）。若有改动，请在已有组件/方法进行调整
