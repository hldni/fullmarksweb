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
	if (to.path == '/' || to.path == '/codeLogin' || to.path == '/register') {
		if (window.sessionStorage.getItem("user")) {
			this.$router.go(-1)
			next(false);
		}
		next();
		let allowBack = true    //    给个默认值true
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
		if (window.sessionStorage.getItem("user")) {
			// initMenu(router, store);
			// alert("准备执行test"); 
			// Message.success("准备执行test.....");
			if(window.sessionStorage.getItem("globalConnect")){
				store.dispatch('connect');
			}
			// store.dispatch('increment');
			// alert("已经执行test");
			// Message.success("已经执行test");
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
