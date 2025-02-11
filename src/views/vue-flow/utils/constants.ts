
// 将数组格式数据转换成以valueKey为键的对象
const generateMap = (arr: any, valueKey: string) => {
  const _map: any = {}
  arr.forEach((item: any) => {
    _map[item[valueKey]] = item
  })
  return _map
}

/* 不同类型节点的相关信息定义 */
export const FLOW_NODE_TYPES = [
  { type: 'start', name: '开始节点', icon: 'Similar' },
  { type: 'nodeA', name: '节点A', icon: 'Ai' },
  { type: 'nodeB', name: '节点B', icon: 'Workbench' },
]
export const FLOW_NODE_MAP = generateMap(FLOW_NODE_TYPES, 'type')
