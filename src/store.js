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
        currentUser: JSON.parse(window.sessionStorage.getItem("user")),
        sessions: {},//存放本地缓存
        stomp: null,//全局通信
        stomp_room: null,//房间通信
		roomId:'',//房间号
		players:[],//房间中的玩家
		mySelfPlayer: {},//存放自己的信息 包括昵称、头像、剩余牌数等
		oppositePlayer: {},//存放对边玩家的一些信息
		leftPlayer: {},//存放左边玩家的信息
		rightPlayer: {},//存放右边玩家的信息
        friends: [],//好友信息
		index:0,//当前玩家所在players下标
        currentSession: null,
    },
	//这里是set方法
    mutations: {
        INIT_DATA(state) {
            //浏览器本地的历史聊天记录可以在这里完成
            let data = localStorage.getItem('vue-chat-session');
            if (data) {
                state.sessions = JSON.parse(data);
            }
        },
		/**
		 * 初始化玩家好友列表
		 * @param {Object} state
		 * @param {Object} friends
		 */
		INIT_FRIENDS(state,friends){
			state.friends = friends;
		},
		SET_INFO_ROOM(state,roomId){
			state.roomId = roomId;
		},
		ISCONNECT(state){
			return true;
		},
		/**
		 * 改变玩家准备状态
		 * @param {Object} state
		 * @param {Object} msg 接收到的消息
		 */
		CHANGE_PLAYER_STATUS(state,msg){
			let myIndex = state.index;//自己下标
			let oppositeIndex = (myIndex + 2) % 4;//对家玩家下标
			let leftIndex = (myIndex + 3) % 4;//左边玩家下标
			let rightIndex = (myIndex + 1) % 4;//右边玩家下标
			// alert(index);
			if(msg.type == 2){//切换至已准备状态
				switch(msg.index){
					case myIndex : state.mySelfPlayer.status = 1;
						break;
					case oppositeIndex : state.oppositePlayer.status = 1;
						break;
					case leftIndex : state.leftPlayer.status = 1;
						break;
					case rightIndex : state.rightPlayer.status = 1;
				}
			}else if(msg.type == 3){//切换至未准备状态
				switch(msg.index){
					case myIndex : state.mySelfPlayer.status = 0;
						break;
					case oppositeIndex : state.oppositePlayer.status = 0;
						break;
					case leftIndex : state.leftPlayer.status = 0;
						break;
					case rightIndex : state.rightPlayer.status = 0;
				}
			}
			// context.state.players[msg.index].status = 1;
		},
		/**更新房间内玩家的信息
		 * @param {Object} state
		 * @param {Object} players
		 */
		UPDATE_ROOM_PLAYERS(state,players){
			//将房间内人数补充至4人
			let player = new Object();
			player.username = '';
			player.uface = 'img/waitplay.5e1581e1.png';
			player.status = 4;
			for (var i = players.length -1; i < 4; i++) {
				players.push(player);
			}
			
			/**
			 * 同步数据，接收房间内所有信息，在信息改变时即使做出反应
			 */
			console.info("进入'UPDATE_ROOM_PLAYERS'成功");
			let myselfIndex = -1;
			for (var i = 0; i < players.length; i++) {
				if(players[i].uname == JSON.parse(window.sessionStorage.getItem("user")).uname){ //是自己
					myselfIndex = i;
					state.index = i;//更新自己下标
					break;
				}
			}
			console.info("插入下标成功");
			let oppositeIndex = (myselfIndex + 2) % 4;//对家玩家下标
			let leftIndex = (myselfIndex + 3) % 4;//左边玩家下标
			let rightIndex = (myselfIndex + 1) % 4;//右边玩家下标
			
			//自己的信息
			
			let myObj = new Object();
				myObj.master = players[myselfIndex].master;
				myObj.username = players[myselfIndex].username;
				myObj.uname = players[myselfIndex].uname;
				myObj.uface = players[myselfIndex].uface;
				myObj.friends = players[myselfIndex].friends;
				myObj.status = players[myselfIndex].status;
				
			state.mySelfPlayer = myObj;
			console.info("更新自己成功");
			
			//对家的信息
			let oppositeObj = new Object();
				oppositeObj.master = players[oppositeIndex].master;
				oppositeObj.username = players[oppositeIndex].username;
				oppositeObj.uname = players[oppositeIndex].uname;
				oppositeObj.uface = players[oppositeIndex].uface;
				oppositeObj.status = players[oppositeIndex].status;
				
			state.oppositePlayer = oppositeObj;
			console.info("更新对家成功");
			
			//左边玩家信息
			let leftObj = new Object();
				leftObj.master = players[leftIndex].master;
				leftObj.username = players[leftIndex].username;
				leftObj.uname = players[leftIndex].uname;
				leftObj.uface = players[leftIndex].uface;
				leftObj.status = players[leftIndex].status;
				
			state.leftPlayer = leftObj;
			console.info("更新左边成功");
			
			//右边玩家信息
			let rightObj = new Object();
				rightObj.master = players[rightIndex].master;
				rightObj.username = players[rightIndex].username;
				rightObj.uname = players[rightIndex].uname;
				rightObj.uface = players[rightIndex].uface;
				rightObj.status = players[rightIndex].status;
			
			state.rightPlayer = rightObj;
			console.info("更新右边成功");
		}
    },
  actions: {
	  /**
	   * 本来不应该支持浏览器多开窗口访问得！！！哎，我这该死得温柔
	   */
		connect(context){
			context.state.stomp = Stomp.over(new SockJS("/ws/ep"));
			window.sessionStorage.setItem("globalConnect", context.state.stomp);//此通信只需要建立一次
			context.state.stomp.connect({}, frame=> {
			Message.success("成功进入connect");
			context.state.stomp.subscribe("/user/queue/chat", message=> {
				var msg = JSON.parse(message.body);
				Message.success("接收陈公公");
				alert("接收陈公公");
				alert("发送人："+msg.from);
				alert("内容："+ msg.content);
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
				console.info("type:"+msg.type + "username" + msg.username);
				if(msg.type == 10){
					alert("接收到服务端发送得消息");
					context.state.test = msg.username;
				}
				
				/**
				 * 新玩家加入：
				 * 	1、更新房间内的人
				 * 	2、更新自己的好友
				 *  3、房间内人数补充至4人
				 */
				if(msg.type == 0){//新玩家加入
					if(msg.from.uid ==  JSON.parse(window.sessionStorage.getItem("user")).uid){
						context.commit('INIT_FRIENDS', msg.friends);
					}
					// alert("begin");
					// setTimeout( function(){
					// 	//add your code
						context.commit('UPDATE_ROOM_PLAYERS', msg.players);
					// 	}, 1000 );
					// alert("end");
					
					// alert("jdfklsjflsdf");
				}
				if(msg.type == 1){//有玩家退出  更新房间内玩家
					var msg = JSON.parse(message.body);
					if(msg.from.uid ==  JSON.parse(window.sessionStorage.getItem("user")).uid){//自己退出了
						context.state.mySelfPlayer = null;
						context.state.leftPlayer = null;
						context.state.rightPlayer = null;
						context.state.oppositePlayer = null;
						//关闭连接
						if(context.state.stomp_room != null){
							// context.state.subscript.unsubscribe();
							context.state.stomp_room.disconnect();
							context.state.stomp_room = null;
						}
						alert("退出成功");
					}else{
						//房间内其他人退出
						context.commit('UPDATE_ROOM_PLAYERS', msg.players);
					}
					// context.commit('INIT_FRIENDS', msg.friends);
					
				}
				// if(msg.type == 2){// 切换到已准备状态
				// 	context.state.players[msg.index].status = 1;
				// }else if(msg.type == 3){//切换至未准备状态
				// 	// alert("切换成功2")
				// 	context.state.players[msg.index].status = 0;
				// }
				if(msg.type ==2 || msg.type == 3){
					
					context.commit('CHANGE_PLAYER_STATUS', msg);
				}
				if(msg.type == 5){// 房主开始游戏，进入游戏
					router.push("/beginGame")
				}
				
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