
# 公共样式介绍

## 1. styles介绍
:::info 说明：
系统中样式文件定义
:::

### 1.1  index.scss
入口文件
### 1.2  reset.scss
css初始化
### 1.3  common.scss
系统中涉及到的公共样式定义
### 1.4  element.scss
elemnent-plus样式覆盖
### 1.5  mixin.scss
css函数定义
### 1.6  vars.scss
css变量定义
### 1.7  theme.scss
主题变量定义：可通过修改element-plus对应的变量取值而达到主题自定义的效果

## 2. 样式变量的引用
``` css
// 在index.scss文件中引入以下文件
@import '@/styles/theme.scss';
@import '@/styles/reset.scss';
@import '@/styles/element.scss';
@import '@/styles/common.scss';
```
``` javascript
// 在main.ts引入index.scss
import '@/styles/index.scss'
```
:::tip 提示：
为了能够在组件`<style lang="scss" scoped></style>`直接使用minxin.scss以及vars.scss中定义的css函数或变量，需要在vite.config.ts添加如下配置：
:::

``` javascript
// vite.config.ts
export default defineConfig({
  css: {
    // 添加css预处理器配置
    preprocessorOptions: {
      scss: {
        // additionalData的内容会在每个scss文件的开头自动注入，这样就可以全局使用scss了
        additionalData: '@use "@/styles/vars.scss" as *; @use "@/styles/mixin.scss" as *;'
      }
    }
  }
})
```


## 3. 样式变量或函数的使用

``` css
.link-text {
  color: $primary-color;
}
.flexBetween {
  @include flexBetween()
}
```



## 4. 系统样式书写规范与技巧

#### 1.1  避免样式冲突
1. index.html中添加class类turing-ui-frame【名称根据实际项目为准，建议以项目名称命名】
:::warning 注意：
添加的父类不要放在body下面，如果系统作为qiankun子应用嵌入到主应用上，body是没有挂载过去的，会导致所有.turing-ui-frame下面的样式全部失效
:::
``` html
<body>
    <div id="app" class="turing-ui-frame"></div>
    <script type="module" src="/src/main.ts"></script>
</dody>
```
2. 所有的公共样式都在`.turing-ui-frame` {}下面写
``` css
// common.scss
.turing-ui-frame {
  min-width: 1200px;
  // 全文用到的一些公共样式
  .link-text {
    color: $primary-color;
    font-size: 14px;
    cursor: pointer;
  }
  ...
}
// element.scss
.turing-ui-frame {
  // layout
  .el-header,
  .el-main {
    padding: 0;
  }
  ...
}
```
3. 关于一些弹框，浮框类的组件挂载到`#app`或者父节点下，默认是挂载在`body`下面的
``` javascript
export const $message = (options: any = {}, type: string) => {
  const isStr = typeof(options) === 'string'
  options = isStr ? {message: options } : options // 如果传的string,则直接当做message使用
  ElMessage({
    appendTo: '#app', // 挂载到#app下面，默认是在body下面
    type,
    duration: 3000,
    ...options
  })
}
```