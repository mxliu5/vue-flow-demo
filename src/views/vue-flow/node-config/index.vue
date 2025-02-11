<template>
  <div class="node-config-drawer" :class="{'node-config-drawer__open': Boolean(currentNode)}">
    <div class="node-config__header" v-if="currentNode">
      <div class="node-config__header__top">
        <div 
          class="node-config__title">
          <tu-icon class="node-config__icon" :name="FLOW_NODE_MAP[currentNode.type].icon" v-if="FLOW_NODE_MAP[currentNode.type]"/>
          {{ currentNode.data.nodeName }}
        </div>
        <el-icon 
          class="node-config__close"
          @click="handleClose">
          <Close />
        </el-icon>
      </div>
      <p class="node-config__header__desc">工作流节点的描述信息</p>
    </div>
    <div class="node-config__body" v-if="currentNode">
      <component
        :is="componentObj[currentNode.type]"
        :nodeInfo="currentNode.data.nodeInfo">
      </component>
    </div>
    <div class="node-config__footer">
      <el-button type="primary" @click="handleClose">保存</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import nodeA from './nodeA.vue'
import nodeB from './nodeB.vue'
import { FLOW_NODE_MAP } from '@/views/vue-flow/utils/constants'

defineProps({
  currentNode: { type: Object, required: true }
})
const emits = defineEmits(['close'])
const dialogVisible = ref<boolean>(true)
const handleClose = () => {
  dialogVisible.value = true
  emits('close')
}

/* 根据节点类型来匹配要展示哪个节点信息 */
const componentObj: any = {
  'nodeA': nodeA,
  'nodeB': nodeB
}
</script>

<style lang="scss" scoped>
.node-config-drawer {
  position: absolute;
  width: 520px;
  height: calc(100% - 20px) !important;
  right: -525px;
  top: 10px;
  bottom: 10px;
  background-color: #fff;
  transition: all 0.3s;
  box-shadow:  10px 12px 16px 10px rgba(16, 24, 40, 0.08), 0px 4px 6px -2px rgba(16, 24, 40, 0.03), 0 0 rgba(0, 0, 0, 0), 0 0 rgba(0, 0, 0, 0), 0px 4px 6px -2px rgba(16, 24, 40, 0.03), 0px 12px 16px -4px rgba(16, 24, 40, 0.08);
  border-radius: 12px;
  &.node-config-drawer__open {
    right: 10px;
  }
  .node-config__header {
    position: relative;
    border-bottom: 1px solid var(--el-border-color-light);
    .node-config__header__top {
      @include flex();
      background: linear-gradient(#f2f2ff 0%, #fcfcff 100%);
      padding: 16px;
      .node-config__title {
        font-size: 18px;
      }
      .node-config__icon {
        color: var(--el-color-primary);
        margin-right: 5px;
      }
      .node-config__close {
        position: absolute;
        top: 16px;
        right: 16px;
        font-size: 20px;
        cursor: pointer;
      }
    }
    .node-config__header__desc {
      padding: 0px 16px;
      padding-bottom: 10px;
      color: #81878C;
    }
  }
  .node-config__body {
    height: calc(100% - 102px);
    overflow-y: auto;
    padding: 16px;
  }
  .node-config__footer {
    height: 50px;
    line-height: 50px;
    text-align: right;
    padding: 0 16px;
    border-top: 1px solid var(--el-border-color-light);
  }
}
</style>