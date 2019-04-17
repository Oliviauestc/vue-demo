import Vue from 'vue'
import ElementUI from 'element-ui'
import App from './App'
import router from './router'
import store from './store'
import MetaInfo from 'vue-meta-info'
import '@/utils/mock.js'
Vue.use(MetaInfo)
Vue.use(ElementUI)
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
