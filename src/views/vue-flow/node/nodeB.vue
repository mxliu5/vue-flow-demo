<template>
  <node-wrapper :node="node" :useFlowFnIns="useFlowFnIns"  class="nodeB">
    {{ node.data.nodeInfo.branchType?.length ? node.data.nodeInfo.branchType : ''}}
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