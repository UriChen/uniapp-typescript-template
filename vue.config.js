const path = require('path')
const settings = require('./src/config/settings.js')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')

const { cliSettings } = settings

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  transpileDependencies: ['vuex-module-decorators'],
  publicPath: cliSettings.publicPath,
  outputDir: cliSettings.outputDir,
  assetsDir: cliSettings.assetsDir,
  productionSourceMap: true,
  lintOnSave: process.env.NODE_ENV !== 'production',
  devServer: {
    port: cliSettings.devServerPort,
    progress: false,
    https: cliSettings.https,
    disableHostCheck: true,
    open: false,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      '/': {
        target: `http://120.79.204.212:9090`,
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          ['^' + '/']: ''
        }
      }
    }
  },

  css: {
    loaderOptions: {
      sass: {
        implementation: require('sass'),
        sassOptions: {
          fiber: require('fibers')
        }
      },
      scss: {
        prependData: `@import "~@/styles/index.scss";`
      }
    }
  },

  configureWebpack: {
    plugins: [
      new ProgressBarPlugin()
    ],
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },

  chainWebpack(config) {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    config.set('name', cliSettings.title)
    // set preserveWhitespace
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()
    // https://webpack.js.org/configuration/devtool/#development
    config
      .when(process.env.NODE_ENV === 'development',
        (config) => config.devtool('cheap-source-map')
      )

    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' // only package third parties that are initially dependent
                },
                commons: {
                  name: 'chunk-commons',
                  test: path.resolve(__dirname, 'src/components'),
                  minChunks: 3, //  minimum common number
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })
          config.optimization.runtimeChunk('single')
        }
      )
  }
}
