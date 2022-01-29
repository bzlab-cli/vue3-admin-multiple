/*
 * @Author: jrucker
 * @Description: 专业数据
 * @Date: 2021/11/11 10:04:13
 * @LastEditors: jrucker
 * @LastEditTime: 2022/01/27 18:35:13
 */

export interface IMajorSchema {
  name: string
  value: number | null
}

const DEFAULT_CONFIG: IMajorSchema = {
  name: '全部专业',
  value: 0
}

const major: IMajorSchema[] = [
  {
    name: '地库',
    value: 1
  },
  {
    name: '结构',
    value: 2
  },
  {
    name: '综管',
    value: 3
  }
]
const majorLack: IMajorSchema[] = [
  {
    name: '全部',
    value: null
  },
  {
    name: '地库',
    value: 1
  },
  {
    name: '结构',
    value: 2
  }
]
export const majorAllList: IMajorSchema[] = [DEFAULT_CONFIG, ...major]
export const majorList: IMajorSchema[] = major
export const majorLackAllList: IMajorSchema[] = [...majorLack]
