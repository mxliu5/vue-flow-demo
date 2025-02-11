import { ref } from 'vue'
import { dataC } from 'turing-plugin' 
import { useVueFlow } from '@vue-flow/core'
import type {FlowEvents } from "@vue-flow/core";
import { generateNodeInfo } from '../node-info'

const useFlow = (elements ? : any) => {
  const vueFlowRef = ref<any>(null)
  const currentNode = ref<any>(null)
  const paneClickPosition = ref<any>(null)  // 画布中点击的位置，记录下来，给自定义粘贴节点的时候用的 
 
  const { 
    addEdges,            // 添加连线
    addNodes,            // 添加节点
    removeEdges,         // 删除连线
    removeNodes,         // 删除节点
    removeSelectedNodes ,// 删除已选的节点
    onConnect,           // 连线连接完成事件
    onNodeClick,         // 单击节点事件
    onNodeMouseEnter,    // 鼠标移入节点
    onNodeMouseLeave,    // 鼠标移出节点
    project,             // 将坐标转换为VueFlow内部坐标系
    toObject,            // 返回当前画布的节点/连线等信息
    onPaneMouseMove,     // 鼠标在画布内移动事件
    onPaneMouseLeave,    // 鼠标离开画布事件
    zoomOnScroll,        // 是否通过滚轮来控制画布缩放
    getSelectedEdges,    // 获取已选中的连线
    getSelectedNodes,    // 获取已选中的节点
   } = useVueFlow()
  
  /* 节点相关操作 */
  // 创建节点
  const createNode = (position: any, obj: any) => {
    addNodes({
      id: dataC.generateUUID(),
      type: obj.type,
      data: obj.data,
      position
    })
  } 
  // 复制节点
  const copyNodeFn = (node: any) => {
    const _node: any = dataC.cloneDeep(node)
    const position = { x: _node.position.x + 50, y: _node.position.y + 50 }
    createNode(position, _node)
    setTimeout(() => {
      // 删除已选的节点，以达到重置node的z-index属性的目的
      removeSelectedNodes(getSelectedNodes.value);
    }, 200);
  }
  // 删除节点
  const delNodeFn = (node: any) => {
    // 如果当前节点正在打开，则需要关闭
    if (currentNode.value?.id === node.id) {
      currentNode.value = null
    }
    removeNodes(node.id)
  }
  // 拖拽添加节点
  const dragNodeFn = ($event: any, item: any) => {
    const flowbounds = vueFlowRef.value?.$el.getBoundingClientRect();
    const getPosition = () => {
      return project({
        x: $event.clientX - flowbounds.left,
        y: $event.clientY - flowbounds.top,
      })
    }
    createNode(getPosition(), {
      type: item.type,
      data: { 
        nodeName: item.name,
        nodeInfo: generateNodeInfo(item.type)
      }
    })
  }
  // 节点active时逻辑处理
  const handleNodeActive = (node: any) => {
    elements.value.forEach((el: any) => {
      // 将鼠标hover节点关联的线的animated设为true
      if (el["class"] && (el["class"] as string).startsWith("custom-edge")) {
        el["animated"] = el["sourceNode"].id === node.id || el["targetNode"].id === node.id;
      } else {
        // 设置当前节点为active状态
        el.data.isActive = el?.selected || el?.id === node.id
      }
    })
  }
  // 鼠标hover节点时触发
  onNodeMouseEnter((e: FlowEvents["nodeMouseEnter"]) => {
    zoomOnScroll.value = false
    handleNodeActive(e.node)
  });
  // 鼠标离开时触发
  onNodeMouseLeave((e: FlowEvents["nodeMouseLeave"]) => {
    zoomOnScroll.value = true
    handleNodeActive({})
  });
  // 单击节点时触发
  onNodeClick ((e) => {
    // 1. 开始节点和结束节点不支持点击
    if (e.node.type === 'start') return 
    // 2. 点击自己也需要return，弹窗不进行切换
    if (currentNode.value?.id === e.node.id) return
    // 3.将当前节点进行赋值
    currentNode.value = e.node
    // console.log(111, currentNode.value)
  })

  /* 连线相关操作 */
  // 创建连线
  const createEdge = (edgesParams: any) => {
    addEdges({
      type: "special",
      class: "custom-edge",
      id: dataC.generateUUID(),
      animated: false,
      ...edgesParams
    });
  }
  // 连线完成时触发
  onConnect((edgesParams) => {
    createEdge(edgesParams)
  })

  /**
   * 画布点击事件
  */
  onPaneMouseMove((e: FlowEvents["paneClick"]) => {
    paneClickPosition.value = { clientX: e.clientX, clientY: e.clientY };
  });
  onPaneMouseLeave(() => {
    paneClickPosition.value = null;
  });
  return {
    vueFlowRef,
    currentNode,
    paneClickPosition,
    getSelectedNodes,
    getSelectedEdges,
    createNode,
    copyNodeFn,
    delNodeFn,
    dragNodeFn,
    onNodeMouseEnter,
    onNodeMouseLeave,
    createEdge,
    onConnect,
    removeNodes,
    removeEdges,
    project,
    toObject
  }
}

export default useFlow