import { getCurrentInstance, ComponentInternalInstance } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  $confirm,
  $deleteConfirm,
  $message,
  successMessage,
  warningMessage,
  errorMessage,
  infoMessage,
  $notification
} from '@/utils/app-tip'

const useCtx = () => {
  const instance = getCurrentInstance() as ComponentInternalInstance;
  /** vue实例，常用于消息提示，例：$app.$message.error('') */
  const $app: any = instance?.appContext.config.globalProperties || {};
  const $router = useRouter();
  const $route = useRoute();
  /** 常用于获取ref，例：proxy.$refs.xxx */
  const proxy: any = instance?.proxy;
  /**  全局赋值 **/
  $app.$confirm = $confirm
  $app.$deleteConfirm = $deleteConfirm
  $app.$message = $message
  $app.$message.success = successMessage
  $app.$message.warning = warningMessage
  $app.$message.error = errorMessage
  $app.$message.info = infoMessage
  $app.$notification = $notification
  return {
    $app,
    $router,
    $route,
    proxy,
  };
};
export default useCtx;
