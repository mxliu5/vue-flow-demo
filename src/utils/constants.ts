/*
* @Description: 一些公用的常量
* @Author: mxliu5
* @Date: 2023-08-11
*/
import i18n from '@/utils/i18n'
import { qiankunWindow } from 'vite-plugin-qiankun/dist/helper'
export const isQiankun =  qiankunWindow.__POWERED_BY_QIANKUN__
export const assetsPublicPath = '/'
export const CONTEXT_PATH = '/audit'

export const NAME_MAX_LENGTH = 20
export const DESC_MAX_LENGTH = 50
export const REMARK_MAX_LENGTH = 200

export const NO_TEXT = '-'

export const THROTTLE_TIME = 500  // 节流时间 500ms内只能触发一个请求

// 当前启动的项目名称
export const SYSTEM_NAME = import.meta.env.VITE_SYSTEM_NAME

// 国际化
export const $t: any = i18n.global.t

