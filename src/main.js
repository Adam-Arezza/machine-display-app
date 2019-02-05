import Vue from 'vue'
import App from './App.vue'
import VueSocketIO from 'vue-socket.io'

Vue.config.productionTip = false

//connection: enter the server IP and port where the app is hosted
Vue.use(new VueSocketIO({
  connection: '192.168.2.15:3000'
}))

new Vue({
  render: function (h) { return h(App) },
}).$mount('#app')
