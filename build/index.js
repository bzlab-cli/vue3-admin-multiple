/*
 * @Author: jrucker
 * @Description:
 * @Date: 2021/07/29 10:15:09
 * @LastEditors: jrucker
 * @LastEditTime: 2022/01/26 10:14:26
 */

const { run } = require('runjs')
const chalk = require('chalk')
const rawArgv = process.argv.slice(2)
const args = 'build'

if (process.env.npm_config_preview || rawArgv.includes('--preview')) {
  // run(`npm run ${args}`)

  const port = 8410
  const fs = require('fs')
  const path = require('path')
  const express = require('express')
  const app = express()
  const { createProxyMiddleware } = require('http-proxy-middleware')
  app.use(express.static(path.resolve(__dirname, '../dist')))

  const proxyTable = {
    '/business-web': {
      target: 'http://local.qimiaowa.com:30356',
      changeOrigin: true
    }
  }

  Object.keys(proxyTable).forEach(function (context) {
    let options = proxyTable[context]
    if (typeof options === 'string') {
      options = { target: options }
    }
    app.use(createProxyMiddleware(options.filter || context, options))
  })

  app.get('*', function (req, res) {
    const html = fs.readFileSync(path.resolve(__dirname, '../dist/center/index.html'), 'utf-8')
    res.send(html)
  })

  app.listen(port, () => {
    console.log(chalk.green(`> Preview at http://localhost:${port}`))
  })
} else {
  run(`npm run ${args}`)
}
