# store
pinia：vue3的状态管理库

## index.ts 
pinia的入口文件

## authority.ts
权限相关数据存储，如左侧菜单栏、用户信息等

## api.ts
系统中使用频繁的接口，一般为一些公用的下拉列表接口
在store中统一封装，在vue中使用直接引入后调用接口
```ts
// 引入
import useStore from "@/store";
const { api } = useStore();
// 调用
const getAppOptions = async (search ? : string) => {
  const result: any = await api.getAppOptions(search)
  formItems.value.appId.options = result.list
  formItems.value.appId.attrs.remote = result.total > api.MAX_TOTAL  // 如果数总数量大于1000条，则下拉框支持远程搜索，否则只在前端做筛选
}
```

