/*
 * @Description: 封装一些全局提示类的方法
 * @Author: mxliu5
 * @Date: 2023-08-16
 */
import { h } from 'vue'
import { ElMessageBox, ElMessage, ElNotification } from 'element-plus'
import { $t } from '@/utils/constants'

/* MessageBox 消息弹框 */
export const $confirm = (options: any = {}, type ?: string) => {
  return new Promise((resolve: any, reject: any) => {
    const isDel = type === 'delete'
    const {title, message} = options
    ElMessageBox({
      appendTo: "#app",
      type: 'warning',
      autofocus: false,
      showCancelButton: true,
      distinguishCancelAndClose: true, // 区分取消按钮和关闭按钮
      confirmButtonText: isDel ? $t('btn.delete') : $t('btn.confirm'),
      confirmButtonClass: isDel && 'el-button--danger',
      ...options,
      title: '',
      message: h('div', {class: 'custom-message'}, [
        h('h3', null, title || $t('tip.warnTip')),
        h('p', null, message || (isDel ? $t('tip.deleteTip') : ''))
      ]),
    }).then(() => {
      resolve()
    }).catch((action) => {
      reject(action) // 取消 cancel 关闭close
    });
  });
};
export const $deleteConfirm = (options: any = {}) => {
  return new Promise((resolve: any, reject: any) => {
    $confirm(options, 'delete').then(() => {
      resolve()
    }).catch((action) => {
      reject(action)
    })
  })
};

/* Message 消息提示 */
export const $message = (options: any = {}, type: string) => {
  const isStr = typeof(options) === 'string'
  options = isStr ? {message: options } : options // 如果传的string,则直接当做message使用
  ElMessage({
    appendTo: '#app',
    type,
    duration: 3000,
    ...options
  })
}
export const successMessage = (options: any = {}) => {
  $message(options, 'success')
}
export const warningMessage = (options: any = {}) => {
  $message(options, 'warning')
}
export const errorMessage = (options: any = {}) => {
  $message(options, 'error')
}
export const infoMessage = (options: any = {}) => {
  $message(options, 'info')
}

/* Notification通知 */
export const $notification = (options: any = {}) => {
  ElNotification({
    appendTo: '#app',
    duration: 3000,
    title: '通知',
    ...options
  })
}