<template>
  <node-wrapper :node="node" :useFlowFnIns="useFlowFnIns" class="nodeA">
    {{ node.data.nodeInfo.desc }}
  </node-wrapper>
</template>

<script setup lang="ts">
import nodeWrapper from './nodeWrapper.vue';
defineProps({
  node: { type: Object, default () { return {} } },
  useFlowFnIns: { type: Object }
})

</script>

<style lang="scss" scoped>
</style>   