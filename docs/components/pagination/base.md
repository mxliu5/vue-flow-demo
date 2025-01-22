# Pagination 分页组件

### 基础介绍
对分页组件进行封装，方便后期统一维护【具体的逻辑可根据项目实际情况去修改】

### 属性
继承el-pagination所有属性和事件，这里只列举常用属性。[el-pagination使用说明文档](https://element-plus.org/zh-CN/component/pagination.html)

|属性名|说明|类型|默认值|
|-|-|-|-|
|pageNum|当前页数|`number`|1|
|pageSize|每页显示条目个数|`number`|10|
|pageSizes|每页显示个数选择器的选项设置|`object`|[10, 20, 30, 40, 50]|
|total|总条目数|`number`|0|
