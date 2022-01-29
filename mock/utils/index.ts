/*
 * @Author: jrucker
 * @Description:
 * @Date: 2021/10/25 18:56:51
 * @LastEditors: jrucker
 * @LastEditTime: 2021/11/02 15:19:31
 */

const { Random } = require('mockjs')

/**
 * 随机生成图片
 * @param width
 * @param height
 * @returns {string}
 */
export function randomImage(width = 50, height = 50) {
  return `https://picsum.photos/${width}/${height}?random=${Random.guid()}`
}