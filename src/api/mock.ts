import { cloneDeep } from 'lodash-es';
import templateJSON from '@/mock/template'
import appJSON from '@/mock/app'
import cityJSON from '@/mock/city'

// 应用列表
export function getAppList (data: any) {
  // console.log('接口参数为：', data)
  const {page, size} = data
  return new Promise((resolve: any) => {
    const res = appJSON
    const result = cloneDeep(res.data.content);
    const totalElements = result.length
    const content = result.slice((page - 1)*size, page * size)
    resolve({
      content,
      totalElements
    });
  });
}

export function getCityList () {
  return new Promise((resolve: any) => {
    const res = cityJSON
    const result = cloneDeep(res.data);
    resolve(result);
  });
}

// 模版；列表
export function getTemplateList (data: any) {
  // console.log('接口参数为：', data)
  const {page, size} = data
  return new Promise((resolve: any) => {
    const res = templateJSON
    const result = cloneDeep(res.data.content);
    const totalElements = result.length
    const content = result.slice((page - 1)*size, page * size)
    resolve({
      totalElements,
      content
    });
  });
}
