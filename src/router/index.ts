import { RouteRecordRaw } from "vue-router";
const Wrapper = () => import('@/components/layout/Wrapper.vue')

const routes: Array<RouteRecordRaw> = [
  // 管理端页面
  {
    path: "/",
    redirect: '/vue-flow',
    component: () => import('@/components/layout/Layout.vue'),
    children: [
      /* 匹配面包屑，必须通过mock-demo2::detail::detail2这种格式去配置路由名称 */
      {
        path: "/vue-flow",
        redirect: '/vue-flow',
        component: Wrapper,
        children: [
          // 一级面包屑
          {
            path: '',
            name: 'vue-flow',
            meta: { label: '流程画布' }, 
            component: () => import("@/views/vue-flow/index.vue"),
          }
        ]
      },
    ]
  },
  // 门户页面（如果有就在这里配置）
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/components/layout/HomeLayout.vue'),
    children: [
      {
        path: '',
        name: 'Index',
        meta: {label: '首页'},
        component: () => import('@/views/Home/index.vue')
      },
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'page404',
    component: () => import('@/views/page404.vue')
  }
];


export default routes;
