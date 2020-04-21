<template>
  <v-app>
    <v-content>
		<message></message>
		<router-view/>
    </v-content>
  </v-app>
</template>

<script>
import message from '@/components/Message/Message'
export default {
 
	name: 'App',
	components: {
		message,
	},
	data: () => ({
	//
	}),
	methods:{
		listenerHandle(e){
			if(e.keyCode>112 && e.keyCode < 123){//屏蔽F1~F12
				if(window.event){// ie
					try{
						e.keyCode = 0;
					}catch(e){}
					e.returnValue = false;
				}else{// firefox
					e.preventDefault();
				}
			}
		},
		//检测浏览器刷新行为失败
		// beforeunloadHandler(e) {
			
		// 	e = e || window.event
		// 	if(e){
		// 		e.returnValue="关闭提示"
		// 	}
		// 	return '关闭提醒'
		// }
	},
	mounted() {
		window.onpopstate = () => {
			if (!this.allowBack) {    //    这个allowBack 是存在vuex里面的变量
				history.go(1)
			}
		},
		window.addEventListener('beforeunload', e => this.beforeunloadHandler(e))
		
	},
	created() {
		
		// window.addEventListener('beforeunload', this.beforeunloadHandler, false)
		window.addEventListener('keydown',this.listenerHandle,false)// 禁止按键
		// window.addEventListener('beforeunload',this.listenerHandle2,false)// 禁止浏览器刷新
		document.oncontextmenu = function(){// 禁止右键刷新
			event.returnValue = false;
		};
		
	}
};
</script>