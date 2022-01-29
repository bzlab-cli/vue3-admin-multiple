/*
 * @Author: jrucker
 * @Description:
 * @Date: 2021/10/25 18:56:51
 * @LastEditors: jrucker
 * @LastEditTime: 2022/01/28 14:08:57
 */

import { UserInfoModel } from '@/model/user'
import axios from '@/utils/axios'
import { LoginModel } from '@/model/login'

export const login = (userInfo: any) => {
  return axios.request<IResponseModel<LoginModel>>({
    baseURL: process.env.VUE_APP_MOCK_API,
    url: 'thirdUser/loginIn',
    method: 'post',
    data: userInfo
  })
}

export const userInfo = () => {
  return axios.request<IResponseModel<UserInfoModel>>({
    baseURL: process.env.VUE_APP_MOCK_API,
    url: 'thirdUser/getUserByToken',
    method: 'get'
  })
}

// 查询用户列表
export const getUserList = (data: any) => {
  return axios.request<IResponseModel<any>>({
    baseURL: process.env.VUE_APP_MOCK_API,
    url: 'user/user',
    method: 'get',
    params: data
  })
}

// 创建用户
export const addUser = (data: any) => {
  return axios.request<IResponseModel<any>>({
    url: 'user/user',
    method: 'post',
    data: data
  })
}

// 修改用户
export const updateUser = (data: any) => {
  return axios.request<IResponseModel<any>>({
    url: 'user/updateUser',
    method: 'put',
    data: data
  })
}

// 重置密码
export const resetPassword = (data: any) => {
  return axios.request<IResponseModel<any>>({
    url: `user/user/${data.userId}`,
    method: 'put'
  })
}

// 查询权限
export const getCompetence = (data: any) => {
  return axios.request<IResponseModel<any>>({
    url: `competence`,
    method: 'get',
    params: data
  })
}

// 获取用户
export const getUser = (data: any) => {
  return axios.request<IResponseModel<any>>({
    url: `user/getUser`,
    method: 'get',
    params: data
  })
}

// 删除用户
export const deleteUser = (data: any) => {
  return axios.request<IResponseModel<any>>({
    url: `user/deleteUser?userId=${data.userId}`,
    method: 'put'
  })
}

// 用户禁用
export const updateUserForbiddenStatus = (data: any) => {
  return axios.request<IResponseModel<any>>({
    url: `user/updateUserForbiddenStatus?userId=${data.userId}&forbiddenStatus=${data.forbiddenStatus}`,
    method: 'put'
  })
}

// 用户禁用
export const getGrantProjectByToken = (data?: any) => {
  return axios.request<IResponseModel<any>>({
    url: `thirdUser/getGrantProjectByToken`,
    method: 'get',
    params: data
  })
}
