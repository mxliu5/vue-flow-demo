<template>
  <my-dialog 
    class="fullscreen-page"
    v-model="dialogVisible"
    fullscreen
    :with-header="false"
    :with-footer="false">
    <div class="fullscreen-page__header">
      <div class="header-left">
        <span class="header-back" @click="close">
          <el-icon><Back /></el-icon>
        </span>
        <p class="header-title">{{title}}</p>
      </div>
      <slot name="header"></slot>
    </div>
    <div class="fullscreen-page__container">
      <slot></slot>
    </div>
  </my-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
defineProps({
  title: { type: String }
})
const emits = defineEmits(['close'])
const dialogVisible = ref<boolean>(true)
const close = () => {
  emits('close')
};
</script>

<style lang="scss" scoped>
.fullscreen-page {
  .fullscreen-page__header {
    height: 52px;
    line-height: 52px;
    background: linear-gradient(94deg, #c4dfff 2.91%, #e4e7ff 51.96%, #e6f2ff 97%);
    border-bottom: 1px solid #ddd;
    padding: 0 16px;
    @include flexBetween();
    .header-left {
      @include flex();
      .header-back {
        @include model(32px, 32px);
        @include flexCenter();
        background: #f0f4fe;
        border-radius: 5px;
        margin-right: 12px;
        cursor: pointer;
      }
      .header-title {
        font-size: 16px;
        color: #000;
      }
    }
  }
  .fullscreen-page__container {
    @include area-padding();
    @include calc-height(52px);
    overflow-y: auto;
    background-color: #f5f5f5;
  }
}
</style>

<style lang="scss">
.fullscreen-page.el-dialog{
  background-size: cover;
  padding: 0;
  .el-dialog__body {
    padding: 0;
  }
}
</style>