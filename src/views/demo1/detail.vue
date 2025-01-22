<template>
  <div style="padding: 24px">
      这是详情页
      <tu-button @click="toDetail">进入下一个详情页面</tu-button>
  </div>
</template>

<script setup lang="ts">
import useCtx from "@/hooks/useCtx";
const { $app } = useCtx();
const routeName = 'mock-demo::detail'
const toDetail = () => {
    $app.$router.push({
        name: `${routeName}::detail2`
    })
}
</script>

<style scoped>

</style>