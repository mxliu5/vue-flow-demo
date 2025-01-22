import axios from './axios'
// import { cloneDeep } from 'lodash-es';
// import { CONTEXT_PATH } from '@/utils/constants'
import { warningMessage } from '@/utils/app-tip'
// const BASE_URL = CONTEXT_PATH

// 获取用户信息
export function getUserInfo () {
  // return axios.get(BASE_URL + '/user/getUserInfo')
  return new Promise((resolve: any) => {
    axios
      .get("mock/userInfo.json")
      .then((res) => {
        resolve(res);
      });
  });
}

// 获取菜单信息
export function getAuthorityList () {
  // return axios.get(BASE_URL + '/uap/authorityList')
  return new Promise((resolve: any) => {
    axios
      .get("mock/menu.json")
      .then((res) => {
        resolve(res);
      });
  });
}

// 退出登录
export function logout () {
  // return axios.get(BASE_URL + '/uap/logout.do')
  warningMessage('功能待实现')
}