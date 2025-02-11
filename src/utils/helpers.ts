/*
* @Description: 一些公共的方法
* @Author: mxliu5
* @Date: 2023-08-11
*/
import { textC } from 'turing-plugin'
import { successMessage, warningMessage } from '@/utils/app-tip'
import { NO_TEXT, $t } from '@/utils/constants'

// 自定义一个require
export const require = (imgPath: string): string => {
  try {
    const handlePath = imgPath.replace("@", "..");
    let imgUrl = new URL(handlePath, import.meta.url).href;
    if (import.meta.env.MODE === "production") {
      imgUrl = imgUrl.replace("public", "dist");
    }
    return imgUrl;
  } catch (error) {
    console.warn(error);
    return ''
  }
};

// 复制
export function copyText (beCopyText: string, successMsg ? : string) {
  textC.copyText(beCopyText, () => {
    successMessage(successMsg || $t('tip.copySuccess'))
  })
}

// 粘贴
export async function pasteText() {
  try {
    const text = await navigator.clipboard.readText();
    return text;
  } catch (err) {
    console.error("Failed to paste: ", err);
    /** 火狐浏览器在125以下不支持读取粘贴板数据，navigator.clipboard无readText函数，异常 */
    navigator.userAgent.includes("Firefox") && warningMessage("因浏览器安全策略限制，当前浏览器不支持快捷粘贴！");
    return "";
  }
}

// 文本展示
export const getText = (text: any) => {
  if (text === 0) {
    return text;
  } else {
    return text || NO_TEXT;
  }
};
