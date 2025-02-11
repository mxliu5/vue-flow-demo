<template>
    <div class="start-node">
      <Handle type="source" :position="Position.Bottom"/>
      开始
    </div>
  </template>
  
  <script setup lang="ts">
  import { Position, Handle } from '@vue-flow/core'
  defineProps({
    node: { type: Object, default () { return {} } },
    useFlowFnIns: { type: Object }
  })
  
  </script>
  
  <style lang="scss" scoped>
  .start-node {
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    box-shadow: 0 0 28px 6px #00000008, 0 0 32px #00000003, 0 0 6px -6px #0000000f;
    border:1px solid $primary-color;
    border-radius: 50%;
    background: linear-gradient(#f2f2ff 0%, #fcfcff 100%);
  }
  </style>   