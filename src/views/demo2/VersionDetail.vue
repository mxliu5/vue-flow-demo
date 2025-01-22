<template>
  <div>
    <FullscreenPage title="版本详细信息" @close="close">
      <!-- 头部，已内置左侧返回按钮和标题，这部分代码按需添加 -->
      <template #header>
        <div class="center">中间区域内容</div>
        <div class="right">
          <tu-button type="primary">保存</tu-button>
        </div>
      </template>
      <tu-table
        style="height: 100%;"
        :columns="columns"
        :data="tableData">
      </tu-table>
    </FullscreenPage>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import FullscreenPage from '@/components/layout/FullscreenPage.vue'
const emits = defineEmits(['close'])
const close = () => {
  emits('close')
};
const columns = ref([
  { prop: 'versionNo', label: '版本号'},
  { prop: 'status', label: '版本状态' },
  { prop: 'updateDate', label: '更新时间'},
  { prop: 'versionDesc', label: '版本描述' }
])
const tableData = ref<Array<any>>([])
const getTableData = (page ? : any) => {
  console.log('分页信息', page)
  tableData.value = [
    { versionNo: 'V1.0', status: '草稿', updateDate: '2024-10-23 10:32', versionDesc: '版本描述信息' },
    { versionNo: 'V1.1', status: '草稿', updateDate: '2024-10-23 10:32', versionDesc: '版本描述信息' },
    { versionNo: 'V1.2', status: '已发布', updateDate: '2024-10-23 10:32', versionDesc: '版本描述信息' },
    { versionNo: 'V1.3', status: '草稿', updateDate: '2024-10-23 10:32', versionDesc: '版本描述信息' },
    { versionNo: 'V1.4', status: '已启用', updateDate: '2024-10-23 10:32', versionDesc: '版本描述信息' },
    { versionNo: 'V1.5', status: '草稿', updateDate: '2024-10-23 10:32', versionDesc: '版本描述信息' },
    { versionNo: 'V1.6', status: '草稿', updateDate: '2024-10-23 10:32', versionDesc: '版本描述信息' },
    { versionNo: 'V1.7', status: '草稿', updateDate: '2024-10-23 10:32', versionDesc: '版本描述信息' },
    { versionNo: 'V1.8', status: '草稿', updateDate: '2024-10-23 10:32', versionDesc: '版本描述信息' },
    { versionNo: 'V1.9', status: '草稿', updateDate: '2024-10-23 10:32', versionDesc: '版本描述信息' },
    { versionNo: 'V1.0', status: '草稿', updateDate: '2024-10-23 10:32', versionDesc: '版本描述信息' },
    { versionNo: 'V1.1', status: '草稿', updateDate: '2024-10-23 10:32', versionDesc: '版本描述信息' },
    { versionNo: 'V1.2', status: '已发布', updateDate: '2024-10-23 10:32', versionDesc: '版本描述信息' },
    { versionNo: 'V1.3', status: '草稿', updateDate: '2024-10-23 10:32', versionDesc: '版本描述信息' },
    { versionNo: 'V1.4', status: '已启用', updateDate: '2024-10-23 10:32', versionDesc: '版本描述信息' },
    { versionNo: 'V1.5', status: '草稿', updateDate: '2024-10-23 10:32', versionDesc: '版本描述信息' },
    { versionNo: 'V1.6', status: '草稿', updateDate: '2024-10-23 10:32', versionDesc: '版本描述信息' },
    { versionNo: 'V1.7', status: '草稿', updateDate: '2024-10-23 10:32', versionDesc: '版本描述信息' },
    { versionNo: 'V1.8', status: '草稿', updateDate: '2024-10-23 10:32', versionDesc: '版本描述信息' },
    { versionNo: 'V1.9', status: '草稿', updateDate: '2024-10-23 10:32', versionDesc: '版本描述信息' },
    { versionNo: 'V1.0', status: '草稿', updateDate: '2024-10-23 10:32', versionDesc: '版本描述信息' },
    { versionNo: 'V1.1', status: '草稿', updateDate: '2024-10-23 10:32', versionDesc: '版本描述信息' },
    { versionNo: 'V1.2', status: '已发布', updateDate: '2024-10-23 10:32', versionDesc: '版本描述信息' },
    { versionNo: 'V1.3', status: '草稿', updateDate: '2024-10-23 10:32', versionDesc: '版本描述信息' },
    { versionNo: 'V1.4', status: '已启用', updateDate: '2024-10-23 10:32', versionDesc: '版本描述信息' },
    { versionNo: 'V1.5', status: '草稿', updateDate: '2024-10-23 10:32', versionDesc: '版本描述信息' },
    { versionNo: 'V1.6', status: '草稿', updateDate: '2024-10-23 10:32', versionDesc: '版本描述信息' },
    { versionNo: 'V1.7', status: '草稿', updateDate: '2024-10-23 10:32', versionDesc: '版本描述信息' },
    { versionNo: 'V1.8', status: '草稿', updateDate: '2024-10-23 10:32', versionDesc: '版本描述信息' },
    { versionNo: 'V1.9', status: '草稿', updateDate: '2024-10-23 10:32', versionDesc: '版本描述信息' },
  ]
}
getTableData()
</script>

<style lang="scss" scoped>

</style>