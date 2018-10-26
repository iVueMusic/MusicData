// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import './assets/iconfont/iconfont.css'

import Scroll from './components/base/scroll'
Vue.component(Scroll.name,Scroll)

import Loading from './components/base/loading'
Vue.component(Loading.name,Loading)

import vueLazyload from 'vue-lazyload'
Vue.use(vueLazyload,{
  praload: 1,
  loading: 'http://images2017.cnblogs.com/q/220020/201801/220020-20180130133657734-775364251.gif',
  attempt: 1
})


Vue.config.productionTip = false
Vue.prototype.$axios = axios
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
