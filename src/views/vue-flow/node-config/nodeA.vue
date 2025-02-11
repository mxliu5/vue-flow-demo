<template>
    <div>
      <el-form>
        <el-form-item label="名称">
          <el-input v-model="nodeInfo.name"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="nodeInfo.desc"></el-input>
        </el-form-item>
      </el-form>
    </div>
</template>

<script setup lang="ts">
defineProps({
  nodeInfo: { type: Object, default () { return {} } }
})
</script>

<style scoped>

</style>