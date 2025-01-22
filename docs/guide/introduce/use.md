
# 框架适配实际开发
基于实际开发框架可能需要修改的部分

## 全局class的名称定义  

- 通过`turing-ui-frame`作为全局class 将所有的公共样式放在这个class下面写来避免样式污染
- 名称根据实际项目去定义（建议以项目名称进行定义）

## 微应用名称的定义 

- vite.config.ts 中 qiankun("`skybox-base`", { useDevMode: true})

## 微应用的静态资源匹配路径

- vite.config.ts 中   base: './'

## 微应用打包生成的目录名称

- vite.config.ts 中 outDir: "`dist`"
- utils/helper.ts中require方法的封装   replace("public", "`dist`")

## 一些公共的业务代码封装的部分修改

- aixos的baseURL 以及响应参数统一处理逻辑（以实际项目接口返参格式为准）
- table-page中loadData中的 `page和size`的定义（以实际项目列表接口传参字段定义为准）
- table-page中对列表响应数据的处理（以实际项目列表接口返参格式为准）

