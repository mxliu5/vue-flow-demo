# 筛选条件缓存 
列表页进入详情页，再返回到列表页——缓存之前选中的筛选条件

## 实现思路
通过`store存储`实现
1. 进入详情页时保存当前查询条件到store
2. 进入其他页面(`非详情页面`)，清除查询条件缓存内容
3. 每次进入列表页，根据当前页面的缓存值判断是否需要回显缓存值

## 逻辑说明

1. 以每个页面的路由名称作为key值，将当前页面查询条件缓存到对象中。避免多个页面间公用一个变量产生冲突
2. 查询条件有三个执行时机，保存、清除、回显。其中保存和清除在`onBeforeRouteLeave`执行，回显在`查询项queryItems加载完成后`执行。
3. 为了减少重复代码的编写，已将上述操作封装成公共的hooks。具体可查看`useTablePage.ts`的实现逻辑

## 列表适配
参考demo/list代码即可。引入`useTablePage`。并且传参`routeName`；
::: tip 特别说明：
1. 仅当通过useTablePage传参routeName时，才会缓存筛选条件的值。若不传，默认不进行缓存
2. 若列表页还嵌套一层父级组件，例如父组件中通过切换tab页面来切换列表内容。如果想要进入详情页再返回列表页能够缓存父组件中的tab选项，这个时候可以在List.vue中定义一个emits = defineEmits(['queryCacheInit']),然后将emits通过useTablePage传给hooks，然后在父级组件处理queryCacheInit就能够得到当前缓存的值，然后进行回显，代码参考demo4/list;效果参考https://mxliu5.github.io/turing-ui-frame-page/#/mock-demo4
:::

list.vue
```javascript
import useTablePage from "@/hooks/useTablePage";
const routeName = 'mock-demo'
const { query, queryItems, searchQuery, resetQuery, selectedIdshandleSelectionChange } = useTablePage(routeName);
```