# 面包屑适配

## 匹配规则
:::info 说明：
面包屑是通过`mockDemo::detail::detail2`这种格式匹配的，适配面包屑需要遵循以下规则：
:::

1. 详情页路由名称以`::`分隔开
2. 所有路由需配置meta: `{ label: '面包屑名称' }`
3. 类似于 `列表页/详情页/详情页的详情页（mockDemo::detail::detail2`）配置说明如下：
:::info 配置说明：
- 放在一个路由下面进行配置。父级路由最终跳转的地址为列表页。并且列表页的路由path设置为'' 这样能够保证父级路由地址就是列表的路由地址  
- 如果有三级页面，那么中间那个页面需要通过`params`传参，并且路由设置成`detail/:id`格式，参考下面路由配置
:::

## 路由配置
```javascript
{
   path: "/mock-demo",
   redirect: '/mock-demo',
   component: Wrapper,
   children: [
     // 一级面包屑
     {
       path: '', // 这里的path设置为''  保证父级路由跳转的最终页面均为list.vue
       name: 'mockDemo',
       meta: { label: 'demo列表' },
       component: () => import("@/views/mock-demo/demo1/list.vue"),
     },
     // 二级面包屑
     {
       path: "detail/:id",  // 如果有三级页面，则参数通过params传参，这样通过点击面包屑回到二级页面，参数不会丢失
       name: "mockDemo::detail",
       meta: { label: '详情' },
       component: () => import("@/views/mock-demo/demo1/detail.vue"),
     },
     // 三级面包屑
     {
       path: "detail/:id/detail2",  // 需要将二级页面地址带上
       name: "mockDemo::detail::detail2",
       meta: { label: '详情页的详情页' },
       component: () => import("@/views/mock-demo/demo1/detail2.vue"),
     }
   ]
}
```

## 页面配置
```vue
<script lang="ts" setup>
   const routeName = 'mock-demo'  // 当前页面的路由名称
   const toDetail = (record: any) => {
      $router.push({
          name: `${routeName}::detail`,
          // 如果跳转的详情页不是最后一层页面，需要通过params传参，否则使用query的话通过面包返回时参数会丢失
          params: {
           id: record.id
          }
          // 如果跳转的详情页是最后一层页面，可以通过query传参
          query: {
            metaLabel: record.name // 如果想要最后一层面包屑名称展示位当前详情数据的名称，可以通过query传参metaLabel，如果没传metaLabel，面包屑名称默认展示为meta中配置的label值
          }
      })
   }
</script>    
```

::: tip 特别说明：
如果想要最后一层面包屑名称展示为当前详情数据的名称，可以通过`query`传参`metaLabel`，如果没传metaLabel，面包屑名称默认展示为`meta中配置的label`值
:::