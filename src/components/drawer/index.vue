<template>
  <el-drawer
    class="custom-drawer"
    v-model="dialogVisible"
    append-to="#app"
    v-bind="$attrs"
    :size="width"
    :show-close="showClose"
  >
    <template #header>
      <h4>{{ title }}</h4>
    </template>
    <template #default>
      <slot></slot>
    </template>
    <template #footer v-if="widthFooter">
      <div style="flex: auto">
        <tu-button @click="handleClose" v-if="showClose">{{ closeText }}</tu-button>
        <tu-button type="primary" @click="confirm" v-if="showConfirm">{{ confirmText }}</tu-button>
      </div>
    </template>
  </el-drawer>
</template>
 
<script setup lang="ts">
import { ref, watch, computed } from "vue";
import { $t } from '@/utils/constants'
const props = defineProps({
  modelValue: { type: Boolean, default: false },   // 父组件v-model绑定的值
  title: { type: String, default: $t("msg.title") },
  width: { type: String, default: "620px" },
  showClose: { type: Boolean, default: true },
  showConfirm: { type: Boolean, default: true },
  confirmText: { type: String, default: $t("btn.confirm") },
  closeText: { type: String, default: $t("btn.cancel") }
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
// 是否显示footer 取消和确认按钮都没有则不显示
const widthFooter = computed(() => {
  return props.showClose || props.showConfirm
})
</script>
 
<style lang="scss" scoped>
</style>
  