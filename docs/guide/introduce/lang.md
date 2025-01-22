# 国际化语言配置


## 使用步骤
- main.ts 中全局注册
``` javascript
import i18n from '@/utils/i18n'
app.use(i18n)
```
- 在html模版中直接使用：
``` html
<div>{{ $t('title.or') }}</div>
```
- 在js中使用[`可统一在constants中引入后导出`]
``` javascript
import i18n from '@/utils/i18n'
const $t: any = i18n.global.t
const FAST_DATE = [
  {value:1, label: $t('time.today')},
  {value:7, label: $t('time.nearDay', {n: 7})},
]
```
## 定义说明

`所在目录：src/lang`

- langConfig中定义语言类型

- zh-cn.json为语言类型对应的json文件

  

json文件内容的定义以及被引用规则：

``` json
{ 
  "title": { // 标题相关的文字
    'or': "或者"
  },
  "time": {  // 时间相关的文字
    'today': "今天"
  },
  "placeholder": {  // placeholder相关的文字
    "pleaseInput": "请输入"
  },
  "btn": {  // 按钮相关的文字
    "search": "查询"
  },
  "tip": {  // 提示相关的文字
    "warnTip": "温馨提示"
  },
  "common": {  // 公共的文字
    "keyword": "关键词"
  }
}
```
引用规则：
``` javascript
$t('title.or')
$t('time.today')
$t('placeholder.pleaseInput')
$t('btn.today')
$t('tip.warnTip')
$t('common.keyword')
```
具体的定义根据实际情况而定

## 配置语言
1. 在langConfig.js中添加语言配置
```javascript
const langConfig = [
  {value: 'zh-cn', label: '简体中文'},
  {value: 'en', label: 'English'}
]
export default langConfig
```

2. 在src/lang添加语言json文件，如en.json
3. 在src/utils/i18n.ts引入json文件
```javascript

import zhCN from "@/lang/zh-cn.json"
import en from "@/lang/en.json"
import langConfig from "@/lang/langConfig"
// 将语言数据加入到messages中
let messages: any  = {};
if (isArray(langConfig)) {
  langConfig.forEach((v: valueLabel) => {
    let lang = null;
    switch (v.value) {
      case "zh-cn":
        lang = zhCN;
        break;
      case "en":
        lang = en;
        break;
    }
    messages[v.value] = lang;
  });
}
// 初始化语言数据
const i18n: any = createI18n ({
  legacy: false, // 组合api模式，需要设置为false
  globalInjection: true, // 全局生效
  locale: localStorage?.getItem('localeKey') || 'zh-cn',
  messages: messages
})
export default i18n
```
4. 在main.ts全局配置element-plus组件和turing-ui组件的国际化语言
```ts
import zhCN from "element-plus/es/locale/lang/zh-cn";
import en from "element-plus/es/locale/lang/en";
const localeKey = localStorage?.getItem('localeKey') || 'zh-cn'
const getLocale = () => {
  switch (localeKey) {
    case 'zh-cn': // 中文
      return zhCN
    case 'en': // 英语
      return en
  }
}
app.use(ElementPlus, { locale: getLocale() }) // element-plus国际化
app.use(TuringUI, { locale:  localeKey})      // turing-ui国际化
```

5. 如果项目中需要集成其他语言，那么后端也需要同步集成，这样才能保证从接口获取的数据语言一致