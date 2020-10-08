// 该vue.config.js无需安装 vue-cli-configjs 插件依赖，无需执行 npm install vue-cli-configjs 命令
// 无需安装依赖，直接在项目根路径创建vue.config.js文件就可以配置
const path = require('path')
const webpack = require('webpack')
// VUE项目构建打包生成Git信息（VERSION和COMMITHASH文件）
// npm install --save-dev git-revision-webpack-plugin --verbose
const GitRevisionPlugin = require('git-revision-webpack-plugin')
const GitRevision = new GitRevisionPlugin()
const buildDate = JSON.stringify(new Date().toLocaleString())
// npm install --save compression-webpack-plugin --verbose
// npm install compression-webpack-plugin --save-dev --verbose
const CompressionPlugin = require('compression-webpack-plugin')

function resolve (dir) {
  return path.join(__dirname, dir)
}

const isProd = process.env.NODE_ENV === 'production'

const assetsCDN = {
  // webpack build externals
  externals: {
    vue: 'Vue',
    'vue-router': 'VueRouter',
    vuex: 'Vuex',
    axios: 'axios'
  },
  css: [],
  // https://unpkg.com/browse/vue@2.6.10/
  js: [
    '//cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.min.js',
    '//cdn.jsdelivr.net/npm/vue-router@3.1.3/dist/vue-router.min.js',
    '//cdn.jsdelivr.net/npm/vuex@3.1.1/dist/vuex.min.js',
    '//cdn.jsdelivr.net/npm/axios@0.19.0/dist/axios.min.js'
  ]
}

// vue.config.js
const vueConfig = {
  // publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  // outputDir: 'dist',
  // assetsDir: 'static',
  // indexPath: 'index.html',
  // publicPath: (isProd === true) ? '/' : './',
  productionSourceMap: !isProd, // 是否打包输出源代码，true的话，打包后的dist文件夹可能多出十几MB
  configureWebpack: {
    // webpack plugins
    plugins: [
      // 在使用moment.js时，由于默认的moment库会引入全部的语言资源文件，导致最后打包时体积非常大，我们可以通过webpack自带的插件来精简掉这些语言资源文件
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new GitRevisionPlugin(), // 会在dist目录下生成VERSION和COMMITHASH文件
      // 打包时，给js和css添加时间戳，防止缓存
      new webpack.DefinePlugin({
        APP_VERSION: `"${require('./package.json').version}"`,
        GIT_HASH: JSON.stringify(GitRevision.version()),
        BUILD_DATE: buildDate
      }),
      new CompressionPlugin({
        // filename: '[path].gz[query]', // 默认取值就是 '[path].gz[query]'，这个参数设了，不知道有什么效果，反复测试了很多次，浪费了很多时间，这个参数，以后都不设置
        algorithm: 'gzip',
        test: /\.(js|css|json|html|txt|ico|svg)(\?.*)?$/i,
        threshold: 512, // 超过这个参数大小的文件才会被压缩。以字节为单位默认为0。
        minRatio: 0.8, // 压缩比率，只有压缩得更好的资产才能处理这个比率。
        deleteOriginalAssets: false
      })
    ],
    // if prod, add externals
    externals: isProd ? assetsCDN.externals : {}
  },

  chainWebpack: (config) => {
    config.resolve.alias
      .set('@$', resolve('src'))

    // vue-cli 3项目使用svg一路填坑
    // 用vue-cli3版本创建的，项目的目录结构和以前相比有变化
    const svgRule = config.module.rule('svg')
    // 清除已有的所有 loader。
    // 如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
    // 重点:删除默认配置中处理svg,
    svgRule.uses.clear()
    svgRule
      .oneOf('inline')
      .resourceQuery(/inline/)
      .use('vue-svg-icon-loader')
      .loader('vue-svg-icon-loader')
      .end()
      .end()
      .oneOf('external')
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: 'assets/[name].[hash:8].[ext]'
      })

    if (isProd) {
      // // 删除预加载
      // config.plugins.delete('preload')
      // config.plugins.delete('prefetch')
      // 分割代码
      config.optimization.splitChunks({
          chunks: 'all'
      })
      config.plugin('html').tap(args => { // 生产环境注入cdn
        args[0].cdn = assetsCDN
        return args
      })
      // 压缩js和css文件
      config.plugin('compressionPlugin')
        .use(new CompressionPlugin({
            // filename: '[path].gz[query]', // 默认取值就是 '[path].gz[query]'，这个参数设了，不知道有什么效果，反复测试了很多次，浪费了很多时间，这个参数，以后都不设置
            algorithm: 'gzip',
            test: /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i,
            threshold: 512, // 超过这个参数大小的文件才会被压缩。以字节为单位默认为0。
            minRatio: 0.8, // 压缩比率，只有压缩得更好的资产才能处理这个比率。
            deleteOriginalAssets: false // 是否删除原资源
        }))
    }
  },

  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          // less vars，customize ant design theme
          // 'primary-color': '#F5222D',
          // 'link-color': '#F5222D',
          'border-radius-base': '2px'
        },
        // DO NOT REMOVE THIS LINE
        javascriptEnabled: true
      }
    }
  },

  devServer: {
    overlay: { // 让浏览器 overlay 同时显示警告和错误
      warnings: true,
      errors: true
    },
    hotOnly: true, // 热更新
    port: 8000
    // If you want to turn on the proxy, please remove the mockjs /src/main.jsL11
    // proxy: {
    //   '/api': {
    //     target: 'https://mock.ihx.me/mock/5baf3052f7da7e07e04a5116/antd-pro',
    //     ws: false,
    //     changeOrigin: true
    //   }
    // }
  },

  lintOnSave: undefined,
  // babel-loader no-ignore node_modules/*
  transpileDependencies: []
}

module.exports = vueConfig
