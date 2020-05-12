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
		downBorders:[],//底牌
        friends: [],//好友信息
		index:0,//当前玩家所在players下标
        currentSession: null,
		papers:["big.jpg","small.jpg",
			"hea01.jpg","hea13.jpg","hea12.jpg","hea11.jpg","hea10.jpg","hea09.jpg","hea08.jpg","hea07.jpg","hea06.jpg","hea05.jpg","hea04.jpg","hea03.jpg","hea02.jpg",
			"spa01.jpg","spa13.jpg","spa12.jpg","spa11.jpg","spa10.jpg","spa09.jpg","spa08.jpg","spa07.jpg","spa06.jpg","spa05.jpg","spa04.jpg","spa03.jpg","spa02.jpg",
			"dia01.jpg","dia13.jpg","dia12.jpg","dia11.jpg","dia10.jpg","dia09.jpg","dia08.jpg","dia07.jpg","dia06.jpg","dia05.jpg","dia04.jpg","dia03.jpg","dia02.jpg",
			"plum01.jpg","plum13.jpg","plum12.jpg","plum11.jpg","plum10.jpg","plum09.jpg","plum08.jpg","plum07.jpg","plum06.jpg","plum05.jpg","plum04.jpg","plum03.jpg","plum02.jpg",
			"poperBackground.png"
		],
		imgPath:'http://47.93.26.159:8421/img/show?path=poker/',//图片路径
		isScore:true,//是否叫分阶段
		isGameing:true,//是否游戏阶段
		grade:{ num:0,
			index:0,
		},
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
		// CALL_GRADE(state,){
			
		// }
		
		/**
		 * 初始化玩家手中的牌
		 * @param {Object} state
		 * @param {Object} msg
		 */	
		INIT_PAPER(state,msg){
			let index = msg.index;
			let borders = [];
			let border = [];
			for (var i = 0; i < 4; i++) {
				border = msg.boards[index];
				borders.push(border);
				index = (index + 1) % 4;
			}
			for (var i = 0; i < borders[0].length; i++) {
				console.log("自己的牌:" + borders[0][i]);
			}
			// alert("dipai"+msg.boards.length);
			state.mySelfPlayer.borders = borders[0];
			state.rightPlayer.borders = borders[1];
			state.oppositePlayer.borders = borders[2];
			state.leftPlayer.borders = borders[3];
			state.downBorders = msg.boards[4];
			// alert(index);
			//省略更新玩家所叫的分数，由于是首个叫分，初始化叫分已完成
			//更新叫分玩家
			store.commit('UPDATE_GRADE_STATUS',index);

		},
		/**
		 * 更新玩家叫分信息
		 * @param {Object} state
		 * @param {Object} index
		 */
		UPDATE_GRADE_STATUS(state,index){
			/**
			 * isGrade 改为true 是否叫分
			 * grade 改不改先无所谓 分数
			 * gradeCss mySelfNum样式改了
			 * 更新下列信息，
			 grade:{
					index:0,num:85,
				},
			 * 如果是别人
			 * 更新所在下标的isGrade
			 * 
			 */
			//是否叫分
			switch(index){
				case 0:
					state.mySelfPlayer.isGrade = true;
					state.rightPlayer.isGrade = false;
					state.oppositePlayer.isGrade = false;
					state.leftPlayer.isGrade = false;
					state.mySelfPlayer.gradeCss = 'mySelfNum';
					break;
				case 1:
					state.rightPlayer.isGrade = true;
					state.mySelfPlayer.isGrade = false;
					state.oppositePlayer.isGrade = false;
					state.leftPlayer.isGrade = false;
					break;
				case 2:
					state.oppositePlayer.isGrade = true;
					state.mySelfPlayer.isGrade = false;
					state.rightPlayer.isGrade = false;
					state.leftPlayer.isGrade = false;
					break;
				case 3:
					state.leftPlayer.isGrade = true;
					state.mySelfPlayer.isGrade = false;
					state.rightPlayer.isGrade = false;
					state.oppositePlayer.isGrade = false;
					break;
			}
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
				myObj.on = false;//是否出牌
				myObj.isGrade = false;//是否叫分
				myObj.grade = '等待其他玩家叫分';//玩家叫的分数
				myObj.gradeCss = 'waitGrade';//waitGrade  mySelfNum
				myObj.borders = [];
				
			state.mySelfPlayer = myObj;
			console.info("更新自己成功");
			
			//对家的信息
			let oppositeObj = new Object();
				oppositeObj.master = players[oppositeIndex].master;
				oppositeObj.username = players[oppositeIndex].username;
				oppositeObj.uname = players[oppositeIndex].uname;
				oppositeObj.uface = players[oppositeIndex].uface;
				oppositeObj.status = players[oppositeIndex].status;
				oppositeObj.on = false;//是否出牌
				oppositeObj.isGrade = false;//是否叫分
				oppositeObj.grade = '';//玩家叫的分数
				oppositeObj.borders = [];
				
			state.oppositePlayer = oppositeObj;
			console.info("更新对家成功");
			
			//左边玩家信息
			let leftObj = new Object();
				leftObj.master = players[leftIndex].master;
				leftObj.username = players[leftIndex].username;
				leftObj.uname = players[leftIndex].uname;
				leftObj.uface = players[leftIndex].uface;
				leftObj.status = players[leftIndex].status;
				leftObj.on = false;//是否出牌
				leftObj.isGrade = false;//是否叫分
				leftObj.grade = '';//玩家叫的分数
				leftObj.borders = [];
				
			state.leftPlayer = leftObj;
			console.info("更新左边成功");
			
			//右边玩家信息
			let rightObj = new Object();
				rightObj.master = players[rightIndex].master;
				rightObj.username = players[rightIndex].username;
				rightObj.uname = players[rightIndex].uname;
				rightObj.uface = players[rightIndex].uface;
				rightObj.status = players[rightIndex].status;
				rightObj.on = false;//是否出牌
				rightObj.isGrade = false;//是否叫分
				rightObj.grade = '';//玩家叫的分数
				rightObj.borders = [];
			
			state.rightPlayer = rightObj;
			console.info("更新右边成功");
		}
    },
  actions: {
	  /**
	   * 本来不应该支持浏览器多开窗口访问得！！！哎，我这该死得温柔
	   */
		connect(context){
			// context.state.stomp = Stomp.over(new SockJS("http://47.93.26.159:8079/ws/ep"));
			context.state.stomp = Stomp.over(new SockJS("/ws/ep"));
			window.sessionStorage.setItem("globalConnect", context.state.stomp);//此通信只需要建立一次
			context.state.stomp.connect({}, frame=> {
			Message.success("成功进入connect");
			context.state.stomp.subscribe("/user/queue/chat", message=> {
				var msg = JSON.parse(message.body);
				Message.success("接收成功");
				alert("发送人："+msg.from);
				alert("内容："+ msg.content);
			});
			}, failedMsg=> {
		 
			});
		},
		connect_room(context,roomId){
			// context.state.stomp_room = Stomp.over(new SockJS("http://47.93.26.159:8079/ws/ep"));
			context.state.stomp_room = Stomp.over(new SockJS("/ws/ep"));
			context.state.stomp_room.connect({}, frame=> {
			context.state.roomId = roomId;//设置房间号为当前房间号
			// ++context.state.roomNum;
			router.push("/game");//连接成功，成功进入
			context.state.subscript = context.state.stomp_room.subscribe("/topic/sendTopic/"+roomId, message=> {
				// this.$router.push("/game");
				var msg = JSON.parse(message.body);
				console.info("type:"+msg.type + "username" + msg.username);
				// if(msg.type == 10){
				// 	alert("接收到服务端发送得消息");
				// 	context.state.test = msg.username;
				// }
				
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
					
					context.commit('INIT_PAPER', msg);
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