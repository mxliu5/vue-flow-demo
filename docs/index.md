---
# https://vitepress.dev/reference/default-theme-home-page
layout: home
hero:
  name: "turing-ui-frame"
  text: "基于vue3+vite开发的前端公共框架"
  tagline: "使用vite+vue3技术栈开发的前端框架。框架内部集成了日常开发中常用的公共组件、公共样式、公共方法。另外集成了qiankun可以作为子应用集成到主应用中（可以适配app-main的子应用）。也可以用来作为独立系统开发。开发着重业务开发。公共的部分基本已实现"

  image:
    src: /images/hero.png
    alt: turing-ui-frame
  actions:
    - theme: brand
      text: 指南
      link: /guide/base/index.md
    - theme: brand
      text: 组件预览
      link: /components/button/base.md
    - theme: brand
      text: 案例页面
      link: https://mxliu5.github.io/turing-ui-frame-page/#/mock-demo

features:
  - title: 基础组件
    details: 基于Element-plus二次封装；使用组件 Demo 快速体验交互细节。
  - title: 业务组件
    details: 实际开发项目中公共组件的提取，方便代码统一维护，提高开发效率
  - title: 公共方法集成
    details: 集成了turing-plugin公共方法，实际开发中常见的公共方法
  - title: 主题定制
    details: 支持主题定制，切换不同的主题色
  - title: 国际化语言
    details: 支持国际化语言，可根据实际项目需求集成语言类型
  - title: 支持qiankun集成
    details: 支持作为微应用集成到qiankun主应用中
---

