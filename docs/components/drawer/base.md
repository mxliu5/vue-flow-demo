# Drawer 抽屉组件

### 基础介绍
对抽屉组件进行封装，方便后期统一维护。【具体的逻辑可根据项目实际情况去修改】

### 属性
继承el-drawer所有属性和事件，这里只列举常用属性。[el-drawer使用说明文档](https://element-plus.org/zh-CN/component/drawer.html)
|属性名|说明|类型|默认值|
|-|-|-|-|
|v-model|是否显示 Drawer|`boolean`|-|
|title|标题|`string`|-|
|width|抽屉弹窗的宽度|`string`|'520px'|
|showClose|是否显示关闭按钮|`boolean`|true|
|showConfirm|是否显示确认按钮|`boolean`|true|
|confirmText|确认按钮的文本|`string`|'确认'|
|closeText|关闭按钮的文本|`string`|'取消'|
|withHeader|是否含有头部|`boolean`|true|
|withFooter|是否含有底部|`boolean`|true|

### 事件
|事件名|说明|
|-|-|
|confirm|点击确定后执行的操作|
|close|点击取消/叉号后执行的操作|