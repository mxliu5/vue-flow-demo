import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import qiankun from 'vite-plugin-qiankun'
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
// https://vitejs.dev/config/
export default ({ mode }) => {
  const __DEV__ = mode === 'development'
  return defineConfig({
    plugins: [
      vue(),
      qiankun('skybox-base', { // 对应主应用中注册的name
        useDevMode: true
      }),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), "src/assets/svgs")],
        // 指定symbolId格式
        symbolId: "[name]",
        customDomId: "turing-ui-frame-svgs", // 避免多项目互相影响
      }),
    ],
    base: __DEV__ ? './' : './', // 如果作为子应用进行嵌入，这个地方需要改成对应的目录名称
    server: {
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      host: 'localhost',
      port: 8080,
      proxy: {
        "/audit": {
          target: "http://172.31.164.100:8099/",
          // target: "https://172.31.164.100:28099/",
          // target: "https://172.29.226.39:28099",
          // target: "https://172.29.233.73:28099/",
          // target: "http://172.31.234.44:28099",
          changeOrigin: true,
          secure: false
          // rewrite: (path) => path.replace(/^\/api/, ""),
        },
      }
    },
    build: {
      target: 'modules', //设置最终构建的浏览器兼容目标  //es2015(编译成es5) | modules
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: false,
      minify: 'esbuild',
      chunkSizeWarningLimit: 1500,
      terserOptions: {
        // 清除console和debugger
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      },
      rollupOptions: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor";
          }
        }
      }
    },
    resolve: {
      // 配置别名
      alias: [
        { find: '@', replacement: path.resolve(__dirname, 'src') },
        { find: '@assets', replacement: path.resolve(__dirname, 'src/assets') }
      ]
    },
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
};
