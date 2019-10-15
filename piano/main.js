import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

import State from 'utils/state.js'
Vue.prototype.$state=new State();


App.mpType = 'app'

const app = new Vue({
    ...App,
})
app.$mount()
