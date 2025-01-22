// vite.config.ts
import { defineConfig } from "file:///E:/%E9%A1%B9%E7%9B%AE/%E5%9B%BE%E8%81%86cbb/turning-ui-frame/node_modules/vite/dist/node/index.js";
import vue from "file:///E:/%E9%A1%B9%E7%9B%AE/%E5%9B%BE%E8%81%86cbb/turning-ui-frame/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import path from "path";
import qiankun from "file:///E:/%E9%A1%B9%E7%9B%AE/%E5%9B%BE%E8%81%86cbb/turning-ui-frame/node_modules/vite-plugin-qiankun/dist/index.js";
import { createSvgIconsPlugin } from "file:///E:/%E9%A1%B9%E7%9B%AE/%E5%9B%BE%E8%81%86cbb/turning-ui-frame/node_modules/vite-plugin-svg-icons/dist/index.mjs";
var __vite_injected_original_dirname = "E:\\\u9879\u76EE\\\u56FE\u8046cbb\\turning-ui-frame";
var vite_config_default = ({ mode }) => {
  const __DEV__ = mode === "development";
  return defineConfig({
    plugins: [
      vue(),
      qiankun("skybox-base", {
        // 对应主应用中注册的name
        useDevMode: true
      }),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), "src/assets/svgs")],
        // 指定symbolId格式
        symbolId: "[name]",
        customDomId: "turing-ui-frame-svgs"
        // 避免多项目互相影响
      })
    ],
    base: "./",
    // 如果作为子应用进行嵌入，这个地方需要改成对应的目录名称
    server: {
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      host: "localhost",
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
        }
      }
    },
    build: {
      target: "modules",
      //设置最终构建的浏览器兼容目标  //es2015(编译成es5) | modules
      outDir: "dist",
      assetsDir: "assets",
      sourcemap: false,
      minify: "esbuild",
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
        { find: "@", replacement: path.resolve(__vite_injected_original_dirname, "src") },
        { find: "@assets", replacement: path.resolve(__vite_injected_original_dirname, "src/assets") }
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
  });
};
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxcdTk4NzlcdTc2RUVcXFxcXHU1NkZFXHU4MDQ2Y2JiXFxcXHR1cm5pbmctdWktZnJhbWVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkU6XFxcXFx1OTg3OVx1NzZFRVxcXFxcdTU2RkVcdTgwNDZjYmJcXFxcdHVybmluZy11aS1mcmFtZVxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRTovJUU5JUExJUI5JUU3JTlCJUFFLyVFNSU5QiVCRSVFOCU4MSU4NmNiYi90dXJuaW5nLXVpLWZyYW1lL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXHJcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXHJcbmltcG9ydCBxaWFua3VuIGZyb20gJ3ZpdGUtcGx1Z2luLXFpYW5rdW4nXHJcbmltcG9ydCB7IGNyZWF0ZVN2Z0ljb25zUGx1Z2luIH0gZnJvbSBcInZpdGUtcGx1Z2luLXN2Zy1pY29uc1wiO1xyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCAoeyBtb2RlIH0pID0+IHtcclxuICBjb25zdCBfX0RFVl9fID0gbW9kZSA9PT0gJ2RldmVsb3BtZW50J1xyXG4gIHJldHVybiBkZWZpbmVDb25maWcoe1xyXG4gICAgcGx1Z2luczogW1xyXG4gICAgICB2dWUoKSxcclxuICAgICAgcWlhbmt1bignc2t5Ym94LWJhc2UnLCB7IC8vIFx1NUJGOVx1NUU5NFx1NEUzQlx1NUU5NFx1NzUyOFx1NEUyRFx1NkNFOFx1NTE4Q1x1NzY4NG5hbWVcclxuICAgICAgICB1c2VEZXZNb2RlOiB0cnVlXHJcbiAgICAgIH0pLFxyXG4gICAgICBjcmVhdGVTdmdJY29uc1BsdWdpbih7XHJcbiAgICAgICAgaWNvbkRpcnM6IFtwYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwgXCJzcmMvYXNzZXRzL3N2Z3NcIildLFxyXG4gICAgICAgIC8vIFx1NjMwN1x1NUI5QXN5bWJvbElkXHU2ODNDXHU1RjBGXHJcbiAgICAgICAgc3ltYm9sSWQ6IFwiW25hbWVdXCIsXHJcbiAgICAgICAgY3VzdG9tRG9tSWQ6IFwidHVyaW5nLXVpLWZyYW1lLXN2Z3NcIiwgLy8gXHU5MDdGXHU1MTREXHU1OTFBXHU5ODc5XHU3NkVFXHU0RTkyXHU3NkY4XHU1RjcxXHU1NENEXHJcbiAgICAgIH0pLFxyXG4gICAgXSxcclxuICAgIGJhc2U6ICcuLycsIC8vIFx1NTk4Mlx1Njc5Q1x1NEY1Q1x1NEUzQVx1NUI1MFx1NUU5NFx1NzUyOFx1OEZEQlx1ODg0Q1x1NUQ0Q1x1NTE2NVx1RkYwQ1x1OEZEOVx1NEUyQVx1NTczMFx1NjVCOVx1OTcwMFx1ODk4MVx1NjUzOVx1NjIxMFx1NUJGOVx1NUU5NFx1NzY4NFx1NzZFRVx1NUY1NVx1NTQwRFx1NzlGMFxyXG4gICAgc2VydmVyOiB7XHJcbiAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luJzogJyonXHJcbiAgICAgIH0sXHJcbiAgICAgIGhvc3Q6ICdsb2NhbGhvc3QnLFxyXG4gICAgICBwb3J0OiA4MDgwLFxyXG4gICAgICBwcm94eToge1xyXG4gICAgICAgIFwiL2F1ZGl0XCI6IHtcclxuICAgICAgICAgIHRhcmdldDogXCJodHRwOi8vMTcyLjMxLjE2NC4xMDA6ODA5OS9cIixcclxuICAgICAgICAgIC8vIHRhcmdldDogXCJodHRwczovLzE3Mi4zMS4xNjQuMTAwOjI4MDk5L1wiLFxyXG4gICAgICAgICAgLy8gdGFyZ2V0OiBcImh0dHBzOi8vMTcyLjI5LjIyNi4zOToyODA5OVwiLFxyXG4gICAgICAgICAgLy8gdGFyZ2V0OiBcImh0dHBzOi8vMTcyLjI5LjIzMy43MzoyODA5OS9cIixcclxuICAgICAgICAgIC8vIHRhcmdldDogXCJodHRwOi8vMTcyLjMxLjIzNC40NDoyODA5OVwiLFxyXG4gICAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxyXG4gICAgICAgICAgc2VjdXJlOiBmYWxzZVxyXG4gICAgICAgICAgLy8gcmV3cml0ZTogKHBhdGgpID0+IHBhdGgucmVwbGFjZSgvXlxcL2FwaS8sIFwiXCIpLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBidWlsZDoge1xyXG4gICAgICB0YXJnZXQ6ICdtb2R1bGVzJywgLy9cdThCQkVcdTdGNkVcdTY3MDBcdTdFQzhcdTY3ODRcdTVFRkFcdTc2ODRcdTZENEZcdTg5QzhcdTU2NjhcdTUxN0NcdTVCQjlcdTc2RUVcdTY4MDcgIC8vZXMyMDE1KFx1N0YxNlx1OEJEMVx1NjIxMGVzNSkgfCBtb2R1bGVzXHJcbiAgICAgIG91dERpcjogJ2Rpc3QnLFxyXG4gICAgICBhc3NldHNEaXI6ICdhc3NldHMnLFxyXG4gICAgICBzb3VyY2VtYXA6IGZhbHNlLFxyXG4gICAgICBtaW5pZnk6ICdlc2J1aWxkJyxcclxuICAgICAgY2h1bmtTaXplV2FybmluZ0xpbWl0OiAxNTAwLFxyXG4gICAgICB0ZXJzZXJPcHRpb25zOiB7XHJcbiAgICAgICAgLy8gXHU2RTA1XHU5NjY0Y29uc29sZVx1NTQ4Q2RlYnVnZ2VyXHJcbiAgICAgICAgY29tcHJlc3M6IHtcclxuICAgICAgICAgIGRyb3BfY29uc29sZTogdHJ1ZSxcclxuICAgICAgICAgIGRyb3BfZGVidWdnZXI6IHRydWVcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIHJvbGx1cE9wdGlvbnM6IHtcclxuICAgICAgICBtYW51YWxDaHVua3MoaWQpIHtcclxuICAgICAgICAgIGlmIChpZC5pbmNsdWRlcyhcIm5vZGVfbW9kdWxlc1wiKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gXCJ2ZW5kb3JcIjtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICByZXNvbHZlOiB7XHJcbiAgICAgIC8vIFx1OTE0RFx1N0Y2RVx1NTIyQlx1NTQwRFxyXG4gICAgICBhbGlhczogW1xyXG4gICAgICAgIHsgZmluZDogJ0AnLCByZXBsYWNlbWVudDogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYycpIH0sXHJcbiAgICAgICAgeyBmaW5kOiAnQGFzc2V0cycsIHJlcGxhY2VtZW50OiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjL2Fzc2V0cycpIH1cclxuICAgICAgXVxyXG4gICAgfSxcclxuICAgIGNzczoge1xyXG4gICAgICAvLyBcdTZERkJcdTUyQTBjc3NcdTk4ODRcdTU5MDRcdTc0MDZcdTU2NjhcdTkxNERcdTdGNkVcclxuICAgICAgcHJlcHJvY2Vzc29yT3B0aW9uczoge1xyXG4gICAgICAgIHNjc3M6IHtcclxuICAgICAgICAgIC8vIGFkZGl0aW9uYWxEYXRhXHU3Njg0XHU1MTg1XHU1QkI5XHU0RjFBXHU1NzI4XHU2QkNGXHU0RTJBc2Nzc1x1NjU4N1x1NEVGNlx1NzY4NFx1NUYwMFx1NTkzNFx1ODFFQVx1NTJBOFx1NkNFOFx1NTE2NVx1RkYwQ1x1OEZEOVx1NjgzN1x1NUMzMVx1NTNFRlx1NEVFNVx1NTE2OFx1NUM0MFx1NEY3Rlx1NzUyOHNjc3NcdTRFODZcclxuICAgICAgICAgIGFkZGl0aW9uYWxEYXRhOiAnQHVzZSBcIkAvc3R5bGVzL3ZhcnMuc2Nzc1wiIGFzICo7IEB1c2UgXCJAL3N0eWxlcy9taXhpbi5zY3NzXCIgYXMgKjsnXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSlcclxufTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE4UyxTQUFTLG9CQUFvQjtBQUMzVSxPQUFPLFNBQVM7QUFDaEIsT0FBTyxVQUFVO0FBQ2pCLE9BQU8sYUFBYTtBQUNwQixTQUFTLDRCQUE0QjtBQUpyQyxJQUFNLG1DQUFtQztBQU16QyxJQUFPLHNCQUFRLENBQUMsRUFBRSxLQUFLLE1BQU07QUFDM0IsUUFBTSxVQUFVLFNBQVM7QUFDekIsU0FBTyxhQUFhO0FBQUEsSUFDbEIsU0FBUztBQUFBLE1BQ1AsSUFBSTtBQUFBLE1BQ0osUUFBUSxlQUFlO0FBQUE7QUFBQSxRQUNyQixZQUFZO0FBQUEsTUFDZCxDQUFDO0FBQUEsTUFDRCxxQkFBcUI7QUFBQSxRQUNuQixVQUFVLENBQUMsS0FBSyxRQUFRLFFBQVEsSUFBSSxHQUFHLGlCQUFpQixDQUFDO0FBQUE7QUFBQSxRQUV6RCxVQUFVO0FBQUEsUUFDVixhQUFhO0FBQUE7QUFBQSxNQUNmLENBQUM7QUFBQSxJQUNIO0FBQUEsSUFDQSxNQUFNO0FBQUE7QUFBQSxJQUNOLFFBQVE7QUFBQSxNQUNOLFNBQVM7QUFBQSxRQUNQLCtCQUErQjtBQUFBLE1BQ2pDO0FBQUEsTUFDQSxNQUFNO0FBQUEsTUFDTixNQUFNO0FBQUEsTUFDTixPQUFPO0FBQUEsUUFDTCxVQUFVO0FBQUEsVUFDUixRQUFRO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxVQUtSLGNBQWM7QUFBQSxVQUNkLFFBQVE7QUFBQTtBQUFBLFFBRVY7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBQ0EsT0FBTztBQUFBLE1BQ0wsUUFBUTtBQUFBO0FBQUEsTUFDUixRQUFRO0FBQUEsTUFDUixXQUFXO0FBQUEsTUFDWCxXQUFXO0FBQUEsTUFDWCxRQUFRO0FBQUEsTUFDUix1QkFBdUI7QUFBQSxNQUN2QixlQUFlO0FBQUE7QUFBQSxRQUViLFVBQVU7QUFBQSxVQUNSLGNBQWM7QUFBQSxVQUNkLGVBQWU7QUFBQSxRQUNqQjtBQUFBLE1BQ0Y7QUFBQSxNQUNBLGVBQWU7QUFBQSxRQUNiLGFBQWEsSUFBSTtBQUNmLGNBQUksR0FBRyxTQUFTLGNBQWMsR0FBRztBQUMvQixtQkFBTztBQUFBLFVBQ1Q7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUNBLFNBQVM7QUFBQTtBQUFBLE1BRVAsT0FBTztBQUFBLFFBQ0wsRUFBRSxNQUFNLEtBQUssYUFBYSxLQUFLLFFBQVEsa0NBQVcsS0FBSyxFQUFFO0FBQUEsUUFDekQsRUFBRSxNQUFNLFdBQVcsYUFBYSxLQUFLLFFBQVEsa0NBQVcsWUFBWSxFQUFFO0FBQUEsTUFDeEU7QUFBQSxJQUNGO0FBQUEsSUFDQSxLQUFLO0FBQUE7QUFBQSxNQUVILHFCQUFxQjtBQUFBLFFBQ25CLE1BQU07QUFBQTtBQUFBLFVBRUosZ0JBQWdCO0FBQUEsUUFDbEI7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0YsQ0FBQztBQUNIOyIsCiAgIm5hbWVzIjogW10KfQo=
