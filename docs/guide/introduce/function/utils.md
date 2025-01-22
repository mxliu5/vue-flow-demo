# utils介绍

## helper.ts
一些全局的公共函数定义
::: info
一般是偏业务性的，通用的公共函数已在turing-plugin实现，使用`turing-plugin`中支持的函数即可
:::

## constants.ts
一些全局的公共常量定义

## validate.ts
公共的校验方法定义

## app-tip.ts
::: info
1. 全局`confirm`确认框、`message`消息提示框、`notification`消息通知框的封装
2. 为了全局使用方法，在`useCtx.ts`中已将`confirm、message、notification` 挂载到当前组件实例上，因此可以通过当前组件实例引用方法
:::

``` javascript
// 获取当前实例
import useCtx from '@/hooks/useCtx'
const { $app } = useCtx()

/* confirm确认框的使用 */
// confirm提示框
 $app.$confirm({
    title: '退出提示',
    message: '有数据变更未保存，确定要离开当前页面吗？',
    cancelButtonText: '留在页面',
    confirmButtonText: '离开页面',
    customClass: 'four-text-btn'
 }).then(() => {
   // 确认后执行操作
 })
// alert提示框
$app.$confirm({
  type: 'success',
  title: '提示',
  message: '导入成功',
  showCancelButton: false
}).then(() => {
  // 确认后执行操作
})
// 删除提示框
$app.$deleteConfirm({
  title: '确认删除当前任务',
}).then(() => {
   // 确认后执行操作
})

/* message消息提示框的使用 */
$app.$message.success('这是一条success提示信息')
$app.$message.warning('这是一条warning提示信息')
$app.$message.error('这是一条error提示信息')
$app.$message.success('这是一条success提示信息')
// 或：
$app.$message({
  type: 'success',
  message: '这是一条success提示信息'
  // 继承el-message所有的属性
})

/* notification消息通知看的使用 */
$app.notification({
 title: '消息提示',
 message: '这是一条消息提示框',
 type: 'success'
 // 继承el-notification所有的属性
})
```

## i18n.ts

### 介绍

国际化语言的封装

### 具体使用
参考:
[国际化语言配置](/guide/introduce/lang.html)

