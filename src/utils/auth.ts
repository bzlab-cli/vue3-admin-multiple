/*
 * @Author: jrucker
 * @Description:
 * @Date: 2021/10/25 18:56:51
 * @LastEditors: jrucker
 * @LastEditTime: 2022/01/28 12:51:24
 */

import { Keys } from '@/config/settings'

export const getSidebarStatus = () => window.localStorage.getItem(Keys.sidebarStatusKey)
export const setSidebarStatus = (sidebarStatus: string) =>
  window.localStorage.setItem(Keys.sidebarStatusKey, sidebarStatus)

export const getToken = () => window.localStorage.getItem(Keys.tokenKey)
export const setToken = (token: string) => window.localStorage.setItem(Keys.tokenKey, token)
export const removeToken = () => window.localStorage.removeItem(Keys.tokenKey)
