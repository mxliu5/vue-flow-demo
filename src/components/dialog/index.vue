<!-- 公共的弹窗 -->
<template>
  <el-dialog
    v-model="dialogVisible"
    class="custom-dialog"
    :class="{'hide-header': !withHeader, 'hide-footer': !withFooter}"
    append-to="#app"
    :width="width"
    v-bind="$attrs"
    :before-close="handleClose"
  >
    <template #header>
      <slot name="header" v-if="$slots.header"></slot>
      <span class="el-dialog__title" v-else>{{ title }}</span>
    </template>
    <slot></slot>
    <template #footer>
      <span class="dialog-footer">
        <tu-button type="primary" @click="confirm" v-if="showConfirm">
          {{ confirmText }}
        </tu-button>
        <tu-button @click="handleClose" v-if="showClose">{{
          closeText
        }}</tu-button>
      </span>
    </template>
  </el-dialog>
</template>
  
<script setup lang="ts">
import { ref, watch } from "vue";
import { $t } from '@/utils/constants'
const props = defineProps({
  modelValue: { type: Boolean, default: false },   // 父组件v-model绑定的值
  title: { type: String, default: $t("msg.title") },
  width: { type: String, default: '520px' },
  maxHeight: { type: String },
  showClose: { type: Boolean, default: true },
  showConfirm: { type: Boolean, default: true },
  confirmText: { type: String, default: $t("btn.confirm") },
  closeText: { type: String, default: $t("btn.cancel") },
  withHeader: { type: Boolean, default: true },
  withFooter: { type: Boolean, default: true }
});
const emits = defineEmits(["update:modelValue", "confirm", "close"]);
const dialogVisible = ref<boolean>(props.modelValue || false);
const confirm = () => {
  emits("confirm");
};
const handleClose = () => {
  emits("close");
};
// watch监听
watch(
  () => props.modelValue,
  (nu) => {
    dialogVisible.value = nu;
  }
);
watch(
  () => dialogVisible.value,
  (nu) => {
    emits('update:modelValue', nu)
  },
  { deep: true}
);
</script>

<style lang="scss" scoped>
</style>

<style lang="scss" scoped>
</style>
  