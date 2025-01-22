# 一套代码多套系统使用

## 实现目的
当一套系统发展到后期，可能会存在多个业务方使用，不同的业务方可能会针对自己的使用场景来提一些定制需求，但是又期望后期系统的需求迭代也能够同步。正常的操作都是拉出一个新的分支进行定制需求开发。 这样存在的问题就是：每次主版本开发一个新的需求，可能都要去往其他不同的定制分支去合并。当分支越来越多的时候，功能合并可能会遗漏。这样使得开发人员维护多套代码也比较费劲 因此维护一套代码，根据不同的启动方式来执行不同的逻辑会显得更加简单易维护

## 实现思路
通过不同的“启动方式”或“打包方式”来区分当前“启动”或“部署”的项目 给有定制需求的项目一个特定的系统名称，通过“设置环境变量的值”结合“自定义命令行启动方式”来获取当前启动项目的系统名称，全局通过这个系统名称进行定制需求的逻辑区分

## 实现步骤

#### 自定义启动方式实现
1. 添加通用代码环境变量.env
```bash
// .env 通用代码环境变量的值取这里
VITE_SYSTEM_NAME=turing-ui-frame
```
2. 为定制项目如systemA添加环境变量.env.systemA
```bash
// .env.systemA systemA项目环境变量的值取这里
VITE_SYSTEM_NAME=systemA
```
3. 给systemA项目 添加自定义启动方式
```json
// package.json
"scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "dev:systemA": "vite --mode systemA",         // 启动项目systemA
    "build:systemA": "vite build --mode systemA"  // 打包项目systemA
},
```
`dev:systemA: 'vite --mode systemA' 设置环境模式 即环境变量的值优先从.env.systemA文件中取`


#### 业务逻辑区分实现
1. 可以在全局变量文件中如utils/constants.ts中获取并导出系统名称
```typescript
// constants.ts
// 当前启动的项目名称
export const SYSTEM_NAME = import.meta.env.VITE_SYSTEM_NAME
```

2. 在其他文件中使用
```vue
import { SYSTEM_NAME  } from '@/utils/constants'
// 根据SYSTEM_NAME的值对项目的定制需求进行逻辑区分
if (SYSTEM_NAME === 'systemA') {
  // 仅当systemA项目执行的定制需求
}
```

#### 定制样式实现
1. 在App.vue给#app元素添加class类,以项目名称命名
```vue
/* 不同项目添加class */
const systemClassName = import.meta.env.VITE_SYSTEM_NAME
document.getElementById('app')?.classList.add(systemClassName)
```

2. 将systemA特有的样式代码写在.systemA{} 中写
```scss
.turing-ui-frame {
  // 通用代码写在这里
  &.systemA {
    // systemA 系统特有代码写在这里
  }
}
```

:::tip
具体的使用场景请根据实际项目需求来定：
1. 如果开发过程中定制需求比较多，认为同一套代码维护起来比较繁琐那也可以拉出新分支进行开发。做好后期的分支管理，有通用功能开发及时合并到定制分支即可
2. 如果定制需求比较少，拉一个新的分支比较耗费资源，就可以使用这种方式去实现逻辑区分
:::