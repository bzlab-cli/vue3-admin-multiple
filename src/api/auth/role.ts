/*
 * @Author: jrucker
 * @Description:
 * @Date: 2021/11/09 11:52:54
 * @LastEditors: jrucker
 * @LastEditTime: 2022/01/28 14:17:07
 */

import axios from '@/utils/axios'

interface ICreateRole {
  orgId: number | string
  remarks: string
  roleName: string
}

// 创建角色
export const addRole = (data: ICreateRole) => {
  return axios.request<IResponseModel<any>>({
    baseURL: process.env.VUE_APP_MOCK_API,
    url: 'role/createRole',
    method: 'post',
    data: data
  })
}

// 查看角色菜单授权列表
export const getMenuGrantByRoleId = (data: any) => {
  return axios.request<IResponseModel<any>>({
    baseURL: process.env.VUE_APP_MOCK_API,
    url: 'role/getMenuGrantByRoleId',
    method: 'get',
    params: data
  })
}

// 查看角色详情
export const getRoleDetail = (data: any) => {
  return axios.request<IResponseModel<any>>({
    baseURL: process.env.VUE_APP_MOCK_API,
    url: 'role/getRoleDetail',
    method: 'get',
    params: data
  })
}

// 查看角色列表-分页
export const getRoleList = (data: any) => {
  return axios.request<IResponseModel<any>>({
    baseURL: process.env.VUE_APP_MOCK_API,
    url: 'role/getRoleList',
    method: 'get',
    params: data
  })
}

// 系统角色下拉搜索
export const getRoleSelect2 = (data: any) => {
  return axios.request<IResponseModel<any>>({
    baseURL: process.env.VUE_APP_MOCK_API,
    url: 'role/getRoleSelect2',
    method: 'get',
    params: data
  })
}

// 角色-菜单授权
export const roleMenuGrant = (data: any) => {
  return axios.request<IResponseModel<any>>({
    baseURL: process.env.VUE_APP_MOCK_API,
    url: 'role/roleMenuGrant',
    method: 'put',
    data: data
  })
}

// 修改角色
export const updateRole = (data: any) => {
  return axios.request<IResponseModel<any>>({
    baseURL: process.env.VUE_APP_MOCK_API,
    url: 'role/updateRole',
    method: 'put',
    data: data
  })
}
