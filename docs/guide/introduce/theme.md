# 主题配置

## 实现思路
通过给根元素添加主题对应的class类名，然后在当前类名下定义主题变量以及样式


## 实现步骤
1. 在切换主题时将主题名称作为class类添加到跟元素
```ts
function setTheme(newTheme: string) {
  // 清除之前的theme,将新的主题添加到缓存
  const El = document.querySelector('.turing-ui-frame')
  const oldTheme: any = localStorage?.getItem("theme")
  El?.classList.remove(oldTheme)
  El?.classList.add(newTheme)
  // 将当前主题存入缓存
  localStorage?.setItem("theme", newTheme)
}
setTheme('green')
```
2. 在theme.scss中配置绿色主题
```scss
/* 配置多套主题色 */
.green {
  --el-color-primary: #009688;
  --el-color-primary-light-3: #4db6ac;
  --el-color-primary-light-5: #80cbc4;
  --el-color-primary-light-7: #9ddfd9;
  --el-color-primary-light-8: #afe9e4;
  --el-color-primary-light-9: #effcfc;
  --el-color-primary-dark-2: #066f65;
}
```

