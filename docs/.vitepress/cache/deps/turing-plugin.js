import {
  __publicField
} from "./chunk-EWTE5DHJ.js";

// node_modules/turing-plugin/lib/plugins/data/index.ts
var DataC = class {
  constructor() {
    // 随机获取数组中的n个元素值
    __publicField(this, "getRandomArrayElements", (arr, count) => {
      if (arr.length > count) {
        const shuffled = arr.slice(0);
        let i = arr.length;
        let min = i - count;
        while (i-- > min) {
          let index = Math.floor((i + 1) * Math.random());
          [shuffled[index], shuffled[i]] = [shuffled[i], shuffled[index]];
        }
        return shuffled.slice(min);
      } else {
        return arr;
      }
    });
  }
  // 生成uuid
  generateUUID() {
    let d = (/* @__PURE__ */ new Date()).getTime();
    const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
      const r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == "x" ? r : r & 3 | 8).toString(16);
    });
    return uuid;
  }
  // 深拷贝
  cloneDeep(obj) {
    const objArray = Array.isArray(obj) ? [] : {};
    if (obj && typeof obj === "object") {
      for (const key in obj) {
        if (obj[key] && typeof obj[key] === "object") {
          objArray[key] = this.cloneDeep(obj[key]);
        } else {
          objArray[key] = obj[key];
        }
      }
    }
    return objArray;
  }
  // 匹配数组中特定value值对应的值
  getItemByValue(arr, value, valueKey = "value") {
    let item = {};
    arr.forEach((elem) => {
      if (elem[valueKey] === value) {
        item = this.cloneDeep(elem);
      }
    });
    return item;
  }
  // 简单数组去重
  removeDuplicates(arr) {
    return Array.from(new Set(arr));
  }
  // 对象数组去重
  filterArray(arr, key, key2) {
    const newArr = [];
    const newArr2 = [];
    if (!key2) {
      arr.forEach((elem) => {
        if (newArr.indexOf(elem[key]) === -1) {
          newArr.push(elem[key]);
          newArr2.push(elem);
        }
      });
    } else {
      arr.forEach((elem) => {
        if (newArr2.findIndex((val) => val[key] === elem[key]) === -1 || newArr2.findIndex((val) => val[key2] === elem[key2]) === -1) {
          newArr2.push(elem);
        }
      });
    }
    return newArr2;
  }
  // 空值包括数组
  isEmpty(value) {
    if (Array.isArray(value)) {
      return value.length === 0;
    } else if (JSON.stringify(value) === "{}") {
      return true;
    } else {
      return !(value || value === 0 || value === false);
    }
  }
  // 数组冒泡排序
  bubbleSort(arr, type = "asc") {
    let len = arr.length;
    for (let i = 0; i < len - 1; i++) {
      for (let j = 0; j < len - 1 - i; j++) {
        const bool = type === "asc" ? arr[j] > arr[j + 1] : arr[j] < arr[j + 1];
        if (bool) {
          let temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
        }
      }
    }
    return arr;
  }
  // 找出数组中最大值
  getMax(arr) {
    if (this.isEmpty(arr)) {
      return 0;
    } else {
      const max = arr.reduce((a, b) => Math.max(a, b));
      return max;
    }
  }
  // 找出数组中最小值
  getMin(arr) {
    if (this.isEmpty(arr)) {
      return 0;
    } else {
      const min = arr.reduce((a, b) => Math.min(a, b));
      return min;
    }
  }
  // 判断是否为{"a": 1, "b": 2} 或 {a: 1, b: 2}这种可转成对象的格式，即是否可通过JOSN.parse转成对象,如果是转成对象并返回，否则返回null
  safeObject(str, defaultRet = null) {
    let ret = defaultRet;
    try {
      ret = new Function("return " + str)();
    } catch (ex) {
    }
    return ret;
  }
};
var dataC = new DataC();
var data_default = dataC;

// node_modules/turing-plugin/lib/plugins/time/index.ts
var TimeC = class {
  // 年份获取
  getYear(time) {
    const date = new Date(time);
    return date.getFullYear();
  }
  // 月份获取
  getMonth(time) {
    const date = new Date(time);
    return date.getMonth() + 1;
  }
  // 日期获取
  getDate(time) {
    const date = new Date(time);
    return date.getDate();
  }
  // 周获取 0代表星期天
  getDay(time) {
    const date = new Date(time);
    return date.getDay();
  }
  // 小时获取
  getHours(time) {
    const date = new Date(time);
    return date.getHours();
  }
  // 分钟获取
  getMinutes(time) {
    const date = new Date(time);
    return date.getMinutes();
  }
  // 秒获取
  getSeconds(time) {
    const date = new Date(time);
    return date.getSeconds();
  }
  // 日期/时间的格式化
  format(value, type) {
    if (data_default.isEmpty(value)) {
      return "";
    }
    const D = new Date(value);
    const Y = D.getFullYear();
    const M = (D.getMonth() + 1).toString().padStart(2, "0");
    const d = D.getDate().toString().padStart(2, "0");
    const h = D.getHours().toString().padStart(2, "0");
    const m = D.getMinutes().toString().padStart(2, "0");
    const s = D.getSeconds().toString().padStart(2, "0");
    if (type === "YYYY") {
      return `${Y}`;
    } else if (type === "YYYY-MM") {
      return `${Y}-${M}`;
    } else if (type === "YYYY-MM-DD") {
      return `${Y}-${M}-${d}`;
    } else if (type == "YYYY-MM-DD hh:mm") {
      return `${Y}-${M}-${d} ${h}:${m}`;
    } else if (type == "YYYY-MM-DD hh:mm:ss") {
      return `${Y}-${M}-${d} ${h}:${m}:${s}`;
    } else if (type === "YYYY/MM") {
      return `${Y}/${M}`;
    } else if (type == "YYYY/MM/DD") {
      return `${Y}/${M}/${d}`;
    } else if (type == "YYYY/MM/DD hh:mm") {
      return `${Y}/${M}/${d} ${h}:${m}`;
    } else if (type == "YYYY/MM/DD hh:mm:ss") {
      return `${Y}/${M}/${d} ${h}:${m}:${s}`;
    } else {
      return `${Y}-${M}-${d} ${h}:${m}:${s}`;
    }
  }
  // 获取某月的总天数
  getTotalDaysOfMonth(year, month) {
    return new Date(year, month, 0).getDate();
  }
  // 判断是否为闰年
  isLeapYear(year) {
    return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
  }
  // 比较两个日期大小
  compareDates(d1, d2) {
    const date1 = new Date(d1);
    const date2 = new Date(d2);
    if (date1 > date2) {
      return 1;
    } else if (date1 < date2) {
      return -1;
    } else {
      return 0;
    }
  }
  // 生成n天内的日期/时间范围
  createRangeByDay(dayCount, withTime) {
    const today = /* @__PURE__ */ new Date();
    const prevDay = new Date(today);
    prevDay.setDate(today.getDate() - dayCount + 1);
    const hour = today.getHours();
    const minute = today.getMinutes();
    const second = today.getSeconds();
    const getReal = (val) => {
      return val >= 10 ? val : `0${val}`;
    };
    const nowTime = `${getReal(hour)}:${getReal(minute)}:${getReal(second)}`;
    const dateFormat = "YYYY-MM-DD";
    let startDate = this.format(prevDay, dateFormat);
    let endDate = this.format(today, dateFormat);
    if (withTime) {
      startDate = `${startDate} 00:00:00`;
      endDate = `${endDate} ${nowTime}`;
    }
    return [startDate, endDate];
  }
  // 获取近一年的天数
  getDaysInLastYear() {
    const today = /* @__PURE__ */ new Date();
    const lastYear = new Date(today);
    lastYear.setFullYear(lastYear.getFullYear() - 1);
    return Math.ceil((today - lastYear) / (1e3 * 60 * 60 * 24));
  }
  // 获取近一个月的天数
  getDaysInLastMonth() {
    const today = /* @__PURE__ */ new Date();
    const lastMonth = new Date(today);
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    return Math.ceil((today - lastMonth) / (1e3 * 60 * 60 * 24));
  }
};
var timeC = new TimeC();
var time_default = timeC;

// node_modules/turing-plugin/lib/plugins/number/index.ts
var NumberC = class {
  // 数字转中文 lower：中文小写 upper：中文大写
  numberToChinese(num, upperOrlower) {
    upperOrlower = upperOrlower || "lower";
    let chineseNumbers = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
    let chineseUnits = ["", "十", "百", "千", "万", "十", "百", "千", "亿"];
    if (upperOrlower === "upper") {
      chineseNumbers = ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"];
      chineseUnits = ["", "拾", "佰", "仟", "万", "拾", "佰", "仟", "亿"];
    }
    let numberString = num.toString();
    let [integerPart, decimalPart] = numberString.split(".");
    let integerArray = integerPart.split("").map(Number);
    let chineseInteger = "";
    for (let i = 0; i < integerArray.length; i++) {
      let digit = integerArray[i];
      let unit = chineseUnits[integerArray.length - i - 1];
      if (digit === 0) {
        if (i !== integerArray.length - 1 && integerArray[i + 1] !== 0) {
          chineseInteger += chineseNumbers[digit];
        }
      } else {
        chineseInteger += chineseNumbers[digit] + unit;
      }
    }
    let chineseDecimal = "";
    if (decimalPart) {
      let decimalArray = decimalPart.split("").map(Number);
      for (let i = 0; i < decimalArray.length; i++) {
        chineseDecimal += chineseNumbers[decimalArray[i]];
      }
    }
    let result = chineseInteger + (decimalPart ? "点" + chineseDecimal : "");
    return result || "零";
  }
  // 随机生成n个数字，并且n个数字不能重复
  generateUniqueRandomNumber(count) {
    let numbers = Array.from({ length: 10 }, (_, i) => i);
    for (let i = numbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }
    let result = numbers.slice(0, count).join("");
    return result;
  }
  // 页面上一些数字展示，超过1000的，展示为1,236格式，超过10000的，展示为1w
  getNumberText(count) {
    if (count && typeof count === "number") {
      if (count >= 1e4) {
        const num = (count / 1e4).toFixed(1);
        return `${num}w`;
      } else {
        return count.toLocaleString();
      }
    } else {
      return 0;
    }
  }
};
var numberC = new NumberC();
var number_default = numberC;

// node_modules/turing-plugin/lib/plugins/string/index.ts
var StringC = class {
  // 转大写
  toUpperCase(str) {
    if (str && typeof str === "string") {
      return str.toUpperCase();
    } else {
      return "";
    }
  }
  // 转小写
  toLowerCase(str) {
    if (str && typeof str === "string") {
      return str.toLowerCase();
    } else {
      return "";
    }
  }
  // 去除字符串两端的空格
  trim(str) {
    return str.replace(/^\s+|\s+$/g, "");
  }
  // 替换字符串中的某个字符或子串
  replaceAll(str, searchValue, replaceValue) {
    return str.split(searchValue).join(replaceValue);
  }
  // 获取查询字符串
  getSearchParamsValue(url, key) {
    if (url.indexOf("?") === -1) {
      return null;
    }
    const params = url.split("?")[1];
    const paramsArr = params.split("&");
    for (let i = 0; i < paramsArr.length; i++) {
      let paramItem = paramsArr[i];
      if (key === paramItem.split("=")[0]) {
        return paramItem.split("=")[1];
      }
    }
  }
  // 修改查询字符串的某个值 url必须要是一个完整的url地址
  setSearchParamsValue(url, key, value) {
    const urlObj = new URL(url);
    const params = urlObj.searchParams;
    params.set(key, value);
    return urlObj.toString();
  }
  // url转对象
  queryStringToObject(query) {
    if (query.includes("?")) {
      const arr = query.split("?");
      query = arr[1];
    } else {
      return null;
    }
    let pairs = query.split("&");
    let result = pairs.reduce((prev, current) => {
      let [key, value] = current.split("=");
      key = decodeURIComponent(key);
      value = decodeURIComponent(value);
      prev[key] = value;
      return prev;
    }, {});
    return result;
  }
  // 对象转url
  objectToQueryString(obj) {
    return Object.keys(obj).map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`).join("&");
  }
};
var stringC = new StringC();
var string_default = stringC;

// node_modules/turing-plugin/lib/plugins/text/index.ts
var TextC = class {
  // 复制
  copyText(beCopyText, callback) {
    const input = document.createElement("input");
    document.body.appendChild(input);
    input.setAttribute("value", beCopyText);
    input.select();
    if (document.execCommand("copy")) {
      document.execCommand("copy");
      callback();
    }
    document.body.removeChild(input);
  }
  // 文本框自动聚焦 如果start和end相等就是定位光标的位置，如果不相等就是选种从start到end间的字符
  setSelectionRange(inputEl, selectionStart, selectionEnd) {
    if (selectionEnd === void 0) {
      selectionEnd = selectionStart;
    }
    if (inputEl.setSelectionRange) {
      inputEl.focus();
      inputEl.setSelectionRange(selectionStart, selectionEnd);
    } else if (inputEl.createTextRange) {
      var range = inputEl.createTextRange();
      range.collapse(true);
      range.moveEnd("character", selectionEnd);
      range.moveStart("character", selectionStart);
      range.select();
    }
  }
  // 查找并替换敏感词
  replaceSensitiveWords(text, sensitiveWords, callback) {
    const regex = new RegExp(sensitiveWords.join("|"), "gi");
    const highlightedText = text.replace(regex, callback);
    return highlightedText;
  }
};
var textC = new TextC();
var text_default = textC;

// node_modules/turing-plugin/lib/plugins/file/index.ts
var FileC = class {
  // 获取文件后缀
  getFileSuffix(value) {
    const specialList = ["tar.gz"];
    let special_suffix = "";
    specialList.forEach((str) => {
      const Index = value.indexOf(str);
      if (Index > -1 && Index + str.length === value.length) {
        special_suffix = str;
      }
    });
    const arr = value.split(".");
    const last = arr[arr.length - 1];
    let suffix = "";
    if (special_suffix) {
      suffix = special_suffix;
    } else {
      suffix = `${last}`;
    }
    return suffix;
  }
  // 下载文件
  downloadFun(url, fileName) {
    const link = document.createElement("a");
    link.style.display = "none";
    link.href = url;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }
};
var fileC = new FileC();
var file_default = fileC;

// node_modules/turing-plugin/lib/plugins/store/index.ts
var StoreC = class {
  // 设置cookie expiresTime: 超时时间
  setCookie(key, value, expiresTime) {
    const exdate = /* @__PURE__ */ new Date();
    exdate.setTime(exdate.getTime() + expiresTime);
    let date = "";
    if (expiresTime) {
      date = `;expires=${exdate.toGMTString()}`;
    } else {
      date = "";
    }
    document.cookie = `${key}=${escape(value)}${date}`;
  }
  // 获取cookie
  getCookie(key) {
    let arr = new RegExp(`(^| )${key}=([^;]*)(;|$)`);
    const reg = new RegExp(`(^| )${key}=([^;]*)(;|$)`);
    if (arr = document.cookie.match(reg)) {
      return arr[2];
    } else {
      return null;
    }
  }
  // 删除cookie
  delCookie(key) {
    const exp = /* @__PURE__ */ new Date();
    exp.setTime(exp.getTime() - 1);
    const cval = this.getCookie(key);
    if (cval) {
      document.cookie = key + "=" + cval + ";expires=" + exp.toGMTString();
    }
  }
  // 设置localStorage
  setLocalstorage(key, value, expiresTime) {
    expiresTime = expiresTime || 0;
    let setObj = {
      value,
      expires: (/* @__PURE__ */ new Date()).getTime() + expiresTime,
      isExpires: expiresTime ? true : false
    };
    if (typeof window !== "undefined" && window.localStorage) {
      window.localStorage.setItem(key, JSON.stringify(setObj));
    }
  }
  // 获取localStorage
  getLocalstorage(key) {
    let storageValueString = "";
    if (typeof window !== "undefined" && window.localStorage) {
      storageValueString = window.localStorage.getItem(key);
      if (!storageValueString) {
        return null;
      }
      const storageValue = JSON.parse(storageValueString);
      if (!storageValue.isExpires) {
        return storageValue.value;
      }
      const expiresTime = storageValue.expires;
      if (expiresTime && expiresTime < (/* @__PURE__ */ new Date()).getTime()) {
        window.localStorage.removeItem(key);
        return null;
      }
      return storageValue.value;
    } else {
      return "";
    }
  }
};
var storeC = new StoreC();
var store_default = storeC;

// node_modules/turing-plugin/lib/plugins/browser/index.ts
var BrowserC = class {
  // 获取当前浏览器信息
  getBrowserInfo() {
    const userAgent = navigator.userAgent;
    let browserName = "Unknown";
    let version = "Unknown";
    if (/MSIE|Trident/.test(userAgent)) {
      browserName = "Internet Explorer";
      version = /MSIE (\d+\.\d+);/.test(userAgent) ? RegExp.$1 : "Unknown";
    } else if (/Firefox[\/\s](\d+\.\d+)/.test(userAgent)) {
      browserName = "Firefox";
      version = RegExp.$1;
    } else if (/Chrome[\/\s](\d+\.\d+)/.test(userAgent)) {
      browserName = "Chrome";
      version = RegExp.$1;
    } else if (/Opera[\/\s](\d+\.\d+)/.test(userAgent)) {
      browserName = "Opera";
      version = RegExp.$1;
    } else if (/Safari[\/\s](\d+\.\d+)/.test(userAgent)) {
      browserName = "Safari";
      version = RegExp.$1;
    } else if (/Edge[\/\s](\d+\.\d+)/.test(userAgent)) {
      browserName = "Edge";
      version = RegExp.$1;
    }
    return { browserName, version };
  }
  // 判断是否为手机端浏览器
  isMobileBrowser() {
    if (window.navigator.userAgent.match(
      /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
    )) {
      return true;
    } else {
      return false;
    }
  }
  // 获取屏幕分辨率
  getScreenResolution() {
    return {
      width: window.screen.width,
      height: window.screen.height
    };
  }
  // 获取浏览车窗口大小
  getWindowSize() {
    return {
      width: window.innerWidth,
      height: window.innerHeight
    };
  }
  // 可视区滚动到底部
  scrollToBottom(selector) {
    const $el = document.querySelector(selector);
    if ($el && $el.scrollHeight > 100) {
      $el.scrollTop = $el.scrollHeight;
    }
  }
};
var browserC = new BrowserC();
var browser_default = browserC;

// node_modules/turing-plugin/lib/plugins/reg/index.ts
var RegC = class {
  // 邮箱验证
  email(val) {
    const regx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regx.test(val);
  }
  // 手机号码验证
  phone(val) {
    const regx = /^1[3456789]\d{9}$/;
    return regx.test(val);
  }
  // url验证
  url(val) {
    const regx = /^(ftp|http|https):\/\/[^ "]+$/;
    return regx.test(val);
  }
  // 身份证号码验证
  idCard(val) {
    const regx = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    return regx.test(val);
  }
  // ip地址验证
  ip(val) {
    const regx = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/;
    return regx.test(val);
  }
  // 业务中用到比较多的名称校验规则 由中文、英文、数字、中划线、下划线组成的名称
  generalName(val) {
    const regx = /^[a-zA-Z0-9_\s\-\u4e00-\u9fa5]+$/;
    return regx.test(val);
  }
  // 业务中用到比较多的英文名称校验规则 由英文、数字、中划线、下划线组成的英文名称
  generalCode(val) {
    const regx = /^[a-zA-Z0-9_-\s]+$/;
    return regx.test(val);
  }
};
var regC = new RegC();
var reg_default = regC;
export {
  browser_default as browserC,
  data_default as dataC,
  file_default as fileC,
  number_default as numberC,
  reg_default as regC,
  store_default as storeC,
  string_default as stringC,
  text_default as textC,
  time_default as timeC
};
//# sourceMappingURL=turing-plugin.js.map
