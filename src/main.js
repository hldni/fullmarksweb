import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false


import {
	postRequest
} from "./utils/api";
import {
	postKeyValueRequest
} from "./utils/api";
import {
	putRequest
} from "./utils/api";
import {
	deleteRequest
} from "./utils/api";
import {
	getRequest
} from "./utils/api";

Vue.prototype.postRequest = postRequest;
Vue.prototype.postKeyValueRequest = postKeyValueRequest;
Vue.prototype.putRequest = putRequest;
Vue.prototype.deleteRequest = deleteRequest;
Vue.prototype.getRequest = getRequest;

//全局消息提示组件
import Message from './components/Message/index.js'
Vue.prototype.$message = Message

import 'material-design-icons-iconfont/dist/material-design-icons.css'

 
router.beforeEach((to, from, next) => {
	if(from.path == '/' &&  to.path != '/' ){//需要首次或者重新建立全局webSocket连接，浏览器刷新会导致websocket连接丢失
			store.dispatch('connect');
	}
	if (to.path == '/' || to.path == '/codeLogin' || to.path == '/register') {
		if (window.sessionStorage.getItem("user")) {
			this.$router.go(-1)
			next(false);
		}
		next();
		let allowBack = true    //    给个默认值true 禁止后退
		if (to.meta.allowBack !== undefined) {
		    allowBack = to.meta.allowBack
		}
		if (!allowBack) {
		      history.pushState(null, null, location.href)
		}    
		store.dispatch('updateAppSetting', {
		    allowBack: allowBack
		})
	} else {
		if (window.sessionStorage.getItem("user")) {//已登陆用户
			// initMenu(router, store);
			next();
		} else {
			next('/?redirect=' + to.path);
		}
	}
	// next();
})


new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
