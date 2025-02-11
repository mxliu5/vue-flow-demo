<template>
    <div>
      <el-form>
        <el-form-item label="分支名称">
          <el-input v-model="nodeInfo.branchName"></el-input>
        </el-form-item>
        <el-form-item label="分支类型">
          <el-checkbox-group v-model="nodeInfo.branchType">
            <el-checkbox value="类型1">类型1</el-checkbox>
            <el-checkbox value="类型2">类型2</el-checkbox>
            <el-checkbox value="类型3">类型3</el-checkbox>
          </el-checkbox-group>
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