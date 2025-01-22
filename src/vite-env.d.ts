/// <reference types="vite/client" />
//解决ts文件引入vue文件出现红色警告问题
declare module '*.vue' {
  import { defineComponent } from 'vue'
  const Component: ReturnType<typeof defineComponent>
  export default Component
}

declare module 'qs' {
  const content: any
  export = content
}

// 解决import {} from 'turing-plugin'标红问题。告诉typescript不用知道里面的具体类型定义
declare module 'turing-plugin';