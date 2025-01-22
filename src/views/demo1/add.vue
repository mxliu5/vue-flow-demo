<template>
    <my-drawer
      class="mock-add"
      v-model="dialogVisible"
      :title="dialogTitle"
      @confirm="handleConfirm"
      @close="handleClose"
    >
      <tu-form
        ref="formRef"
        labelWidth="128px"
        labelPosition="right"
        :rules="rules"
        :ruleForm="ruleForm"
        :formItems="formItems">
        <template #file>
          <tu-upload
            customRequest
            ref="uploadRef"
            maxSize="10M"
            accept=".xls,.xlsx"
            v-model="ruleForm.file2"
            drag
            drag-style
            :downloadTemplate="downloadTemp">
            <div class="drag-wrapper">
              <tu-svg-icon name="upload" width="60px"/>
              <div class="drag-tip">点击或者将文件拖拽到这里进行上传</div>
            </div>
          </tu-upload>
        </template>
      </tu-form>
    </my-drawer>
  </template>
  
  <script setup lang="ts">
  import { ref, reactive, computed, nextTick } from "vue";
  import { assign, pick, keys } from "lodash-es";
  import type { FormRules } from "element-plus";
  import { NAME_RULE } from '@/utils/validate';
  import useValidate from '@/hooks/validate'
  import useStore from "@/store";
  import { useI18n } from "vue-i18n";
  import useCtx from "@/hooks/useCtx";
  const { proxy } = useCtx()
  const { t } = useI18n();
  const { api } = useStore();

  const dateFormat = ref<string>('YYYY-MM-DD')

  const dialogTitle = computed(() => {
    return (formType.value === 'add' ? t('btn.new') : t('btn.edit'))
  })
  const isUpdate = computed(() => {
    return formType.value === 'edit'
  })

  // 弹窗相关
  const dialogVisible = ref<boolean>(false)
  const handleClose = () => {
    formRef.value.resetForm();
    dialogVisible.value = false;
  };
  const handleConfirm = () => {
    formRef.value.submitForm((valid: any) => {
      if (valid) {
        if (isUpdate.value) { // 如果是编辑页面执行
          console.log('params', ruleForm.value)
        } else { // 如果是新增页面执行
          console.log('params', ruleForm.value)
        }
        // dialogVisible.value = false;
      }
    })
  };
  
  /* 校验 */
  const { validateNameRule } = useValidate()
  // 表单相关
  const formType = ref<string>('add')
  const formRef = ref<any>(null)
  const defaultForm = {
    id: undefined,
    name: "",
    appId: "",
    city: [],
    date: "",
    age: "",
    enable: false,
    school: "北京大学",
    hobby: [],
    desc: "",
    file1: null,
    file2: null
  };
  let ruleForm = ref<any>(assign({}, defaultForm));
  const rules = reactive<FormRules>({
    name: [{ required: true, trigger: "blur", validator: (rule: any, value: any, callback: any) => validateNameRule(rule, value, callback, '请输入模版名称') }],
    appId: [{ required: true, message: "请选择类型", trigger: "change" }],
    file1: [{ required: true, message: "请上传文件", trigger: "change" }],
    file2: [{ required: true, message: "请上传文件", trigger: "change" }]
  });

  const formItems = ref<any>({
    name: { 
      label: "名称", 
      labelTooltip: {
        content: '这是一段关于名称的提示信息'
      },
      type: "el-input",
      attrs: { 
        maxlength: 30,
        placeholder: NAME_RULE
      }
    },
    appId: {
      label: "应用",
      type: "el-select",
      options: [],
      attrs: { clearable: false },
      events: { 
        change: (val: any) => {
          console.log(val)
        }
      }
    },
    city: { 
      label: "城市", 
      type: "el-cascader", 
      options: [], 
      attrs: {
        props: {
          checkStrictly: true,
          value: "code",
          label: "name",
          children: "children"
        }
      }
    },
    date: { 
      label: "日期", 
      type: "el-date-picker",
      attrs: {
        type: 'date',
        placeholder: '请选择日期',
        'format': dateFormat,
        'value-format': dateFormat,
      }
    },
    age: { 
      label: "年龄", 
      type: "el-input-number", 
      width: '200px',
      attrs: {min: 1, max: 100, step: 1} 
    },
    enable: { 
      label: "是否启用", 
      type: "el-switch" 
    },
    school: { 
      label: "学校", 
      type: "el-radio-group",
      childCompName: 'el-radio',
      options: [
        { value: "北京大学", label: "北京大学" },
        { value: "清华大学", label: "清华大学" },
        { value: "复旦大学", label: "复旦大学" },
      ]
    },
    hobby: { 
      label: "爱好", 
      type: "el-checkbox-group",
      childCompName: "el-checkbox",
      options: [
        { value: "唱歌", label: "唱歌" },
        { value: "跳舞", label: "跳舞" },
        { value: "羽毛球", label: "羽毛球" },
        { value: "游泳", label: "游泳" },
        { value: "跑步", label: "跑步" },
      ]
    },
    desc: { 
      label: "描述", 
      type: 'el-input',
      attrs: {
        type: 'textarea',
        maxlength: 50,
        showWordLimit: true,
        autosize: { minRows: 2, maxRows: 3 }
      },
    },
    file1: { 
      label: '内置文件上传', 
      type: 'upload',
      attrs: {
        accept: '.zip',
        maxSize: '50M'
      },
      hidden: () => isUpdate.value
    },
    file2: { label: '自定义上传', type: 'slot', slotName: 'file', hidden: () => isUpdate.value}
  });
  
  /* 获取下拉列表数据 */
  const getAppOptions = async (search ? : string) => {
    const result: any = await api.getAppOptions(search)
    formItems.value.appId.options = result.list
    formItems.value.appId.attrs.remote = result.total > api.MAX_TOTAL  // 如果数据总数量大于1000条，则下拉框支持远程搜索，否则只在前端做筛选
  }
  const getCityOptions = async () => {
    const result: any = await api.getCityOptions()
    formItems.value.city.options = result
  }

  const getOptions = () => {
    getAppOptions()
    getCityOptions()
  }

  const openDialog = async (type: string, row: any) => {
    // 1.打开弹窗
    formType.value = type;
    dialogVisible.value = true;
    /* 业务代码 */
    // 2. 加载相关的下拉列表数据
    getOptions()
    // 3. 回显相关的操作
    nextTick(() => {
      if (type === "edit") {
        ruleForm.value = pick(row, keys(defaultForm)); // 这个写法是将row中 在defaultForm存在的字段值进行返回，多余的不需要
      } else {
        ruleForm.value = assign({}, defaultForm);
        proxy.$refs.uploadRef.clearFiles()
      }
    })
  };
  const emits = defineEmits(["reload"]);

  const downloadTemp = () => {
    console.log('下载模版')
  }
  
  defineExpose({ openDialog });
  </script>
  
  <style lang="scss">
  </style>
  