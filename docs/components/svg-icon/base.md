# tu-svg-icon组件

### 组件
[tu-svg-icon使用说明文档](https://mxliu5.github.io/turing-ui-vue3/components/TuSvgIcon/base.html)

### 使用指南
需要在你的项目中做如下操作：
1. 安装插件
```bash
npm install vite-plugin-svg-icons -D
```
2. 在 vite.config.js 中配置插件
```javascript
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
export default defineConfig({
  plugins: [
    vue(),
    createSvgIconsPlugin({
      // 指定存放SVG图标的路径
      iconDirs: [path.resolve(process.cwd(), "src/assets/svgs")], 
      // 指定symbolId格式
      symbolId: "[name]",
      customDomId: "turing-ui-frame-svgs", // 避免多项目互相影响
    })
  ],
});
```
3. 在main.ts中全局注册svg
```javascript
import 'virtual:svg-icons-register';
```

4. 在你的Vue组件中使用`tu-svg-icon`组件
```vue
<tu-svg-icon class="logo"name="logo" :width="28" />
```