import { $t } from '@/utils/constants'
function errMsg (formatText: string) {
  return $t('tip.formatError') + '：' + $t('tip.onlySupport') + formatText
}

export const NAME_RULE = $t('tip.nameValidateTip')
export const CODE_RULE = $t('tip.codeValidateTip')
export const nameErrMsg = errMsg(NAME_RULE) // 名称格式错误提示
export const codeErrMsg = errMsg(CODE_RULE) // 编码格式错误提示


// 名称校验：中文、字母、数字、下划线、中划线
// export const validateNameReg = /^[a-zA-Z0-9_\s\u4e00-\u9fa5]+$/
export const validateNameReg = /^[a-zA-Z0-9_\s\-\u4e00-\u9fa5]+$/
export function validateName (value: string) {
  if (value) {
    return validateNameReg.test(value)
  } else {
    return true
  }
}

// 英文名校验：字母、数字、下划线
// export const validateCodeReg = /^[a-zA-Z0-9_\s]+$/
export const validateCodeReg = /^[a-zA-Z0-9_-\s]+$/
export function validateCode (value: string) {
  if (value) {
    return validateCodeReg.test(value)
  } else {
    return true
  }
}



