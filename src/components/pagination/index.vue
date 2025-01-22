<!-- 全局分页组件 继承el-pagination所有属性和事件-->
<template>
    <el-pagination
      class="custom-pagination"
      background
      :current-page="pageNum"
      :page-size="pageSize"
      :page-sizes="pageSizes"
      layout="total, prev, pager, next, sizes, jumper"
      :total="total"
      v-bind="$attrs"
    >
    </el-pagination>
  </template>
  
  <script lang="ts" setup>
  defineProps({
    pageNum: {
      type: Number,
      default: 1,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    pageSizes: {
      type: Array as any,
      default: () => [10, 20, 30, 40, 50],
    },
    total: {
      type: Number,
      default: 0,
    },
  });
  </script>
  
  <style lang="scss">
  </style>
  