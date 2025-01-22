/*
* @Description: 一些公共的方法
* @Author: mxliu5
* @Date: 2023-08-11
*/
import { textC } from 'turing-plugin'
import { successMessage } from '@/utils/app-tip'
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

// 文本展示
export const getText = (text: any) => {
  if (text === 0) {
    return text;
  } else {
    return text || NO_TEXT;
  }
};
