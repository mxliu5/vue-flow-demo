
# hooks

##  useCtx.ts
用于获取当前组件实例，并且将常用的方法挂载到当前实例，在组件中方便使用
组件中使用如下：

``` javascript
import useCtx from "@/hooks/useCtx";
const { $app, proxy} = useCtx();
$app.$router.push({name: 'detail'})
$app.$message.succss('操作成功！')
proxy.$refs.addDialog.openDialog()
```

## useTablePage.ts
表格组件公共的方法

## useValidate.ts
校验