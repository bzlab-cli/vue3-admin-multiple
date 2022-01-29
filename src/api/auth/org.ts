/*
 * @Author: jrucker
 * @Description:
 * @Date: 2021/11/09 12:01:44
 * @LastEditors: jrucker
 * @LastEditTime: 2022/01/29 16:06:20
 */

import axios from '@/utils/axios'

// 创建组织
export const addOrg = (data: any) => {
  return axios.request<IResponseModel<any>>({
    url: 'org/createOrg',
    method: 'post',
    data: data
  })
}

// 查看组织详情
export const getOrgDetail = (data: any) => {
  return axios.request<IResponseModel<any>>({
    // baseURL: process.env.VUE_APP_MOCK_API,
    url: 'org/getOrgDetail',
    method: 'get',
    params: data
  })
}

// 查询组织列表
export const getOrgList = (data: any) => {
  return axios.request<IResponseModel<any>>({
    baseURL: process.env.VUE_APP_MOCK_API,
    url: 'org/getOrgList',
    method: 'get',
    params: data
  })
}

// 系统组织下拉搜索
export const getOrgSelect2 = (data: any) => {
  return axios.request<IResponseModel<any>>({
    url: 'org/getOrgSelect2',
    method: 'get',
    params: data
  })
}

// 修改组织
export const updateOrg = (data: any) => {
  return axios.request<IResponseModel<any>>({
    url: 'org/updateOrg',
    method: 'put',
    data: data
  })
}
