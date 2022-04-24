import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import ElementUI, { Message } from 'element-ui'
import '@/style/base'
import '@/style/transition'
import '@/style/element-styles'

const message = {}
const messageType = ['success', 'error', 'warning', 'info']
messageType.forEach(type => {
  message[type] = (message, duration = 2000) => {
    return Message({
      message, type, duration
    })
  }
})

Vue.use(ElementUI)
Vue.prototype.$message = message

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
