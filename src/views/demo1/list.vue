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
      :loadDataApi="getTemplateList"
      :transformListData="transformListData"
      @handleOperation="handleOperation"
      @selection-change="handleSelectionChange"
      @search="searchQuery">
      <!-- 操作栏按钮组 -->
      <template #buttonGroup>
        <tu-button type="add" @click="events.add">新建模版</tu-button>
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
      <!-- 表格项的插槽内容 -->
      <template #desc="scope">
        <el-icon><Service /></el-icon>
        <span style="display:inline-block; color: red; margin-left: 5px;">{{ scope.row.desc }}</span>
      </template>
      <!-- 表格头部的插槽内容 -->
      <template #status-header>
        {{$t('common.status')}}<tu-tooltip content="状态的相关提示信息"/>
      </template>
      <template #desc-header>
        <b style="color: blue">自定义头部</b>
        <tu-tooltip content="当前列的头部内容自定义名称以prop-header命名"/>
      </template>
    </TablePage>
    <AddDialog ref="addRef" @reload="loadList" />
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import { $t } from '@/utils/constants'
import { getTemplateList } from '@/api/mock'
import AddDialog from "./add.vue";
import useCtx from "@/hooks/useCtx";
import useTablePage from "@/hooks/useTablePage";
// hooks
const routeName = 'mock-demo'
const { $app, proxy, $router } = useCtx();
const { query, queryItems, searchQuery, selectedIds, handleSelectionChange } = useTablePage(routeName);
/* 查询 */
query.value = {
  city: [],
  keywords: ''
}
queryItems.value = {
  city: {
    label: '城市', 
    type: "el-cascader", 
    options: [
      { 
        code: 'anhui', 
        name: "安徽", 
        children: [
          {code: 'hefei', name: '合肥'},
          {code: 'fuyang', name: '阜阳'},
          {code: 'tongning', name: '铜陵'}
        ] 
      },
      { 
        code: 'jiangsu', 
        name: "江苏", 
        children: [
          {code: 'nanjing', name: '南京'},
          {code: 'suzhou', name: '苏州'},
          {code: 'wuxi', name: '无锡'}
        ] 
      },
    ], 
    attrs: {
      props: {
        checkStrictly: true,
        value: "code",
        label: "name",
        children: "children"
      }
    }
  },
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
  // 文本可编辑
  { 
    prop: "name", 
    label: $t('common.name'), 
    minWidth: 180, 
    showOverflowTooltip: false,
    custom: 'editInput',
    customRender: {
      blur: (row: any) => {
        console.log('当前行', row)
        loadList()
      }
    }
  },
  // 文本可复制
  { prop: "appId", label: "APPID", withCopy: true, width: 280, showOverflowTooltip: false},
  // tag标签
  { 
    prop: "type", 
    label: $t('common.type'), 
    minWidth: 150,
    custom: "tag-status",
    customRender: {
      options: {
        1: { type: "danger", name: "黑名单" },
        2: { type: "primary", name: "白名单" },
      },
      tagAttrs: {
        size: 'small',
        round: true
      }
    }
  },
  // 状态项
  {
    prop: "status",
    label: $t('common.status'),
    minWidth: 150,
    custom: "status",
    // 根据状态实际取值来定义
    customRender: {
      options: {
        1: { type: "success", name: "已发布" },
        2: { type: "info", name: "未发布" },
        3: { type: "danger", name: "已驳回" },
        4: { type: "warning", name: "上线审核中" },
        5: { type: "primary", name: "下线审核中" },
      },
      tips: (record: any) => record.rejectReason // 驳回原因
    },
  },
  // 开关项
  {
    prop: "enable", 
    label: $t('common.enableOrNot'),
    minWidth: 150,
    custom: 'switch',
    customRender: {
      disabled: (record: any) => record.status === 1,
      beforeChange: (record: any) => {
        return new Promise((resolve: any, reject: any) => {
          // 禁用需要确认提示，启用直接执行
          if (record.enable === 1) {
            $app.$confirm({title: '确定禁用？'}).then(() => {
              // 在这里调用接口，接口调用成功执行resolve(true) 调用失败执行reject()
              resolve(true)
            }).catch(() => {
              reject()
            })
          } else {
            resolve(true)
          }
        })
      }
    }
  },
  // 可点击项
  { 
    prop: "num", 
    label: "关联数量", 
    minWidth: 100,
    custom: 'link',
    customRender: {
      disabled: (record: any) => record.num === 0,
      click: (row: any) => {
        console.log(row)
      },
      attrs: {
        font: { fontWeight: 600 }
      }
    }
  },
  // 自定义内容（插槽）
  { prop: "desc", label: "自定义插槽11", custom: 'slot', minWidth: 280},
  { prop: "date", label: $t('common.updateTime'), minWidth: 180 },
  { prop: "operation", label: $t('common.operation'), width: 180, fixed: 'right' }
]);
const operations = [
  { type: "detail", label: $t("btn.detail") },
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
    proxy.$refs.addRef?.openDialog("add");
  },
  batchDelete: () => {
    $app.$deleteConfirm({
      title: '确认删除选中的模版'
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
    proxy.$refs.addRef?.openDialog("edit", record);
  },
  delete: (record: any) => {
    $app.$deleteConfirm({
      title: $t('tip.deleteConfirmTitle', {t: '模版名称', n: record.name})
    }).then(() => {
      console.log('删除', record)
      $app.$message.warning('接口待提供！')
    })
  },
  publish: (record: any) => {
    $app.$confirm({title: '确定发布当前模版？'})
    .then(() => {
      // 这里执行确认后的操作
      console.log('发布', record)
    }).catch(() => {
      // 这里执行取消后的操作 可以不加catch
    })
  }
})

/* 列表刷新 */
const loadList = () => {
  proxy.$refs.myTableRef.loadData();
};
</script>

<style lang="scss" scoped>
</style>