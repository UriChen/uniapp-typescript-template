import 'reflect-metadata'
import { Component, Vue } from 'vue-property-decorator'

import App from '@/App.vue'
import store from '@/store'

// plugins
import i18n from '@/lang'
import '@/icons/components'
import * as filters from '@/filters'
import SvgIcon from 'vue-svgicon'
import { handleError } from '@/utils/handleErrors'

Component.registerHooks([
  'onLoad',
  'onShow',
  'onHide',
  'onLaunch',
  'onShareAppMessage'
])

Vue.use(SvgIcon, {
  tagName: 'svg-icon',
  defaultWidth: '1em',
  defaultHeight: '1em'
})

Vue.prototype.$store = store

// Register global filter functions
Object.keys(filters).forEach(key => {
  Vue.filter(key, (filters as { [key: string]: Function })[key])
})

// 阻止 vue 在启动时生成生产提示
Vue.config.productionTip = false

// Vue 全局错误处理
Vue.config.errorHandler = err => {
  handleError(err)
}

const app = new Vue({
  store,
  i18n,
  ...App
})
app.$mount()
