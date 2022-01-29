/*
 * @Author: jrucker
 * @Description:
 * @Date: 2021/11/09 12:01:50
 * @LastEditors: jrucker
 * @LastEditTime: 2022/01/29 16:05:41
 */

import axios from '@/utils/axios'

// 创建菜单
export const addMenu = (data: any) => {
  return axios.request<IResponseModel<any>>({
    url: 'menu/createMenu',
    method: 'post',
    data: data
  })
}

// 查看菜单详情
export const getMenuDetail = (data: any) => {
  return axios.request<IResponseModel<any>>({
    url: 'menu/getMenuDetail',
    method: 'get',
    params: data
  })
}

// 管理后台菜单列表
export const getMenuList = (data: any) => {
  return axios.request<IResponseModel<any>>({
    baseURL: process.env.VUE_APP_MOCK_API,
    url: 'menu/getMenuList',
    method: 'get',
    params: data
  })
}

// 修改菜单
export const updateMenu = (data: any) => {
  return axios.request<IResponseModel<any>>({
    url: 'menu/updateMenu',
    method: 'put',
    data: data
  })
}
