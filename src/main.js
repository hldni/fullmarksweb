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
// import Message from './Message/index.js'
// Vue.prototype.$my_message = Message.install;

import Message from './components/Message/index.js'
Vue.prototype.$message = Message

import 'material-design-icons-iconfont/dist/material-design-icons.css'

 
// Vue.prototype.$qs = qs

/* Vue.http.interceptors.push((request, next) => {
	console.log(this); //此处this为请求所在页面的Vue实例 
	// modify request  
	request.method = 'POST';
	//在请求之前可以进行一些预处理和配置  
	// continue to next interceptor　　
	next((response) => {
		//在响应之后传给then之前对response进行修改和逻辑判断。对于token时候已过期的判断，就添加在此处，页面中任何一次http请求都会先调用此处方法    　　
		response.body = '...';
		return response;
	});
}); */

router.beforeEach((to, from, next) => {

	if (to.path == '/' || to.path == '/codeLogin' || to.path == '/register') {
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
