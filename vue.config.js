/*
 * @Author: jrucker
 * @Description: 配置文件
 * @Date: 2021/10/25 18:56:51
 * @LastEditors: jrucker
 * @LastEditTime: 2022/02/19 16:03:28
 */

const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 压缩css

function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = '后台管理'
const port = process.env.port || 8440
const cdn = {
  css: [
    // 'https://wy-open.oss-cn-shanghai.aliyuncs.com/common/element-plus@1.0.2-beta.35/theme-chalk/index.css',
  ],
  js: [
    'https://wy-open.oss-cn-shanghai.aliyuncs.com/common/vue@3.2.6/vue.global.prod.js',
    'https://wy-open.oss-cn-shanghai.aliyuncs.com/common/element-plus@1.0.2-beta.35/index.full.js',
    '//at.alicdn.com/t/font_2288564_y9n0hmrs19.js',
  ]
};

module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    port: port,
    open: false,
    overlay: {
      warnings: true,
      errors: true
    },
    historyApiFallback: {
      rewrites: [
        {
          from: /^(\/screen\/.*)|(\/screen)$/,
          to: path.resolve(__dirname, '/screen/index.html')
        },
        {
          from: /.*/,
          to: path.resolve(__dirname, '/admin/index.html')
        }
      ]
    },
    proxy: {
      '/business-web': {
        target: 'http://localhost:3301', // 模拟
        changeOrigin: true
      },
      '/ftp': {
        target: 'http://localhost:3301',
        changeOrigin: true
      },
      '/img': {
        target: 'http://localhost:3301',
        changeOrigin: true
      },
    }
  },
  pages: {
    admin: {
      entry: 'src/views/admin/main.ts',
      template: 'public/admin/index.html',
      filename: 'admin/index.html',
      title: '后台管理'
    },
    screen: {
      entry: 'src/views/screen/main.ts',
      template: 'public/screen/index.html',
      filename: 'screen/index.html',
      title: '大屏'
    }
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, 'src/styles/variables.scss'),
        path.resolve(__dirname, 'src/styles/mixins.scss'),
      ]
    }
  },
  configureWebpack: config => {
    config.name = name
    config.resolve.alias['@'] = resolve('src')
    config.optimization.minimizer[0].options.terserOptions.output.comments = false
    config.optimization.minimizer[0].options.terserOptions.compress.warnings = false
    config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
    config.optimization.minimizer[0].options.terserOptions.compress.drop_debugger = true
  },
  chainWebpack: (config) => {
    config.plugins.delete('prefetch-screen')
    config.plugins.delete('prefetch-admin')

    if (process.env.NODE_ENV === "production") {
      config.externals({
        vue: "Vue",
        'element-plus': "ElementPlus",
      });

      config.plugin("html-admin").tap((args) => {
        args[0].cdn = cdn;
        return args;
      });

      config.plugin("html-screen").tap((args) => {
        args[0].cdn = cdn;
        return args;
      });
    }

    config
      .output
      .filename('static/js/[name].js?v=[hash]')
      .chunkFilename('static/js/[name].js?v=[chunkhash]')
      .end()

    let miniCssExtractPlugin = new MiniCssExtractPlugin({
      filename: 'static/css/[name].css?v=[hash:8]',
      chunkFilename: 'static/css/[name].css?v=[hash:8]'
    })
    config.plugin('extract-css').use(miniCssExtractPlugin)
  }
}
