# tu-table组件

### 组件
[tu-table使用说明文档](https://mxliu5.github.io/turing-ui-vue3/components/TuTable/base.html)

### 使用指南
直接在你的Vue组件中使用`tu-table`组件
```vue
<tu-table 
  :data="tableData" 
  :columns="columns"
  :operations="operations"
  @handleOperation="handleOperation" />
```