<template>
  <div class="mock-list">  
    <table-page
      ref="myTableRef"
      :query="query"
      :columns="columns"
      :operations="operations"
      :tableAttrs="{ 
        'row-key': 'id' 
      }"
      :with-order="false"
      draggable
      :draggable-option="{show: true, width: '80', align:'center'}"
      :loadDataApi="getTemplateList"
      :transformListData="transformListData"
      @handleOperation="handleOperation"
      @selection-change="handleSelectionChange">
      <!-- 这里不使用table-page封装的查询栏和操作栏，通过插槽自定义 -->
      <template #query>
        <div class="flexBetween">
          <tu-query
            :query="query"
            :queryItems="queryItems"
            :search-btn="{show: true}"
            @search="searchQuery"
            @toggle="events.toggleQuery">
            <!-- tu-query中不支持的表单控件，通过插槽自己自定义 -->
            <template #name="{item}">
              <el-input
                v-model="query.name"
                style="width: 320px"
                placeholder="请输入内容">
                <template #prepend>
                  <el-select v-model="query.selectValue" placeholder="Select" style="width: 80px">
                    <el-option label="名称" value="name" />
                    <el-option label="创建人" value="createUser" />
                  </el-select>
                </template>
                </el-input>
            </template>
          </tu-query>
          <my-operation v-bind="{selectedTotal: selectedIds.length}">
            <template #buttonGroup>
              <tu-button type="add">新建</tu-button>
              <tu-button type="import">导入</tu-button>
            </template>
          </my-operation>
        </div>
      </template>
    </table-page>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, nextTick } from "vue";
import { useI18n } from "vue-i18n"
import { getTemplateList } from '@/api/mock'
import useCtx from "@/hooks/useCtx";
import useTablePage from "@/hooks/useTablePage";

const { t } = useI18n();

// hooks
const routeName = 'mock-demo3'
const { $app, proxy, $router } = useCtx();
const { query, queryItems, searchQuery, selectedIds, handleSelectionChange } = useTablePage(routeName);

/* 查询 */
query.value = {
  type: undefined,
  selectValue: 'name',
  name: ''
}
queryItems.value = {
  type: {
    type: "el-select", 
    label: '类型',
    width: '160px',
    options: [
      {value: 1, label: '黑名单'},
      {value: 2, label: '白名单'}
    ]
  },
  name: {
    modelValue: '',
    type: 'slot',
    slotName: 'name'
  }
}

/* 表格 */
const columns = ref([
  { 
    prop: "name", 
    label: "名称", 
    minWidth: 180,
  },
  {
    prop: 'appId',
    label: 'APPID',
    minWidth: 180
  },
  // tag标签
  { 
    prop: "type", 
    label: "类型", 
    minWidth: 150,
    custom: "tag-status",
    customRender: {
      options: {
        1: { type: "danger", name: "黑名单" },
        2: { type: "primary", name: "白名单" },
      }
    }
  },
  // 状态项
  {
    prop: "status",
    label: "状态",
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
      }
    },
  },
  { prop: "date", label: "更新时间", minWidth: 180 },
  { prop: "operation", label: '操作', width: 180, fixed: 'right' }
]);

// 转换接口返回的数据
const transformListData = (data: any) => {
  return data.map((x: any) => {
    return x;
  });
};

/* 操作 */
const operations = [
  { type: "detail", label: t("btn.detail") },
  { type: "delete", label: t("btn.delete"), btnType: "danger", disabled: (record: any) => record.status === 3 }
];
const handleOperation = (data: any) => {
  const { type, record } = data;
  events[type](record)
};

/* events */
const events: any = reactive({
  // 点击展开/收起时，需要重新计算表格的高度
  toggleQuery () {
    nextTick(() => {
      proxy.$refs.myTableRef.mediaHeight();
    })
  },
  detail: (record: any) => {
    $router.push({
      name: `${routeName}::detail`,
      query: {
        id: record.id
      }
    })
  },
  delete: (record: any) => {
    $app.$deleteConfirm({
      title: t('tip.deleteConfirmTitle', {t: '模版名称', n: record.name})
    }).then(() => {
      console.log('删除', record)
      $app.$message.warning('接口待提供！')
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