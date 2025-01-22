<template>
  <div class="page-list">
    <el-tabs v-model="activeType" @tab-change="handleTabChange" style="padding: 0 16px;">
      <el-tab-pane name="1" label="待审核列表"></el-tab-pane>
      <el-tab-pane name="2" label="已审核列表"></el-tab-pane>
    </el-tabs>
    <List 
      style="height: calc(100% - 40px)"
      v-if="inited" 
      :activeType="activeType" 
      @queryCacheInit="queryCacheInit">
    </List>
  </div> 
</template>

<script setup lang="ts">
import { ref, nextTick } from "vue";
import List from "./list.vue";
import useStore from '@/store'

const { filter } = useStore()

const inited = ref<boolean>(true)
const reload = () => {
  inited.value = false
  nextTick(() => {
    inited.value = true
  })
}

// 切换tab页面时，清除上一次缓存的查询条件
const activeType = ref<string>('1')
const handleTabChange = () => {
  reload()
  filter.resetQueryChche('mock-demo4')
}

const queryCacheInit = (queryCache: any) => {
  // 如果有缓存值，则回显缓存的值
  if (queryCache && queryCache.type) {
    activeType.value = queryCache.type
  }
}
</script>

<style lang="scss" scoped>
.page-list {
  height: 100%;
}
</style> 