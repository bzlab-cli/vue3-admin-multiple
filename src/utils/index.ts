/*
 * @Author: jrucker
 * @Description:
 * @Date: 2021/10/25 18:56:51
 * @LastEditors: jrucker
 * @LastEditTime: 2021/11/22 11:21:06
 */
import type { App, Plugin } from 'vue'
interface TreeHelperConfig {
  id: string
  children: string
  pid: string
}

const DEFAULT_CONFIG: TreeHelperConfig = {
  id: 'id',
  children: 'childTreeList',
  pid: 'pid'
}

const getConfig = (config: Partial<TreeHelperConfig>) => Object.assign({}, DEFAULT_CONFIG, config)

export function deepClone(source: IObjModel) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments')
  }
  const targetObj: any = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

export const isValidUsername = (str: string) => ['admin', 'editor'].indexOf(str.trim()) >= 0
export const isExternal = (path: string) => /^(https?:|mailto:|tel:)/.test(path)

/**
 * 是否数组
 * @param o
 * @returns
 */
export const isArray = o => {
  return Object.prototype.toString.call(o) === '[object Array]'
}

/**
 * 是否布尔
 * @param o
 * @returns
 */
export const isBoolean = o => {
  return Object.prototype.toString.call(o) === '[object Boolean]'
}

/**
 * 是否对象
 * @param o
 * @returns
 */
export const isObject = o => {
  return Object.prototype.toString.call(o) === '[object Object]'
}

/**
 * 是否字符串
 * @param o
 * @returns
 */
export const isString = o => {
  return Object.prototype.toString.call(o) === '[object String]'
}

/**
 * 是否空值
 * @param o
 * @returns
 */
export const isBlank = varValue => {
  if (varValue !== null && varValue !== undefined && varValue !== '' && varValue !== 'null') {
    return false
  }
  return true
}

export const withInstall = <T>(component: T, alias?: string) => {
  const comp = component as any
  comp.install = (app: App) => {
    app.component(comp.name || comp.displayName, component)
    if (alias) {
      app.config.globalProperties[alias] = component
    }
  }
  return component as T & Plugin
}

/**
 * 递归过滤指定属性
 * @param tree
 * @param func
 * @param config
 * @returns
 */
export function filter<T = any>(tree: T[], func: (n: T) => boolean, config: Partial<TreeHelperConfig> = {}): T[] {
  config = getConfig(config)
  const children = config.children as string
  function listFilter(list: T[]) {
    return list
      .map((node: any) => ({ ...node }))
      .filter(node => {
        node[children] = node[children] && listFilter(node[children])
        return func(node) || (node[children] && node[children].length)
      })
  }
  return listFilter(tree)
}

/**
 * 递归树结构
 * @param tree
 * @param func
 * @param config
 * @returns
 */
export function forEachTree<T = any>(tree: T[], func: (n: T) => any, config: Partial<TreeHelperConfig> = {}): void {
  config = getConfig(config)
  const list: any[] = [...tree]
  const { children } = config
  for (let i = 0; i < list.length; i++) {
    if (func(list[i])) {
      return
    }
    children && list[i][children] && list.splice(i + 1, 0, ...list[i][children])
  }
}

// 四则运算 js精度丢失
// 解决两个数相加精度丢失问题
export function floatAdd(a: number, b: number) {
  let c = 0
  let d = 0
  let e = 0
  if (undefined === a || a == null || isNaN(a)) {
    a = 0
  }
  if (undefined === b || b == null || isNaN(b)) {
    b = 0
  }
  try {
    c = a.toString().split('.')[1].length
  } catch (f) {
    c = 0
  }
  try {
    d = b.toString().split('.')[1].length
  } catch (f) {
    d = 0
  }
  e = Math.pow(10, Math.max(c, d))
  return (floatMul(a, e) + floatMul(b, e)) / e
}

// 解决两个数相乘精度丢失问题
export function floatMul(a: number, b: number) {
  let c = 0
  const d: string = a.toString()
  const e: string = b.toString()
  try {
    c += d.split('.')[1].length
  } catch (f) {
    console.log()
  }
  try {
    c += e.split('.')[1].length
  } catch (f) {
    console.log()
  }
  return (Number(d.replace('.', '')) * Number(e.replace('.', ''))) / Math.pow(10, c)
}

//遍历删除对象中的空值属性
export function delNullProperty(obj: any) {
  for (const i in obj) {
    //遍历对象中的属性
    if (obj[i] === undefined || obj[i] === null || obj[i] === '') {
      //首先除去常规空数据，用delete关键字
      delete obj[i]
    } else if (obj[i].constructor === Object) {
      //如果发现该属性的值还是一个对象，再判空后进行迭代调用
      if (Object.keys(obj[i]).length === 0) delete obj[i] //判断对象上是否存在属性，如果为空对象则删除
      delNullProperty(obj[i])
    } else if (obj[i].constructor === Array) {
      //对象值如果是数组，判断是否为空数组后进入数据遍历判空逻辑
      if (obj[i].length === 0) {
        //如果数组为空则删除
        delete obj[i]
      } else {
        for (let index = 0; index < obj[i].length; index++) {
          //遍历数组
          if (
            obj[i][index] === undefined ||
            obj[i][index] === null ||
            obj[i][index] === '' ||
            JSON.stringify(obj[i][index]) === '{}'
          ) {
            obj[i].splice(index, 1) //如果数组值为以上空值则修改数组长度，移除空值下标后续值依次提前
            index-- //由于数组当前下标内容已经被替换成下一个值，所以计数器需要自减以抵消之后的自增
          }
          if (obj[i].constructor === Object) {
            //如果发现数组值中有对象，则再次进入迭代
            delNullProperty(obj[i])
          }
        }
      }
    }
  }
}

/**
 * 检测图片是否失效
 * @param url
 * @returns
 */
export function checkImgExists(url) {
  return new Promise(function (resolve) {
    const imgObj = new Image()
    imgObj.src = url
    imgObj.onload = function () {
      if (imgObj.width > 0 && imgObj.height > 0) {
        resolve(true)
      } else {
        resolve(false)
      }
    }
    imgObj.onerror = function () {
      resolve(false)
    }
  })
}

// 解决两个数相除精度丢失问题
export function floatDiv(a: number, b: number) {
  let c = 0
  let d = 0
  let e = 0
  let f = 0
  try {
    e = a.toString().split('.')[1].length
  } catch (g) {
    console.log()
  }
  try {
    f = b.toString().split('.')[1].length
  } catch (g) {
    console.log()
  }
  c = Number(a.toString().replace('.', ''))
  d = Number(b.toString().replace('.', ''))
  return floatMul(c / d, Math.pow(10, f - e))
}
