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
		// 3 16 29 42 ‘K’ 6 19 32 45 ‘10’ 11 24 37 50 ‘5’
		imgPath:'http://47.93.26.159:8421/img/show?path=poker/',//图片路径
		isScore:true,//是否叫分阶段
		isRepair:false,//是否补牌阶段
		isGameing:true,//是否游戏阶段
		isThrowPoder:false,//贴牌
		grade: [],//叫的分数
		boards: [],//玩家的牌
		count:1,//第几个操作的玩家
		maxGrade:80,//当前叫的最大的分数，默认80
		
		num:0,//副家获得的分数
		isMasterPlayer:false,//是否为主家
		masterBoard:-1,//主牌
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
		/**
		 * 初始化全局参数，用于玩家退出房间
		 * @param {Object} state
		 */
		INIT_PARAMS(state){
			//---- 初始化
			state.isScore = true;//是否叫分阶段
			state.isRepair = false;//是否补牌阶段
			state.isThrowPoder = false;//贴牌
			state.isGameing = true;//是否游戏阶段
			state.grade = [];
			state.count = 1;
			state.maxGrade = 80;//当前叫的最大的分数，默认80
			
			state.num = 0;
			state.isMasterPlayer = false;
			state.masterBoard = -1;
		},
		/**
		 * 叫分
		 * @param {Object} state
		 */
		CALL_GRADE(state,msg){
			//更新叫分玩家
			store.commit('UPDATE_GRADE_STATUS',msg.index);
			// //更新叫分玩家最高分数
			// state.maxGrade = msg.maxGrade;
			// //更新玩家的分数
			// var gradeObj = new Object(); 
			// gradeObj.index = (msg.index + 3) % 4;
			// for (var i = 0; i < msg.grade.length; i++) {
			// 	if(msg.grade[i].index == (msg.index + 3) % 4){
			// 		gradeObj.grade = msg.grade[i].grade;
			// 	}
			// }
			// console.info("现在叫分的玩家:"+ msg.index);
			// console.info("上个叫分玩家:"+gradeObj.index+"fenshu:"+gradeObj.grade);
			store.commit('UPDATE_PLAYER_GRADE',msg);
			
			
			
			
			
		},
		
		/**
		 * 初始化玩家手中的牌
		 * @param {Object} state
		 * @param {Object} msg
		 */	
		INIT_PAPER(state,msg){
			let index = msg.index;
			for (var i = 0; i < msg.boards[state.index].length; i++) {
				console.log("自己的牌:" + msg.boards[state.index][i]);
			}
			// alert("dipai"+msg.boards.length);
			state.mySelfPlayer.borders = msg.boards[state.index];
			state.rightPlayer.borders = msg.boards[((state.index)+1)%4];
			state.oppositePlayer.borders = msg.boards[((state.index)+1)%4];
			state.leftPlayer.borders = msg.boards[((state.index)+1)%4];
			state.downBorders = msg.boards[4];
			// alert(index);
			//省略更新玩家所叫的分数，由于是首个叫分，初始化叫分已完成
			//更新叫分玩家
			store.commit('UPDATE_GRADE_STATUS',index);

		},
		/**
		 * 初始化玩家的出牌
		 */
		INIT_PLAYER_OUTBORDSTATUS(state){
			state.mySelfPlayer.isOutBoards = false;
			state.rightPlayer.isOutBoards = false;
			state.oppositePlayer.isOutBoards = false;
			state.leftPlayer.isOutBoards = false;
		},
		
		/**
		 * 更新玩家叫的分数
		 * @param {Object} state
		 * @param {Object} grade
		 */
		UPDATE_PLAYER_GRADE(state,msg){
			//更新玩家的分数
			var gradeObj = new Object(); 
			gradeObj.index = (msg.index + 3) % 4;
			for (var i = 0; i < msg.grade.length; i++) {
				if(msg.grade[i].index == (msg.index + 3) % 4){
					gradeObj.grade = msg.grade[i].grade;
				}
			}
			console.info("现在叫分的玩家:"+ msg.index);
			console.info("上个叫分玩家:"+gradeObj.index+"fenshu:"+gradeObj.grade);
			//上个叫分玩家的下标
			switch(gradeObj.index){
				case state.index : state.mySelfPlayer.grade = gradeObj.grade;
					break;
				case (state.index + 3) % 4 :state.leftPlayer.grade = gradeObj.grade;
						// Message.success("请等待玩家:"+state.leftPlayer.uname + "叫分");
					break;
				case (state.index + 2) % 4 :state.oppositePlayer.grade = gradeObj.grade;
						// Message.success("请等待玩家:"+state.oppositePlayer.uname + "叫分");
					break;
				case (state.index + 1) % 4 :state.rightPlayer.grade = gradeObj.grade;
						// Message.success("请等待玩家:"+state.rightPlayer.uname + "叫分");
					break;
			}
			
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
				case state.index:
					state.mySelfPlayer.isGrade = true;
					state.rightPlayer.isGrade = false;
					state.oppositePlayer.isGrade = false;
					state.leftPlayer.isGrade = false;
					state.mySelfPlayer.gradeCss = 'mySelfNum';
					break;
				case (state.index + 1) % 4:
					state.rightPlayer.isGrade = true;
					state.mySelfPlayer.isGrade = false;
					state.oppositePlayer.isGrade = false;
					state.leftPlayer.isGrade = false;
					break;
				case (state.index + 2) % 4:
					state.oppositePlayer.isGrade = true;
					state.mySelfPlayer.isGrade = false;
					state.rightPlayer.isGrade = false;
					state.leftPlayer.isGrade = false;
					break;
				case (state.index + 3) % 4:
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
			console.info("首位叫分玩家:"+msg.index);
			// context.state.players[msg.index].status = 1;
		},
		/**
		 * 更新玩家出的牌
		 * @param {Object} state
		 * @param {Object} msg
		 */
		UPDATE_PLAYER_BOARD(state,msg){
			switch((msg.index + 3) % 4){
				case state.index : state.mySelfPlayer.isOutBoards = true;
						state.mySelfPlayer.grade = msg.boards[(msg.count - 2) * 2 + 1][0];
					break;
				case (state.index + 1) % 4: state.rightPlayer.isOutBoards = true;
						state.rightPlayer.grade = msg.boards[(msg.count - 2) * 2 + 1][0];
					break;
				case (state.index + 2) % 4 : state.oppositePlayer.isOutBoards = true;
						state.oppositePlayer.grade = msg.boards[(msg.count - 2) * 2 + 1][0];
					break;
				case (state.index + 3) % 4 : state.leftPlayer.isOutBoards = true;
						state.leftPlayer.grade = msg.boards[(msg.count - 2) * 2 + 1][0];
			}
		},
		/**
		 * 更新最后一个玩家出的牌
		 */
		UPDATE_LASTPLAYER_BOARD(state,msg){
			switch(msg.boards[7][1]){
				case state.index : state.mySelfPlayer.isOutBoards = true;
						state.mySelfPlayer.grade = msg.boards[7][0];
					break;
				case (state.index + 1) % 4: state.rightPlayer.isOutBoards = true;
						state.rightPlayer.grade = msg.boards[7][0];
					break;
				case (state.index + 2) % 4 : state.oppositePlayer.isOutBoards = true;
						state.oppositePlayer.grade = msg.boards[7][0];
					break;
				case (state.index + 3) % 4 : state.leftPlayer.isOutBoards = true;
						state.leftPlayer.grade = msg.boards[7][0];
			}
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
			console.info("自己的下标:"+ players[myselfIndex].index);
			console.info("自己之前的下标:"+ state.index);
			//自己的信息
			let myObj = new Object();
				myObj.master = players[myselfIndex].master;
				myObj.username = players[myselfIndex].username;
				myObj.uname = players[myselfIndex].uname;
				myObj.uface = players[myselfIndex].uface;
				myObj.friends = players[myselfIndex].friends;
				myObj.status = players[myselfIndex].status;
				myObj.index = players[myselfIndex].index;
				myObj.on = false;//是否出牌
				myObj.isGrade = false;//是否叫分
				myObj.isRepair = false;//是否获得底牌
				myObj.grade = '等待其他玩家叫分';//玩家叫的分数
				myObj.gradeCss = 'waitGrade';//waitGrade  mySelfNum
				myObj.borders = [];
				myObj.isOutBoards = false;//玩家是否已出牌
				
			state.mySelfPlayer = myObj;
			console.info("更新自己成功");
			
			//对家的信息
			let oppositeObj = new Object();
				oppositeObj.master = players[oppositeIndex].master;
				oppositeObj.username = players[oppositeIndex].username;
				oppositeObj.uname = players[oppositeIndex].uname;
				oppositeObj.uface = players[oppositeIndex].uface;
				oppositeObj.status = players[oppositeIndex].status;
				oppositeObj.index = players[oppositeIndex].index;
				oppositeObj.on = false;//是否出牌
				oppositeObj.isRepair = false;//是否获得底牌
				oppositeObj.isGrade = false;//是否叫分
				oppositeObj.grade = '';//玩家叫的分数
				oppositeObj.borders = [];
				oppositeObj.isOutBoards = false;//玩家是否已出牌
				
			state.oppositePlayer = oppositeObj;
			console.info("更新对家成功");
			
			//左边玩家信息
			let leftObj = new Object();
				leftObj.master = players[leftIndex].master;
				leftObj.username = players[leftIndex].username;
				leftObj.uname = players[leftIndex].uname;
				leftObj.uface = players[leftIndex].uface;
				leftObj.status = players[leftIndex].status;
				leftObj.index = players[leftIndex].index;
				leftObj.on = false;//是否出牌
				leftObj.isRepair = false;//是否获得底牌
				leftObj.isGrade = false;//是否叫分
				leftObj.grade = '';//玩家叫的分数
				leftObj.borders = [];
				leftObj.isOutBoards = false;//玩家是否已出牌
				
			state.leftPlayer = leftObj;
			console.info("更新左边成功");
			
			//右边玩家信息
			let rightObj = new Object();
				rightObj.master = players[rightIndex].master;
				rightObj.username = players[rightIndex].username;
				rightObj.uname = players[rightIndex].uname;
				rightObj.uface = players[rightIndex].uface;
				rightObj.status = players[rightIndex].status;
				rightObj.index = players[rightIndex].index;
				rightObj.on = false;//是否出牌
				rightObj.isRepair = false;//是否获得底牌
				rightObj.isGrade = false;//是否叫分
				rightObj.grade = '';//玩家叫的分数
				rightObj.borders = [];
				rightObj.isOutBoards = false;//玩家是否已出牌
			
			state.rightPlayer = rightObj;
			console.info("更新右边成功");
		},
		/**
		 * 显示提示信息
		 * @param {Object} state
		 * @param {Object} textObj index 操作玩家下标 text 操作内容
		 */
		SHOW_HINT(state,textObj){
			switch(textObj.index){
				case state.index : Message.success("请您" + textObj.text);
					break;
				case (state.index + 3) % 4 :Message.success("请等待玩家:"+state.leftPlayer.uname + textObj.text);
					break;
				case (state.index + 2) % 4 :
						Message.success("请等待玩家:"+state.oppositePlayer.uname + textObj.text);
					break;
				case (state.index + 1) % 4 :
						Message.success("请等待玩家:"+state.rightPlayer.uname + textObj.text);
					break;
			}
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
				// setInterval(function(){
					
				// 	context.commit('UPDATE_LASTPLAYER_BOARD',1);
				// },5000)
				console.info("type:"+msg.type + "username" + msg.username);
				// if(msg.type == 10){
				// 	alert("接收到服务端发送得消息");
				// 	context.state.test = msg.username;
				// }
				// alert(context.state.isRepair);
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
						//---- 初始化
						context.commit('INIT_PARAMS');
						//----
						
						//关闭连接
						if(context.state.stomp_room != null){
							// context.state.subscript.unsubscribe();
							context.state.stomp_room.disconnect();
							context.state.stomp_room = null;
						}
						// context.state.subscript.unsubscribe();
						console.info("退出成功");
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
					//显示提示信息
					let textObj = new Object();
					textObj.index = msg.index;
					textObj.text = "叫分";
					context.commit('SHOW_HINT',textObj);
				}
				/**
				 * 叫分
				 */
				if(msg.type == 12){
					context.commit('CALL_GRADE',msg);
					context.state.count++;
					
					context.state.grade = msg.grade;
					context.state.maxGrade = msg.maxGrade;
					//显示提示信息
					let textObj = new Object();
					textObj.index = msg.index;
					textObj.text = "叫分";
					context.commit('SHOW_HINT',textObj);
				}
				/**
				 * 叫分完毕
				 */
				if(msg.type == 13){
					context.state.isScore = false;
					context.state.isRepair = true;
					context.state.maxGrade = msg.maxGrade;
					if(context.state.index == msg.index){
						context.state.mySelfPlayer.isRepair = true;
					}
					/**
					 * 设置主家
					 */
					if(context.state.index == msg.index || context.state.index == (msg.index + 2) % 4){
						context.state.isMasterPlayer = true;
					}
						
					
					//显示提示信息
					let textObj = new Object();
					textObj.index = msg.index;
					textObj.text = "补牌";
					context.commit('SHOW_HINT',textObj);
					
				}
				/**
				 * 补底牌
				 */
				if(msg.type == 11){
					if(msg.index == context.state.index){
						context.state.mySelfPlayer.borders = msg.boards[0];
						context.state.isThrowPoder = true;
					}
				}
				/**
				 * 补牌玩家准备
				 */
				if(msg.type == 14){
					context.state.isRepair = false;
					// alert("fanhuichenggon");
					if(msg.index == context.state.index){
					// alert("fanhuichenggon");
						context.state.mySelfPlayer.borders = msg.boards[0];
						context.state.mySelfPlayer.on = true;
						context.state.isThrowPoder = false;
						//第一个出牌的玩家
						context.state.count = 1;
						//初始化玩家出的牌
						context.state.boards = [];
					}
					//显示提示信息
					let textObj = new Object();
					textObj.index = msg.index;
					textObj.text = "出牌";
					context.commit('SHOW_HINT',textObj);
				}
				//出牌 设置下一个出牌玩家
				if(msg.type == 15){
					//更新主牌
					if(context.state.masterBoard == -1){
						let masterBoard = msg.masterBoard;
						context.state.masterBoard = masterBoard;
					}
					//更新出牌信息
					context.state.boards = msg.boards;
					//更新第几个出牌信息
					context.state.count = msg.count;
					//更新下一个出牌玩家
					//更新上一个出牌玩家手中剩余牌数
					if(context.state.index == msg.boards[((msg.count) - 2) * 2 + 1][1]){
						context.state.mySelfPlayer.borders = msg.boards[((msg.count) - 2) * 2];
						context.state.mySelfPlayer.on = false;
					}
					if(context.state.index == msg.index){
						context.state.mySelfPlayer.on = true;
					}
					context.commit('UPDATE_PLAYER_BOARD',msg);
					//显示提示信息
					let textObj = new Object();
					textObj.index = msg.index;
					textObj.text = "出牌";
					context.commit('SHOW_HINT',textObj);
				}
				/**
				 * 一轮结束，准备下一轮
				 */
				if(msg.type == 16){
					//更新出牌信息
					context.state.boards = msg.boards;
					//更新上一个出牌玩家手中剩余牌数
					if(context.state.index == msg.boards[7][1]){
						context.state.mySelfPlayer.borders = msg.boards[6];
						context.state.mySelfPlayer.on = false;
					}
					context.state.num = context.state.num + msg.num; 
					context.commit('UPDATE_LASTPLAYER_BOARD',msg);
					
					setTimeout(function(){
						//显示提示信息
						let textObj = new Object();
						textObj.index = msg.index;
						textObj.text = "大了";
						context.commit('SHOW_HINT',textObj);
						context.state.boards = [];
						//更新第几个出牌信息
						context.state.count = 1;
						//初始化玩家已经出了的牌
						context.commit('INIT_PLAYER_OUTBORDSTATUS');
						//更新下一个出牌玩家
						if(context.state.index == msg.index){
							context.state.mySelfPlayer.on = true;
						}
					},3000)
					

				}
				
			});
			}, failedMsg=> {
				Message.error("加入失败，请稍后重新尝试!");
			});
		},
		close_connect_room(context){//关闭连接
			if(context.state.stomp_room != null){
				//关闭连接
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