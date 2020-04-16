import Vue from 'vue'
import Vuex from 'vuex'
import {getRequest} from "./utils/api";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import Message from './components/Message/index.js'
import router from './router.js'

Vue.use(Vuex)

const now = new Date();

const store = new Vuex.Store({
	// 这里放全局参数
    state: {
        routes: [],
        sessions: {},
        users: [],
        currentSession: null,
        currentUser: JSON.parse(window.sessionStorage.getItem("user")),
        filterKey: '',
        stomp: null,
        stomp_room: null,
        isDot: {},
		count:0,
		roomId:'',
		subscript:null,
		players:null,//房间中的玩家
		roomNum:0,//房间人数
    },
	//这里是set方法
    mutations: {
        INIT_CURRENTUSER(stat, user) {
            state.currentUser = user;
        },
        initRoutes(state, data) {
            state.routes = data;
        },
        changeCurrentSession(state, currentSession) {
            Vue.set(state.isDot, state.currentUser.username + '#' + currentSession.username, false);
            state.currentSession = currentSession;
        },
        addMessage(state, msg) {
            let mss = state.sessions[state.currentUser.username + '#' + msg.to];
            if (!mss) {
                // state.sessions[state.currentHr.username+'#'+msg.to] = [];
                Vue.set(state.sessions, state.currentUser.username + '#' + msg.to, []);
            }
            state.sessions[state.currentUser.username + '#' + msg.to].push({
                content: msg.content,
                date: new Date(),
                self: !msg.notSelf
            })
        },
        INIT_DATA(state) {
            //浏览器本地的历史聊天记录可以在这里完成
            let data = localStorage.getItem('vue-chat-session');
            if (data) {
                state.sessions = JSON.parse(data);
            }
        },
        INIT_USER(state, data) {
            state.users = data;
        },
		increment (state) {
		  state.count++
		},
		GET_INFO_ROOM(state,roomId){
			state.roomId = roomId;
		},
		ISCONNECT(state){
			return true;
		}
    },
  actions: {
		connect(context){
			context.state.stomp = Stomp.over(new SockJS("/ws/ep"));
			window.sessionStorage.setItem("globalConnect", context.state.stomp);//此通信只需要建立一次
			context.state.stomp.connect({}, frame=> {
			Message.success("成功进入connect");
			context.state.stomp.subscribe("/user/queue/chat", message=> {
				var msg = JSON.parse(message.body);
				Message.success("接收陈公公");
				this.test = msg;
				var oldMsg = window.localStorage.getItem(context.state.user.username + "#" + msg.from);
				if (oldMsg == null) {
				oldMsg = [];
				oldMsg.push(msg);
				window.localStorage.setItem(context.state.user.username + "#" + msg.from, JSON.stringify(oldMsg))
				} else {
				var oldMsgJson = JSON.parse(oldMsg);
				oldMsgJson.push(msg);
				window.localStorage.setItem(context.state.user.username + "#" + msg.from, JSON.stringify(oldMsgJson))
				}
				if (msg.from != context.state.currentFriend.username) {
				context.commit("addValue2DotMap", "isDot#" + context.state.user.username + "#" + msg.from);
				}
				//更新msgList
				var oldMsg2 = window.localStorage.getItem(context.state.user.username + "#" + context.state.currentFriend.username);
				if (oldMsg2 == null) {
				context.commit('updateMsgList', []);
				} else {
				context.commit('updateMsgList', JSON.parse(oldMsg2));
				}
			});
			}, failedMsg=> {
		 
			});
		},
		connect_room(context,roomId){
			context.state.stomp_room = Stomp.over(new SockJS("/ws/ep"));
			context.state.stomp_room.connect({}, frame=> {
			context.state.roomId = roomId;//设置房间号为当前房间号
			++context.state.roomNum;
			router.push("/game");//连接成功，成功进入
			context.state.subscript = context.state.stomp_room.subscribe("/topic/sendTopic/"+roomId, message=> {
				// this.$router.push("/game");
				var msg = JSON.parse(message.body);
				/**
				 * 新玩家加入：
				 * 	1、更新房间内的人
				 * 	2、更新自己的好友
				 *  3、房间内人数补充至4人
				 */
				if(msg.status == 0){//新玩家加入
					alert("房间人数"+msg.players.length);
					context.state.players = msg.players;
					if(msg.from.uid ==  JSON.parse(window.sessionStorage.getItem("user")).uid){
						context.state.friends = msg.friends;
					}
					//将房间内人数补充至4人
					let player = new Object();
					player.username = '';
					player.uface = 'img/waitplay.5e1581e1.png';
					player.status = 4;
					for (var i = msg.players.length -1; i < 4; i++) {
						context.state.players .push(player);
					}
				}
				if(msg.status == 1){//有玩家退出  更新房间内玩家
					var msg = JSON.parse(message.body);
					context.state.players = msg.players;
					//将房间内人数补充至4人
					let player = new Object();
					player.username = '';
					player.uface = 'img/waitplay.5e1581e1.png';
					player.status = 4;
					for (var i = msg.players.length -1; i < 4; i++) {
						context.state.players .push(player);
					}
					if(msg.from.uid ==  JSON.parse(window.sessionStorage.getItem("user")).uid){
						alert("退出成功");
						//关闭连接
						if(context.state.stomp_room != null){
							// context.state.subscript.unsubscribe();
							context.state.stomp_room.disconnect();
							context.state.stomp_room = null;
						}
					}
				}
				if(msg.status == 2){
					alert("切换成功"+msg.index)
					context.state.players[msg.index].status = 1;
				}else if(msg.status == 3){
					alert("切换成功2")
					context.state.players[msg.index].status = 0;
				}
				// 	let player = new Object();
				// 	// player.isMaster = player.
				// }else if(true){
					
					
				// }
				
			});
			}, failedMsg=> {
				Message.error("加入失败，请稍后重新尝试!");
			});
		},
		close_connect_room(context){//关闭连接
			if(context.state.stomp_room != null){
				// context.state.subscript.unsubscribe();
				context.state.stomp_room.disconnect();
				context.state.stomp_room = null;
			}
		},
		
		increment (context) {
			// alert("1")
			this.$message.success("成功进入");
			context.commit('increment')
		}
        /* initData(context) {
            context.commit('INIT_DATA')
            getRequest("/chat/hrs").then(resp => {
                if (resp) {
                    context.commit('INIT_HR', resp);
                }
            })
        } */
    }
})

store.watch(function (state) {
    return state.sessions
}, function (val) {
    localStorage.setItem('vue-chat-session', JSON.stringify(val));
}, {
    deep: true/*这个貌似是开启watch监测的判断,官方说明也比较模糊*/
})


export default store;