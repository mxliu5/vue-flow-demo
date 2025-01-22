<!-- 公共操作栏 -->
<template>
    <div class="custom-operation">
      <div class="btn-box">
        <slot name="buttonGroup"></slot>
      </div>
      <!-- 如果表格为多选的，这里展示选中多少项 -->
      <div class="total-box" v-if="selectedTotal">
          {{ $t("title.selected") }}<span>{{ selectedTotal }}</span
          >{{ $t("title.item") }}
      </div>
    </div>
  </template>
  
  <script lang="ts" setup name="myOperation">
  defineProps({
    selectedTotal: {type: Number}
  })
  </script>
  
  <style lang="scss" scoped>
  .custom-operation {
    @include flex();
    margin-bottom: 16px;
    >div {
      @include flex();
      flex-wrap: wrap;
    }
    .total-box {
      font-size: 16px;
      color: $text-color-secondary;
      margin-left: 12px;
      >b,>span {
        display: inline-block;
      }
      &>b {
        color: $text-color;
        margin-right: 16px;
      }
      &>span {
        color: $primary-color;
        margin: 0 6px;
      }
    }
  }
  </style>
  