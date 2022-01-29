/*
 * @Author: jrucker
 * @Description:
 * @Date: 2021/10/28 22:49:45
 * @LastEditors: jrucker
 * @LastEditTime: 2021/11/08 14:20:35
 */

declare interface IResponseModel<T> {
  retCode: number
  retMsg: string
  data?: T
}
declare interface IObjModel {
  [propName: string]: any
}

declare type Recordable<T = any> = Record<string, T>
