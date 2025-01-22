<template>
  <div class="mock-list">  
    <table-page
      ref="myTableRef"
      :oneLine="false"
      :query="query"
      :queryItems="queryItems" 
      :queryAttrs="{
        supportFold: true,
        searchBtn: {
          show: true
        }
      }"
      :operationAttrs="{
        selectedTotal: selectedIds.length
      }"
      :columns="columns"
      :operations="operations"
      with-selection
      :selection-option="{
        selectable: (row: any) =>row.status !== 1,
        'reserve-selection': true
      }"
      :tableAttrs="{ 
        'row-key': 'id' 
      }"
      :loadDataApi="getTemplateList"
      :transformQuery="transformQuery"
      :transformListData="transformListData"
      @handleOperation="handleOperation"
      @selection-change="handleSelectionChange"
      @search="searchQuery">
      <template #buttonGroup>
        <tu-button type="add">{{$t('btn.new')}}</tu-button>
        <tu-button type="import">{{$t('btn.import')}}</tu-button>
        <tu-button type="export">{{$t('btn.export')}}</tu-button>
        <tu-button
          type="delete"
          :tooltipButton="{
            clickable: selectedIds.length > 0,
            handle: $t('btn.delete')
          }">
          {{$t('btn.batchDelete')}}
        </tu-button>
      </template>
      <!-- 表格项的插槽内容 -->
      <template #desc="scope">
        <el-icon><Service /></el-icon>
        <span style="display:inline-block; color: red; margin-left: 5px;">{{ scope.row.desc }}</span>
      </template>
    </table-page>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import { timeC } from 'turing-plugin'
import { $t } from '@/utils/constants'
import { getTemplateList } from '@/api/mock'
import useCtx from "@/hooks/useCtx";
import useTablePage from "@/hooks/useTablePage";

// hooks
const routeName = 'mock-demo2'
const { $app, proxy, $router } = useCtx();
const { query, queryItems, searchQuery, selectedIds, handleSelectionChange } = useTablePage(routeName);

/* 查询 */
query.value = {
  dateRange: timeC.createRangeByDay(7, true),
  keywords: '',
  appId: '',
  type: undefined,
  status: undefined,
  city: [],
  angentType: 'xh'
}
queryItems.value = {
  dateRange: { 
    type: "quickDate", 
    label: '选择日期',
    width: '320px',
    attrs: {
      clearable: false,
      withTime: true
    },
    quick: {
      modelValue: 7,
      options: [
        {value:7, label: '近七日'},
        {value:30, label: '近30日'},
        {value:timeC.getDaysInLastYear(), label: '近1年'}
      ]
    } 
  },
  keywords: {
    type: 'el-input',
    label: '关键词搜索',
    width: '180px',
    attrs: {
      placeholder: '请输入关键字进行搜索'
    }
  },
  appId: {
    type: 'el-input',
    label: 'APPID',
    width: '180px',
    attrs: {
      placeholder: '请输入APPID进行搜索'
    }
  },
  type: {
    type: "el-select", 
    label: '类型',
    width: '160px',
    options: [
      {value: 1, label: '黑名单'},
      {value: 2, label: '白名单'}
    ]
  },
  status: {
    type: "el-select", 
    label: '状态',
    width: '180px',
    options: [
      {value: 1, label: '已发布'},
      {value: 2, label: '未发布'},
      {value: 3, label: '已驳回'},
      {value: 4, label: '上线审核中'},
      {value: 5, label: '下线审核中'}
    ],
    attrs: { 
      multiple: true
    }
  },
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
  angentType: { 
    type: 'el-radio-group',
    childCompName: 'el-radio-button',
    label: '智能体类型',
    options: [
      {value: 'xh', label: '星火'},
      {value: 'znt', label: '智能体'},
      {value: 'rwl', label: '任务链'}
    ]
  }
}

// 转换搜索的查询参数[如果不需要转换参数[字段名和格式与queryItems自定义的不一致]，无需传transformQuery]
const transformQuery = ({timeRange = [], dateRange =[], ...rest }) => {
  const [startDate, endDate] = dateRange
  const query = {
    ...rest,
    startDate,
    endDate
  }
  return query
}

/* 表格 */
const columns = ref([
  // 设置宽度的时候，需要至少保留一个width不是固定的，可用minWidth代替，否则可能出现大屏表格宽度未到100%的情况
  // 可点击项
  { 
    prop: "name", 
    label: $t('common.name'), 
    minWidth: 180,
    custom: 'link',
    customRender: {
      click: (record: any) => {
        events.detail(record)
      }
    }
  },
  // 文本可复制
  { prop: "appId", label: "APPID", withCopy: true, minWidth: 280, showOverflowTooltip: false},
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
      }
    },
  },
  // 开关项
  {
    prop: "enable", 
    label: $t('common.enableOrNot'),
    minWidth: 150,
    custom: 'switch',
    customRender: {
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
    blod: true,
    customRender: {
      disabled: (record: any) => record.num === 0,
      click: (row: any) => {
        console.log(row)
      }
    }
  },
  // 自定义内容（插槽）
  { prop: "desc", label: "自定义插槽11", custom: 'slot', minWidth: 280},
  { prop: "date", label: $t('common.updateTime'), minWidth: 180 },
  { prop: "operation", label: $t('common.operation'), width: 180, fixed: 'right' }
]);
const operations = [
  { type: "edit", label: $t("btn.edit") },
  { type: "delete", label: $t("btn.delete"), btnType: "danger", disabled: (record: any) => record.status === 3 },
  { type: "publish", label: $t("btn.publish"), exist: (record: any) => [2, 3].includes(record.status) },
  { type: "offline", label: $t("btn.publish"), exist: (record: any) => record.status === 1 },
];
const handleOperation = (data: any) => {
  const { type, record } = data;
  if (type === "edit") {
    console.log('编辑', record)
  } else if (type === "delete") {
    events.delete(record)
  } else if (type === "publish") {
    events.publish(record)
  }else if (type === "offline") {
    console.log('下线', record)
  } 
};
// 转换接口返回的数据
const transformListData = (data: any) => {
  return data.map((x: any) => {
    return x;
  });
};

/* events */
const events = reactive({
  detail: (record: any) => {
    $router.push({
      name: `${routeName}::detail`,
      query: {
        id: record.id
      }
    })
  },
  delete: (record: any) => {
    console.log(888888)
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