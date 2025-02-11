<template>
  <div class="custom-node" :class="{active: node.data.isActive}">
    <div class="node-header">
      <div class="node-header__left">
        <tu-icon class="node-header__icon" :name="FLOW_NODE_MAP[node.type].icon" v-if="FLOW_NODE_MAP[node.type]"/>
        {{ node.data.nodeName }}
      </div>
      <div class="node-header__right">
        <el-dropdown placement="bottom">
          <span class="node-header__more">
            <tu-icon name="MoreFilled" type="el"/>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="useFlowFnIns.copyNodeFn(node)">复制节点</el-dropdown-item>
              <el-dropdown-item @click="useFlowFnIns.delNodeFn(node)">删除节点</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
    <div class="node-body">
      <slot></slot>
    </div>
    <Handle type="target" :position="Position.Top"/>
    <Handle type="source" :position="Position.Bottom"/>
  </div>
</template>
<script setup lang="ts">
import { Position, Handle } from '@vue-flow/core'
import { FLOW_NODE_MAP } from '@/views/vue-flow/utils/constants'
import { computed } from 'vue';

const props = defineProps({
  node: { type: Object, default () { return {} } },
  useFlowFnIns: { type: Object }
})



</script>

<style lang="scss" scoped>
.custom-node {
  width: 220px;
  border-radius: 12px;
  box-shadow: 0 0 28px 6px #00000008, 0 0 32px #00000003, 0 0 6px -6px #0000000f;
  border:1px solid $border-color;
  overflow: hidden;
  color: $text-color-secondary;
  &.active {
    border-color: $primary-color;
  }
  .node-header {
    padding: 8px 16px;
    background: linear-gradient(#f2f2ff 0%, #fcfcff 100%);
    @include flexBetween();
    .node-header__left {
      @include flex();
      .node-header__icon {
        margin-right: 8px;
        font-size: 20px;
        color: $primary-color;
      }
    }
    .node-header__right {
      @include flex();
      .node-header__more {
        cursor: pointer;
        padding-left: 10px;
        &:hover {
          color: $primary-color;
        }
      }
    }
  }
  .node-body {
    padding: 10px 16px;
    background-color: #fff;
  }
}
</style>   