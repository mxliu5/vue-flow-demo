import { defineConfig } from 'vitepress'
import path from 'path'
import { mdPlugin } from './config/plugins'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "turing-ui-frame",
  description: "基于vue3+vite开发的前端公共框架",
  lang: 'cn-ZH',
  base: '/turing-ui-frame/',
  lastUpdated: true,
  themeConfig: {
    logo: '/logo.svg',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '指南', link: '/guide/base/index.md', activeMatch: '/guide/'},
      { text: '组件',  link: '/components/button/base.md', activeMatch: '/components/'},
      { text: '案例页面',  link: 'https://mxliu5.github.io/turing-ui-frame-page/#/mock-demo'}
    ],
    sidebar: {
      '/guide/': [
        { 
          text: '基础', 
          items: [
            { text: '基本介绍', link: '/guide/base/index.md' },
            { text: '快速开发', link: '/guide/base/quickstart.md' },
            { text: '补充说明', link: '/guide/base/warning.md' }
          ]
        },
        { 
          text: '使用说明', 
          items: [
            { 
              text: '公共方法介绍',
              items: [
                { text: 'utils', link: '/guide/introduce/function/utils.md', },
                { text: 'hooks', link: '/guide/introduce/function/hooks.md', },
                { text: 'api', link: '/guide/introduce/function/api.md', },
                { text: 'store', link: '/guide/introduce/function/store.md', },
              ]
            },
            { text: '公共样式介绍', link: '/guide/introduce/style.md' },
            { text: '国际化语言配置', link: '/guide/introduce/lang.md' },
            { text: '主题配置', link: '/guide/introduce/theme.md' },
            { text: '面包屑适配', link: '/guide/introduce/breadcrumb.md' },
            { text: '筛选条件缓存', link: '/guide/introduce/filter.md' },
            { text: '一套代码多套系统使用', link: '/guide/introduce/system.md' },
            { text: '实际开发', link: '/guide/introduce/use.md' },
          ]
        },
        { 
          text: '其他', 
          items: [
            { text: '代码源', link: '/guide/code.md' },
            { text: '版本更新说明', link: '/guide/version.md' }
          ]
        }
      ],
      '/components/': [
        {
          text: '公共组件',
          items: [
            { text: 'Button组件', link: '/components/button/base.md', },
            { text: 'Query组件', link: '/components/query/base.md' },
            { text: 'Table组件', link: '/components/table/base.md' },
            { text: 'SvgIcon组件', link: '/components/svg-icon/base.md' },
            { text: 'Empty组件', link: '/components/empty/base.md' },
            { text: 'Query组件', link: '/components/query/base.md' },
            { text: 'Table组件', link: '/components/table/base.md' },
          ]
        },
        {
          text: '业务组件',
          items: [
            { text: 'TablePage', link: '/components/table-page/base.md' },
            { text: 'Form', link: '/components/form/base.md' },
            { text: 'Operation', link: '/components/operation/base.md' },
            { text: 'Pagination', link: '/components/pagination/base.md' },
            { text: 'Dialog', link: '/components/dialog/base.md' },
            { text: 'Drawer', link: '/components/drawer/base.md' },
            { text: 'Upload', link: '/components/upload/base.md' },
          ]
        },
        {
          text: '布局组件',
          items: [
            { text: 'Layout', link: '/components/layout/layout.md' },
            { text: 'Header', link: '/components/layout/header.md' },
            { text: 'Sidebar', link: '/components/layout/sidebar.md' },
            { text: 'Breadcrumb', link: '/components/layout/breadcrumb.md' },
            { text: 'FullscreenPage', link: '/components/layout/fullscreenPage.md' },
          ]
        }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://code.iflytek.com/osc/_source/Y_RDG-TURING/turing-cbb/frontend-code-tpl/turning-ui-frame/-/code/' }
    ],
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    // footer: {
    //   message: 'MIT License.',
    //   copyright: 'Copyright © 2024 turing-ui-frame'
    // },
    search: {
      provider: 'local'
    }
  },
  vite: {
    server: {
      port: 3344,
      proxy: {
      }
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '../../src'), // 设置别名，方便引用
      },
    },
    css: {
      // 添加css预处理器配置
      preprocessorOptions: {
        scss: {
          // additionalData的内容会在每个scss文件的开头自动注入，这样就可以全局使用scss了
          additionalData: '@use "@/styles/vars.scss" as *; @use "@/styles/mixin.scss" as *; @use "@/styles/theme.scss" as *;'
        }
      }
    }
  },
  markdown: {
    headers: {
      level: [0, 0],
    },
    // light: #f9fafb, dark: --vp-code-block-bg
    // theme: { light: 'github-light', dark: 'github-dark' },
    config: (md) => mdPlugin(md),
  }
})
