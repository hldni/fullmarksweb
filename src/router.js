import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './pages/Login.vue'
import Password from './pages/passwordLogin.vue'
import CodeLogin from './pages/codeLogin.vue'
import Main from './pages/games/main.vue'
import Game from './pages/games/Game.vue'
import BeginGame from './pages/games/BeginGame.vue'
import Level from './components/games/Level.vue'
import ChoseRoom from './components/games/ChoseRoom.vue'

Vue.use(Router)

export default new Router({
	 routes: [
		{
			path: '/',
			name: 'Login',
			component: Login,
			hidden:true,
			meta: {allowBack: false},
			children:[
				{
					path: '/',
					name: 'password',
					component: Password,
					hidden:true
				},
				{
					path: '/codeLogin',
					name: 'codeLogin',
					component: CodeLogin,
				}, 
			]
		},
		{
			path: '/home',
			name: 'Home',
			component: Home,
			hidden:true,
		},
		{
			path: '/main',
			name: 'Main',
			component: Main,
			hidden:true,
			children:[
				{
					path: '/',
					name: 'Level',
					component: Level,
					hidden:true
				},
				{
					path: '/choseRoom',
					name: 'ChoseRoom',
					component: ChoseRoom,
				}, 
			]
		},
		{
			path: '/Game',
			name: 'Game',
			component: Game,
			hidden:true,
		},
		{
			path: '/beginGame',
			name: 'BeginGame',
			component: BeginGame,
			hidden:true,
		},
		
		/* {
			path: '/home',
			name: 'Home',
			component: Home,
			hidden:true,
			children:[
				{
					path: '/chat',
					name: '消息',
					component: Chat,
					hidden:true,
					children:[
						{
							path: '/fri',
							name: '在线聊天',
							component: FriendChat,
							hidden:true
						},
						{
							path: '/sys',
							name: '系统通知',
							component: SysChat,
							hidden:true
						}
					]
				}
			]
		} */
	]
})
