<template>
  <FullscreenPage title="流程画布编辑" @close="close">
    <template #header>
      <div class="fullscreenPage-right">
        <el-popover width="260px" placement="bottom" title="快捷键说明">
          <template #reference>
            <span class="tip-btn">快捷键说明</span>
          </template>
          <template #default>
            <div class="tip-box">
              <p>复制 【Ctrl】 + 【C】</p>
              <p>粘贴 【Ctrl】 + 【V】</p>
              <p>删除 【Delete 或 Backspace】</p>
              <p>框选 【Shift】 + 【鼠标拖动】</p>
            </div> 
          </template>
        </el-popover>

        <tu-button type="primary" @click="saveFlowInfo">保存</tu-button>
      </div>
    </template>
    <div class="flow-detail">
      <div class="left-wrapper">
        <ul class="menu-list">
          <li class="menu-item" v-for="item of menus" :draggable="true"  @dragend="dragNodeFn($event, item)">
            <tu-icon :name="item.icon" style="font-size: 36px;"/>
            <div class="menu-item-name">{{ item.name }}</div>
          </li>
        </ul>
      </div>
      <div class="right-wrapper">
        <VueFlow 
            class="my-vue-flow"
            ref="vueFlowRef"
            v-model="elements"
            :style="{ background: '#f5f5f5' }" 
            :default-viewport="{ zoom: 1.2 }" 
            :max-zoom="4" 
            :min-zoom="0.1"
            @dragover="($event: any) => $event.preventDefault()">
            <template #node-nodeA="nodeProps">
              <nodeA :node="nodeProps" :useFlowFnIns="useFlowFnIns"/>
            </template>
            <template #node-nodeB="nodeProps">
              <nodeB :node="nodeProps" :useFlowFnIns="useFlowFnIns"/>
            </template>
            <template #node-start="nodeProps">
              <start-node :node="nodeProps" :useFlowFnIns="useFlowFnIns"/>
            </template>
            <template #edge-special="edgeProps">
            <SpecialEdge v-bind="edgeProps" />
            </template>
            <Background pattern-color="#aaa" :gap="16" />
            <MiniMap pannable zoomable :nodeStrokeWidth="5"/>
            <Controls>
            <ControlButton>
              <tu-icon name="Category" />
            </ControlButton>
            </Controls>
        </VueFlow>
      </div>
      <!-- 节点配置 -->
      <nodeConfig 
        :currentNode="currentNode"
        @close="() => currentNode = null"/>
    </div>
  </FullscreenPage>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeMount } from 'vue'
import { copyText, pasteText } from '@/utils/helpers'
import { VueFlow, GraphNode } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import { MiniMap } from '@vue-flow/minimap'
import { Controls, ControlButton } from '@vue-flow/controls'
import FullscreenPage from '@/components/layout/FullscreenPage.vue'
import nodeA from './node/nodeA.vue'
import nodeB from './node/nodeB.vue'
import startNode from './node/start-node.vue'
import SpecialEdge from './SpecialEdge.vue'
import nodeConfig from './node-config/index.vue'
import useFlow from './hooks/useFlow'
import useCtx from '@/hooks/useCtx'
const { $router } = useCtx()

/* vue-flow样式 */
import '@vue-flow/core/dist/style.css';
import '@vue-flow/core/dist/theme-default.css';
import '@vue-flow/controls/dist/style.css';
import '@vue-flow/minimap/dist/style.css';
import "@/views/vue-flow/styles/vue-flow.scss"

const emits = defineEmits(['close'])
const close = () => {
  $router.back()
}

const elements = ref<any>([
  {
    id: '0',
    type: 'start',
    position: { x: 300, y: 30 },
    data: { nodeName: '开始节点', nodeInfo: {} },
  },
  {
    id: '1',
    type: 'nodeA',
    position: { x: 250, y: 100 },
    data: { nodeName: 'nodeA', nodeInfo: {} },
  },
  {
    id: '2',
    type: 'nodeB',
    position: { x: 300, y: 300 },
    data: { nodeName: 'nodeB', nodeInfo: {} },
  },
  {
    id: 'e1->2',
    source: '1',
    target: '2',
    type: "special",
    class: 'custom-edge'
  },
])

// 组件左侧菜单
const menus = ref<any>([
  { type: 'nodeA',  name: '节点A', icon: 'Ai' },
  { type: 'nodeB',  name: '节点B', icon: 'Workbench' }
])


const useFlowFnIns = useFlow(elements)
const { 
  vueFlowRef, 
  paneClickPosition,
  currentNode,
  getSelectedNodes,
  getSelectedEdges,
  removeNodes,
  removeEdges,
  createNode,
  dragNodeFn,
  project,
  toObject
} = useFlowFnIns


// 自定义delete按键删除操作
const customDeleteKeyCode = (e: any) => {
  const key = window.event ? e?.keyCode : e?.which;
  // mac电脑的删除键对应的keyCode是8
  if (key === 46 || key === 8) {
    // 删除连线
    if (getSelectedEdges.value.length) {
      removeEdges(getSelectedEdges.value)
    }
    // 删除节点
    const forbiddenDeleteNode = ['start']
    if (getSelectedNodes.value.length) {
      if (getSelectedNodes.value.find((v) => v.id === currentNode.value?.id)) currentNode.value = null; // 将当前展开的节点内容置为null
      removeNodes(getSelectedNodes.value.filter(v => !forbiddenDeleteNode.includes(v.type))) 
    }
  }
}

/* 自定义复制粘贴 [仅复制节点，不复制连线] */
const keyText = 'vue-flow-copy：'
// 自定义复制行为
const customCopyEvent = (event: any) => {
  const isFirefox = navigator.userAgent.includes("Firefox");
  // 复制节点以及连线内数据，将数据放置于粘贴板中
  if ((getSelectedNodes.value.length && (event.target.nodeName === "BODY" || event.target.className === "vue-flow__nodesselection-rect")) || (isFirefox && getSelectedNodes.value.length === 1)) {
    // 已选节点数据处理
    const copyNodeData: any[] = []
    getSelectedNodes.value.forEach((item: GraphNode<any, any, string>) => {
      copyNodeData.push({position: item.position, type: item.type, data: item.data});
    })
    copyText(`${keyText}${JSON.stringify({ nodes: copyNodeData})}`, '节点已复制到剪贴板')
  }
}

// 自定义粘贴行为
const customPasteEvent = (event: any) => {
  const flowBounds = vueFlowRef.value.$el.getBoundingClientRect(); // 获取可视区域
  pasteText().then((text) => {
    if (text.startsWith(keyText)) {
      const pasteData = JSON.parse(text.replace(keyText, ''))
      // 鼠标点击后在画布中的坐标位置
      const mousePos = project({x: paneClickPosition.value.clientX - flowBounds.left, y: paneClickPosition.value.clientY - flowBounds.top})
      // 最左边的第一个节点，将此节点作为参照物 
      const objectTemp = pasteData.nodes.sort((a: any, b: any) => a.position.x - b.position.x)
      // 生成新的nodeId
      objectTemp.forEach((item: any) => {
        const position = { x: mousePos.x + (item.position.x - objectTemp[0].position.x), y: mousePos.y + (item.position.y - objectTemp[0].position.y) };
        createNode(position, item)
      })
    }
  })
}


/* 画布回显/保存 */
// 回显
const initFlowInfo = () => {
  // 将后端返回的数据处理成画布所需要的格式进行回显
}
// 保存
const saveFlowInfo = () => {
  const elements = toObject()
  console.log('elements', elements)
}


onMounted(() => {
  initFlowInfo()
  document.addEventListener("keydown", customDeleteKeyCode)
  document.addEventListener("copy", customCopyEvent);
  document.addEventListener("paste", customPasteEvent);
})

onBeforeMount(() => {
  document.addEventListener("keyup", customDeleteKeyCode);
  document.addEventListener("copy", customCopyEvent);
  document.addEventListener("paste", customPasteEvent);
  currentNode.value = null;
});

</script>

<style lang="scss" scoped>
.fullscreenPage-right {
  @include flex();
  .tip-btn {
    background-image: url('@/assets/images/tip_bg.png');
    width: 102px;
    height: 32px;
    text-align: center;
    line-height: 32px;
    margin-right: 12px;
    color: #b4640f;
  }
}
.tip-box {
  >p {
    margin-top: 10px;
  }
}
.flow-detail {
  @include flex();
  height: 100%;
  background-color: #fff;
  border-radius: 8px;
  position: relative;
  .left-wrapper {
    width: 180px;
    height: 100%;
    flex-shrink: 0;
    .menu-list {
      padding: 20px 0;
      list-style: none;
      .menu-item {
        padding: 24px 16px;
        text-align: center;
        cursor: pointer;
        .menu-item-name {
          margin-top: 16px;
        }
      }
    }
  }
  .right-wrapper {
    width: 100%;
    padding: 5px;
    height: 100%;
    .my-vue-flow{
        border-radius: 4px;
    }
  }
}
</style>