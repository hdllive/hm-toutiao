import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/styles/index.less'
import Vant from 'vant'
import 'vant/lib/index.less'
import 'amfe-flexible'

import MyIcon from '@/components/MyIcon'
Vue.component('MyIcon', MyIcon)

Vue.config.productionTip = false
Vue.use(Vant)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
