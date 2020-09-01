import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI, { TimeSelect } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n

import '@/styles/index.scss' // global css
import '@/styles/orgchart.css'
import 'font-awesome/css/font-awesome.min.css'
import App from './App'
import store from './store'
import router from './router'

import vSelectPage from 'v-selectpage';
Vue.use(vSelectPage);

import '@/icons' // icon
import '@/permission' // permission control

import global from '@/components/global/index'
Vue.prototype.global = global

Vue.use(ElementUI, {
  locale
})

Vue.config.productionTip = false

import * as voicePromptFun from './utils/voicePrompt' 
Vue.prototype.voicePrompt = voicePromptFun.voicePrompt  //语音提醒

// 判断是否有新订单
import * as haveOrderFun from './utils/haveOrder' 
Vue.prototype.haveOrder = haveOrderFun.haveOrder  
 
// this.haveOrder();
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
