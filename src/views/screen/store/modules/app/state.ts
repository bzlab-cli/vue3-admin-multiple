/*
 * @Author: jrucker
 * @Description:
 * @Date: 2021/10/25 18:56:51
 * @LastEditors: jrucker
 * @LastEditTime: 2022/01/27 19:02:14
 */

export enum DeviceType {
  Mobile,
  Desktop
}

export interface AppState {
  device: DeviceType
  size: string
  isRouterAlive?: boolean
}

export const state: AppState = {
  device: DeviceType.Desktop,
  size: 'medium',
  isRouterAlive: true
}
