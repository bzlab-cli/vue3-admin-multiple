/*
 * @Author: jrucker
 * @Description:
 * @Date: 2021/11/12 10:46:28
 * @LastEditors: jrucker
 * @LastEditTime: 2021/11/12 11:18:32
 */

export interface FormActionType {
  submit: () => Promise<void>
  setFieldsValue: <T>(values: T) => Promise<void>
  resetFields: () => Promise<void>
  getFieldsValue: () => Recordable
  clearValidate: (name?: string | string[]) => Promise<void>
  validateFields: (nameList?: NamePath[]) => Promise<any>
  validate: (nameList?: NamePath[]) => Promise<any>
}
