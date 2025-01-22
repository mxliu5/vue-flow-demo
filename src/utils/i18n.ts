
import { createI18n  } from "vue-i18n";
import isArray from "lodash/isArray";
import { storeC } from 'turing-plugin'
import { valueLabel } from '@/utils/interface'
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
  locale: storeC.getLocalstorage('localeKey') || 'zh-cn',
  messages: messages
})

export default i18n
