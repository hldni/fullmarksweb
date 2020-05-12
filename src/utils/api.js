import axios from 'axios'
// import {Message} from 'element-ui';
import router from '../router'

import Message from '../components/Message/index.js'

// import 'material-design-icons-iconfont/dist/material-design-icons.css'

// Vue.prototype.$message = Message

export const initMenu = (router, store) => {
    //执行
    store.dispatch('connect');
}

axios.interceptors.response.use(success => {
    if (success.status && success.status == 200 && success.data.status == 500) {
        // return;
    }
    if (success.data.msg) {
        // Message.success({message: success.data.msg})
    }
       // Message.succ({message: success.data.msg})
    return success.data;
}, error => {
    if (error.response.status == 504 || error.response.status == 404) {
		Message.error("服务器被吃了( ╯□╰ )");
    } else if (error.response.status == 403) {
		Message.error("权限不足，请联系管理员");
    } else if (error.response.status == 401) {
		window.sessionStorage.removeItem("user");
		Message.error("尚未登录，请登录");
		router.replace('/');
    } else if (error.response.status == 505) {
		window.sessionStorage.removeItem("user");
		Message.error(error.response.data.msg);
		router.replace('/');
	}else {
		Message.error("未知错误aa!");
        if (error.response.data.msg) {
            Message.error({message: error.response.data.msg})
        } else {
			Message.error("未知错误!");
        }
    }
    return;
})

// let base = 'fullmarks';
let base = '';

export const postKeyValueRequest = (url, params) => {
    return axios({
        method: 'post',
        url: `${base}${url}`,
        data: params,
        transformRequest: [function (data) {
            let ret = '';
            for (let i in data) {
                ret += encodeURIComponent(i) + '=' + encodeURIComponent(data[i]) + '&'
            }
            return ret;
        }],
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
		// crossDomain:true, //设置跨域为true
		// xhrFields: {
		// 	withCredentials: true //默认情况下，标准的跨域请求是不会发送cookie的
		// },
    });
}
export const postRequest = (url, params) => {
    return axios({
        method: 'post',
        url: `${base}${url}`,
        data: params
    })
}
export const putRequest = (url, params) => {
    return axios({
        method: 'put',
        url: `${base}${url}`,
        data: params
    })
}
export const getRequest = (url, params) => {
    return axios({
        method: 'get',
        url: `${base}${url}`,
        data: params
    })
}
export const deleteRequest = (url, params) => {
    return axios({
        method: 'delete',
        url: `${base}${url}`,
        data: params
    })
}