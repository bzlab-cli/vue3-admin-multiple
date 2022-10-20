/*
 * @Author: jrucker
 * @Date: 2022-09-20 10:08:37
 * @LastEditTime: 2022/10/20 10:41:27
 * @Description: 动态代理配置
 */
const chalk = require('chalk')

const getConfig = () => {
  try {
    return require('./proxy.json')
  } catch (e) {
    return {}
  }
}

console.log(chalk.bold.green('当前环境', getConfig().env))

module.exports = {
  proxy: {
    '/business-web': {
      target: getConfig().proxy || '',
      changeOrigin: true
    },
    '/ftp': {
      target: getConfig().ftp || '',
      changeOrigin: true
    },
    '/img': {
      target: getConfig().img || '',
      changeOrigin: true
    },
    '/v3': {
      target: 'https://restapi.amap.com',
      changeOrigin: true
    }
  }
}
