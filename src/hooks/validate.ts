
import { validateCode, codeErrMsg, validateName, nameErrMsg } from '@/utils/validate';
export default () => {
    // 中文类名称校验（英文、数字、下划线、中划线组成）
    const validateNameRule = (rule : any, value: any, callback: any, msg: string,) => {
      if (value === '') {
        return callback(new Error(msg))
      } else if (!validateName(value)) {
        return callback(new Error(nameErrMsg))
        console.log(rule)
      } else {
        callback()
      }
    }
    // 英文类名称校验（英文、数字、下划线组成）
    const validateCodeRule = (rule : any, value: any, callback: any, msg: string,) => {
      if (value === '') {
        return callback(new Error(msg))
      } else if (!validateCode(value)) {
        return callback(new Error(codeErrMsg))
        console.log(rule)
      } else {
        callback()
      }
    }
    return {
      validateNameRule,
      validateCodeRule
    }
}