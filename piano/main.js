import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

import State from './lib/state.js'
Vue.prototype.$state = new State();

// import {
// 	$await
// } from './lib/base.js'
// Vue.prototype.$await = $await;


App.mpType = 'app'

const app = new Vue({
	...App,
})
app.$mount()
