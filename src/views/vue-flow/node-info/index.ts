import { assign, cloneDeep } from 'lodash-es'
import nodeA from './nodeA'
import nodeB from './nodeB'

const raw: any = {
  nodeA,
  nodeB
}

export const generateNodeInfo = (type: string, defaults = {}) => {
  const info = raw[type]
  if (!info) {
    throw new Error(`No ${type} type node.`)
  }
  return assign(cloneDeep(info), defaults)
}