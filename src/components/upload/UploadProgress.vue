<template>
    <div class="import-progress flex">
      <label>{{ title }}：</label>
      <div class="progress-box" style="width: 200px;">
        <el-progress
          :percentage="percentage" 
          :status="status"
          :stroke-width="5"
          />
      </div>
    </div>
</template>  
<script setup lang="ts">
import { ref, watch } from 'vue'
import useCtx from '@/hooks/useCtx'
const { $app } = useCtx()
const props = defineProps({
  title: { type: String, default: '导入进度' },
  percentage: { type: Number, default: 0 },
  uploadResult: { type: String, default: '' }
})
const emits = defineEmits(['reload'])

const status = ref<any>('')
watch(
  () => props.percentage,
  (nu: any) => {
    if (nu === 100) {
      status.value = 'success'
    } else {
      status.value = ''
    }
  }
)

watch(
  () => props.uploadResult,
  (result: string) => {
    if (result === '') return false
    const confirmFun = () => {
      emits('reload')
    }
    if (result === 'success') {
      $app.$confirm({
        type: 'success',
        title: '提示',
        message: '导入成功',
        showCancelButton: false
      }).then(() => {
        confirmFun()
      })
    } else {
      $app.$confirm({
        title: '提示',
        message: result,
        showCancelButton: false
      }).then(() => {
        confirmFun()
      })
    }
  }
)
</script>
<style lang="scss">
.import-progress {
  position: fixed;
  top: 65px;
  right: 24px;
  >label {
    font-size: 12px;
    color: $text-color-secondary;
    margin-right: 5px;
  }
}
</style>