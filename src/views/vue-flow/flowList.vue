<template>
  <div class="mock-list">
    <TablePage
      ref="myTableRef"
      :query="query"
      :queryItems="queryItems"
      :queryAttrs="{
        labelColon: false,
        refreshBtn: { show: true }
      }"
      :operationAttrs="{
        selectedTotal: selectedIds.length
      }"
      :columns="columns"
      :operations="operations"
      :with-order="false"
      with-selection
      :selection-option="{
        selectable: (row: any) =>row.status !== 1,
        'reserve-selection': true
      }"
      :tableAttrs="{ 
        'row-key': 'id' 
      }"
      :loadDataApi="getFlowList"
      :transformListData="transformListData"
      @handleOperation="handleOperation"
      @selection-change="handleSelectionChange"
      @search="searchQuery">
      <!-- 操作栏按钮组 -->
      <template #buttonGroup>
        <tu-button type="add" @click="events.add">新建流程</tu-button>
        <tu-button
          type="delete"
          :tooltipButton="{
            clickable: selectedIds.length > 0,
            handle: '删除'
          }"
          @click="events.batchDelete">
          批量删除
        </tu-button>
      </template>
    </TablePage>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import { $t } from '@/utils/constants'
import { getFlowList } from '@/api/mock'
import useCtx from "@/hooks/useCtx";
import useTablePage from "@/hooks/useTablePage";
// hooks
const routeName = 'vue-flow'
const { $app, $router } = useCtx();
const { query, queryItems, searchQuery, selectedIds, handleSelectionChange } = useTablePage(routeName);
/* 查询 */
query.value = {
  keywords: ''
}
queryItems.value = {
  keywords: {
    type: 'el-input',
    label: $t('common.keywordSearch'),
    showAppend: true,     // 后置搜索按钮的文本框
    attrs: {
      placeholder: $t('placeholder.searchByKey'),
    }
  }
}

/* 表格 */
const columns = ref([
  { 
    prop: "name", 
    label: '流程名称', 
    custom: 'link',
    customRender: {
      click: (row: any) => {
        $router.push({
          name: `${routeName}::detail`,
          params: {
            id: row.id
          }
        })
      }
    }
  },
  { prop: "desc", label: "流程描述"},
  {
    prop: "status",
    label: '状态',
    custom: "status",
    // 根据状态实际取值来定义
    customRender: {
      options: {
        0: { type: "info", name: "未发布" },
        1: { type: "success", name: "已发布" }
      }
    },
  },
  { prop: "date", label: $t('common.updateTime')},
  { prop: "operation", label: $t('common.operation'), width: 220, fixed: 'right' }
]);
const operations = [
  { type: "detail", label: '画布详情' },
  { type: "edit", label: $t("btn.edit") },
  { type: "delete", label: $t("btn.delete"), btnType: "danger", disabled: (record: any) => record.status === 3, disabledTips: '已发布状态不支持删除！', collapsed: true },
  { type: "publish", label: $t("btn.publish"), exist: (record: any) => [2, 3].includes(record.status), collapsed: true },
  { type: "offline", label: $t("btn.offline"), exist: (record: any) => record.status === 1, collapsed: true },
];
// 转换接口返回的数据
const transformListData = (data: any) => {
  return data.map((x: any) => {
    return x;
  });
};

const handleOperation = (data: any) => {
  const { type, record } = data;
  events[type](record)
};
/* events */
const events: any = reactive({
  add: () => {
    $app.$message.warning('待实现！')
  },
  batchDelete: () => {
    $app.$deleteConfirm({
      title: '确认删除选中的流程'
    }).then(() => {
      console.log('删除的项', selectedIds.value)
    })
  },
  detail: (record: any) => {
    $router.push({
      name: `${routeName}::detail`,
      params: {
        id: record.id
      }
    })
  },
  edit: (record: any) => {
    $app.$message.warning('待实现！')
  },
  delete: (record: any) => {
    $app.$deleteConfirm({
      title: $t('tip.deleteConfirmTitle', {t: '流程名称', n: record.name})
    }).then(() => {
      console.log('删除', record)
      $app.$message.warning('接口待提供！')
    })
  },
  publish: (record: any) => {
    $app.$confirm({title: '确定发布当前流程？'})
    .then(() => {
      // 这里执行确认后的操作
      console.log('发布', record)
    }).catch(() => {
      // 这里执行取消后的操作 可以不加catch
    })
  }
})

</script>

<style lang="scss" scoped>
</style>