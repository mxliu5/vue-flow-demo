# table-page组件

### 组件说明
1. `table-page`组件是用来实现一个表格交互的列表页，它通常是由`查询栏、操作栏、表格栏、分页栏`共同组成
2. 组件内容是由`tu-query`(查询组件)、`my-operation`(操作栏组件)、`tu-table`(表格组件)、`my-pagination`(分页组件)四个组件共同组件
3. 表格的高度根据页面计算而来，表格高度 = 页面总高 - （查询栏高度 + 操作栏高度 + 分页栏高度）,前提条件需要将使用table-page组件的父元素高度设置为100%，这样能够保证表格的高度始终自适应，表头固定，列表内容滚动条展示

### 使用指南
```vue
<template>
  <div class="mock-list">
    <table-page 
      :tableData="tableData"
      :columns="columns"
      :operations="operations"
      ...>
    </table-page>
  </div>
</template>
<style style="scss" scoped> 
.app-list {
  height: 100%;
}
</style>
```

:::tip
具体使用可参考`@/view/mock-demo/list`中代码
:::

### TablePage属性
|属性名|说明|类型|默认值|
|-|-|-|-|
|withQuery|是否有查询栏|`boolean`|true|
|query|所有查询项绑定的值集合|`object`|{}|
|queryItems|查询项的集合|`object`|见`tu-query`|
|queryAttrs|`tu-query`支持的所有其它属性|`object`|见`tu-query`|
|withOperation|是否有操作栏|`boolean`|false|
|operationAttrs|`my-operation`的属性|`object`|见`my-operation`|
|columns|表格项集合|`array`|见`tu-table`|
|operations|表格操作项集合|`array`|见`tu-table`|
|withOrder|是否显示序号|`boolean`|true|
|orderOption|序号的相关配置|`object`|见`tu-table`|
|withSelection|是否显示多选框|`boolean`|false|
|selectionOption|多选框的相关配置|`object`|见`tu-table`|
|draggable|是否支持行拖拽|`boolean`|false|
|draggableOption|拖拽的相关配置|`object`|见`tu-table`|
|noText|单元格数据为空时占位符|`string`|'-'|
|tableAttrs|更多的`el-table`支持的属性通过tableAttrs传即可|`object`|见`el-table`|
|loadDataApi|列表接口api|`function`|-|
|loadImmediately|是否立即查询，有些查询需要父组件自行去操作，可以传参false;|`boolean`|true|
|transformQuery|处理查询项请求参数，将tu-query绑定值转换成后端接口需要的格式|`function`|-|
|transformListData|加载完数据之后，对数据的转换逻辑,将接口返回的数据转换成页面需要的形式|`function`|-|


:::tip
<h5 style="margin: 10px 0;">
1. 为何如此设计？为何不直接在list页面直接使用tu-query、my-operation、tu-table、my-pagenation写，而是又封装了一层？
</h5>

1. 可以节省写代码的时间，例如表格高度需要根据当前屏幕高度去计算。封装一层直接将计算的逻辑在table-page中实现，就不用每写一次list页面都去实现一遍   

2. 方便维护，在实际项目中，列表页的交互后期需求可能会发生改变，例如查询栏和操作栏的位置，交互等。这样后期有改动只需要改动table-page组件就能很快适配需求改动   

3. 另外一个项目的列表页通常都是有一样的交互，统一引用table-page组件，避免不同的页面开发出不同的风格（尤其是在前端开发者较多的情况下）

<h5 style="margin: 10px 0;">
2. 实际开发
</h5>

1. 实际开发时逻辑根据实际项目去做调整，这里封装的只是一个通用版本的逻辑

2. 开发之前请先阅读table-page代码逻辑，根据实际情况去做调整。代码比较简洁，代码配合组件说明文档一起更好理解
:::



