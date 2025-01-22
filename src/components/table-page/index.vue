<!-- 
  管理端列表页公共组件：
  所有列表交互引入该组件，方便后期统一维护 
  包括：筛选栏、操作栏、列表栏、分页栏
-->
<template>
  <div class="table-page-wrapper height-adaptive" ref="table-page-wrapper">
    <!-- 查询+操作栏 -->
    <div class="query-wrapper" ref="custom-query">
      <!-- 可以由父组件自定义交互 -->
      <slot name="query" v-if="$slots.query"></slot>
      <!-- 也可以固定交互，一般一个项目的查询栏/操作栏交互风格都是一致，特殊情况再去自定义 -->
      <!-- 默认查询和操作栏在同一行展示，如果内容较多一行排不下可通过参数oneLine="false"设置分行展示 -->
      <!-- 这里的交互以实际项目为准 -->
      <div class="query-operation" :class="{'oneLine': oneLine}" v-else>
        <tu-query
          v-if="withQuery" 
          :query="query"
          :queryItems="queryItems"
          v-bind="queryAttrs"
          @search="events.searchQuery"
          @reset="events.resetQuery"
          @toggle="events.toggleQuery" />
        <my-operation v-if="withOperation" v-bind="operationAttrs">
          <template #buttonGroup>
            <slot name="buttonGroup"></slot>
          </template>
        </my-operation>
      </div>
    </div>
    <!-- 表格 -->
    <div class="table-wrapper" style="height: 100%;">
      <tu-table
        :height="table.tableHeight"
        :data="table.tableData"
        :columns="columns"
        :operations="operations"
        :withOrder="withOrder"
        :orderOption="{
          width: '80',
          pageNum: page.pageNum,
          pageSize: page.pageSize,
          ...orderOption
        }"
        :withSelection="withSelection"
        :selectionOption="selectionOption"
        :draggable="draggable"
        :draggableOption="draggableOption"
        :noText="noText"
        v-bind="tableAttrs"
        @selection-change="events.handleSelectionChange"
        @handleOperation="events.handleOperation">
        <!-- 数据为空 -->
        <template #empty>
          <tu-empty/>
        </template>
        <!-- 抛出表格项插槽 -->
        <template v-slot:[item.prop]="{row, $index}" v-for="item of customSlots">
          <slot :name="item.prop" :row="row" :$index="$index"></slot>
        </template>
        <!-- 抛出头部插槽 -->
        <template v-slot:[`${item.prop}-header`]="{row, $index}" v-for="item of columns">
          <slot :name="`${item.prop}-header`" :row="row" :$index="$index"></slot>
        </template>
      </tu-table>
    </div>
    <!-- 分页 -->
    <div class="pagination-wrapper" ref="custom-pagination" v-if="withPagination" v-show="page.total > 10">
      <my-pagination
        v-bind="{
          ...pageAttrs,
          ...page,
        }"
        @current-change="events.currentChange"
        @size-change="events.sizeChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted, onUnmounted, nextTick, watch, computed } from "vue";
import { assign, cloneDeep, debounce } from 'lodash-es'
import { NO_TEXT } from '@/utils/constants'
import useCtx from "@/hooks/useCtx"
const { proxy } = useCtx();
const props = defineProps({
  /* 查询栏相关 */
  withQuery: { type: Boolean, default: true },
  query: { default () { return { } } },
  queryItems: { type: Object, default () {return {} } },
  queryAttrs: { type: Object },
  oneLine: { type: Boolean, default: true },
  /* 操作栏相关 */
  withOperation: { type: Boolean, default: true },
  operationAttrs: { type: Object, default: {} },
  /* 分页栏相关 */
  withPagination: { type: Boolean, default: true },
  pageAttrs: { type: Object },
  /* 列表相关 */
  columns: {type: Array<any>, default () {return [] } },
  operations: {type: Array<any>, default () {return [] } },
  withOrder: { type: Boolean, default: true},
  orderOption: { type: Object },
  withSelection: { type: Boolean, default: false },
  selectionOption: { type: Object },
  draggable: { type: Boolean, default: false },
  draggableOption: { type: Object },
  noText: { type: String, default: NO_TEXT },
  tableAttrs: { type: Object, default () {return {} }  }, // 更多的el-table支持的属性通过tableAttrs传即可
  /* 列表接口查询 */
  loadDataApi: { type: Function, default: (e: any) => e },
  loadImmediately: { type: Boolean, default: true }, // 是否立即查询，有些查询需要父组件自行去操作，可以传参false;
  /* 数据转换 */
  transformQuery: { type: Function, default: (e: any) => e },   // 处理请求参数
  transformListData: { type: Function, default: (e: any) => e}, // 加载完数据之后，对数据的转换逻辑
})
const emits = defineEmits(['handleOperation', 'selection-change', 'search', 'reset', 'reload'])

/* 查询项变化 */
watch(
  () => props.query,
  () => {
    page.pageNum = 1
    loadData()
  }
)

/* 分页 */
const page = reactive({
  pageNum: 1,
  pageSize: 10,
  total: 0,
  pageSizes: [10, 20, 30, 40, 50]
});

/* 表格 */
const table: any = reactive({
  tableData: [],
  tableHeight: 0
});

/* 事件 */
// 其中table的事件都支持，按需添加即可
const events = reactive({
  handleOperation: (data: any) => {
    emits('handleOperation', data)
  },
  handleSelectionChange: (arr: any) => {
    emits('selection-change', arr)
  },
  currentChange: (val: number) => {
    page.pageNum = val;
    loadData()
  },
  sizeChange: (val: number) => {
    page.pageSize = val;
    loadData()
  },
  searchQuery: (query: any) => {
    emits('search', query)
  },
  resetQuery: () => {
    emits('reset')
  },
  toggleQuery: () => {
    nextTick(() => {
      mediaHeight()
    })
  }
})

/* 列表接口调用（根据分页和query加载列表数据） */
const loadData = () => {
  const data = {
    page: page.pageNum,
    size: page.pageSize
  }
  const pageData = props.withPagination ? data : {}
  const params = props.transformQuery(assign({}, pageData, props.query))
  return props.loadDataApi(params).then((res: any) => {
    if (props.withPagination) {
      table.tableData = props.transformListData(res.content, res.totalElements)
      page.total = res.totalElements
    } else {
      table.tableData = props.transformListData(res.data)
    }
    nextTick(() => {
      mediaHeight()
    })
  }).catch(() => {
    nextTick(() => {
      mediaHeight()
    })
  })
}

// 页面加载完成，是否立即调用查询接口，有些查询需要父组件自行去操作，可以传参false
if (props.loadImmediately) {
  loadData()
}

// 计算表格高度
const mediaHeight = () => {
  const contextHeight = proxy.$refs["table-page-wrapper"]?.offsetHeight || 0;
  const queryHeight = proxy.$refs["custom-query"]?.offsetHeight || 0;
  const paginationHeight = proxy.$refs["custom-pagination"]?.offsetHeight || 0;
  table.tableHeight = contextHeight - (queryHeight + paginationHeight + 13);
};

// 表格项自定义插槽
const customSlots = computed(() => {
  const _slots: any = props.columns.filter((v: any) => v.custom === 'slot')
  return _slots
})

// 获取表格数据[方便父组件获取表格数据]
const getTableData = () => {
  return table.tableData
}

/* 生命周期 */
const debounceFun = debounce(mediaHeight, 200)
onMounted(() => {
  const debounceFun = debounce(mediaHeight, 200)
  window.addEventListener("resize", debounceFun);
}),
onUnmounted(() => {
  window.removeEventListener("resize", debounceFun);
});

defineExpose({
  loadData, 
  getTableData,
  mediaHeight
})
</script>

<style lang="scss" scoped>
.table-page-wrapper {
  height: 100%;
  >div {
    @include area-padding;
    background: #fff;
  }
  .query-wrapper {
    padding-bottom: 0px;
    .query-operation {
      &.oneLine {
        @include flexBetween(flex-start);
      }
    }
  }
  .table-wrapper {
    padding-top: 0;
  }
  .pagination-wrapper {
    position: relative;
    @include flex();
    justify-content: flex-end;
    padding-top: 0;
  }
}
</style>
