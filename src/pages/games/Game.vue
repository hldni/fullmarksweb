<template>
	<div class="game">
		<div id="head">
			<v-row>
				<v-col cols="2">
					<v-row no-gutters>
						<v-col cols="3" offset=3>
							<v-btn @click="back">
								退出
							</v-btn>
						</v-col>
						<v-col cols="4" offset=1>
							<v-btn>
								声音
							</v-btn>
						</v-col>
					</v-row>
				</v-col>
				<v-col cols="1" offset="6">
					<div style="background-color: #8A2BE2;">钻石</div>
				</v-col>
				<v-col cols="1">
					<div style="background-color: #FFF1EB;">钻石</div>
				</v-col>
				<v-col cols="1"></v-col>
			</v-row>
		</div>
		<div id="body">
			<!-- 对家 -->
			<div class="gameOpposite">
				<div class="oppositeImg">
					<img :src="oppositePlayer.uface" width="70" height="70" />
					&nbsp;{{oppositePlayer.uname}}
				</div>
				<div>
					
					<v-card class="oppositeState" v-if="oppositePlayer.status == 0" color="#CC0033" width="220" height="50" outlined>
						<v-card-text>
							<span style="font-size: 18px;color: white;">
								未准备
							</span>
						</v-card-text>
					</v-card>
					<v-card class="oppositeState" v-if="oppositePlayer.status == 1" color="#556B2F" width="220" height="50" outlined>
						<v-card-text>
							<span style="font-size: 18px;color: white;">
								已准备
							</span>
						</v-card-text>
					</v-card>
					<v-card class="oppositeState" v-if="oppositePlayer.status == 2" color="#008000" width="220" height="50" @click="begin">
						<v-card-text>
							<span style="font-size: 18px;color: white;">
								等待开始游戏
							</span>
						</v-card-text>
					</v-card>
					<v-card class="oppositeState" v-if="oppositePlayer.status == 4" color="#808080" width="220" height="50" @click="begin">
						<v-card-text>
							<span style="font-size: 18px;color: white;">
								等待玩家加入
							</span>
						</v-card-text>
					</v-card>
					
				</div>
			</div>
			<!-- 临家 -->
			<div class="gameLimb">
				<div class="leftPlayer">
					<img :src="leftPlayer.uface" width="70" height="70" /><br>
					&nbsp;{{leftPlayer.uname}}
				</div>
				
				<v-card class="leftPlayerState" v-if="leftPlayer.status == 0" color="#CC0033" width="100" height="100" outlined>
					<v-card-text>
						<span style="font-size: 18px;color: white;">
							<br/>
							未准备
						</span>
					</v-card-text>
				</v-card>
				<v-card class="leftPlayerState" v-if="leftPlayer.status == 1" color="#556B2F" width="100" height="100" outlined>
					<v-card-text>
						<span style="font-size: 18px;margin-top: 10px; color: white">
							<br/>
							已准备
						</span>
					</v-card-text>
				</v-card>
				<v-card class="leftPlayerState" v-if="leftPlayer.status == 2" color="#008000" width="100" height="100" @click="begin">
					<v-card-text>
						<span style="font-size: 18px;color: white;">
							等待<br/>开始<br/>游戏
						</span>
					</v-card-text>
				</v-card>
				<v-card class="leftPlayerState" v-if="leftPlayer.status == 4" color="#808080" width="100" height="100" @click="begin">
					<v-card-text>
						<span style="font-size: 18px;color: white;">
							等待<br/>玩家<br/>加入
						</span>
					</v-card-text>
				</v-card>
				
				
				<div class="rightPlayer">
					<img :src="rightPlayer.uface" width="70" height="70" /><br>
					&nbsp;{{rightPlayer.uname}}
				</div>

				<v-card class="rightPlayerState" v-if="rightPlayer.status == 0" color="#CC0033" width="100" height="100" outlined>
					<v-card-text>
						<span style="font-size: 18px;color: white;">
							<br />
							未准备
						</span>
					</v-card-text>
				</v-card>
				<v-card class="rightPlayerState" v-if="rightPlayer.status == 1" color="#556B2F" width="100" height="100" outlined>
					<v-card-text>
						<span style="font-size: 18px;color: white;">
							<br>
							已准备
						</span>
					</v-card-text>
				</v-card>
				<v-card class="rightPlayerState" v-if="rightPlayer.status == 2" color="#008000" width="100" height="100" @click="begin">
					<v-card-text>
						<span style="font-size: 18px;color: white;">
							等待<br/>开始<br/>游戏
						</span>
					</v-card-text>
				</v-card>
				<v-card class="rightPlayerState" v-if="rightPlayer.status == 4" color="#808080" width="100" height="100">
					<v-card-text>
						<span style="font-size: 18px;color: white;">
							等待<br/>玩家<br/>加入
						</span>
					</v-card-text>
				</v-card>
				
				
				
			</div>
			<!-- 自己 -->
			<div class="gameMySelf">
				<div>
					<v-bottom-sheet v-model="inviteFriends" inset><!-- 此处留有问题，由于上边使用了v-for,应该解决 -->
						<template v-slot:activator="{ on }">
							<v-btn class="myselfInvite" large color="primary" width=120 v-on="on">
								邀请好友aa
							</v-btn>
						</template>
						<v-sheet style="overflow-y:auto;" class="text-center" height="300px" width="300px">
							<v-btn class="mt-6" text color="error" @click="inviteFriends = !inviteFriends">关闭</v-btn>
							<v-list>
								<v-list-item v-for="(friend, index) in friends" :key="index">
									<v-list-item-title>
										<v-row>
											<v-col cols="7" offset="1">
												<div class="my-3">{{ friend.name }}</div>
											</v-col>
											<v-col cols="3">
												<v-btn color="warning" fab small>
													<v-icon>mdi-account-circle</v-icon>
												</v-btn>
											</v-col>
										</v-row>
									</v-list-item-title>
								</v-list-item>
							</v-list>
						</v-sheet>
					</v-bottom-sheet>
				</div>



				<v-card class="mySelfState" v-if="mySelfPlayer.status == 2" color="#008000" width="220" height="50" @click="begin">
					<v-card-text>
						<span style="font-size: 18px;color: white;">
							开始游戏
						</span>
					</v-card-text>
				</v-card>
				<v-card class="mySelfState" v-if="mySelfPlayer.status == 0" color="#CC0033" width="220" height="50" outlined @click="changeStatus(0)">
					<v-card-text>
						<span style="font-size: 18px;color: white;">
							未准备
						</span>
					</v-card-text>
				</v-card>
				<v-card class="mySelfState" v-if="mySelfPlayer.status == 1" color="#556B2F" width="220" height="50" outlined  @click="changeStatus(1)">
					<v-card-text>
						<span style="font-size: 18px;color: white;">
							已准备
						</span>
					</v-card-text>
				</v-card>
				
				
				
				<div class="mySelfImg">
					<img :src="mySelfPlayer.uface" style="margin: 10px;" width="70" height="70" />
					<span class="myName">&nbsp;{{mySelfPlayer.uname}}</span>
				</div>
				
				<div>
					
					<v-bottom-sheet v-model="chatFriends" inset hide-overlay>
						<template v-slot:activator="{ on }">
							<v-btn class="myselfChat" large color="primary" width=120 v-on="on">
								聊天
							</v-btn>
						</template>
						<v-sheet style="overflow-y:auto; float: right;" class="text-center" height="300px" width="300px">
							<v-btn class="mt-6" text color="error" @click="chatFriends = !chatFriends">关闭</v-btn>
							<v-list>
								<v-list-item v-for="(friend, index) in friends" :key="index">
									<v-list-item-title>
										<v-row>
											<v-col cols="7" offset="1">
												<div class="my-3">{{ friend.name }}</div>
											</v-col>
											<v-col cols="3">
												<v-btn color="warning" fab small @click="sendToFriend()">
													<v-icon>mdi-message-text</v-icon>
												</v-btn>
											</v-col>
										</v-row>
									</v-list-item-title>
								</v-list-item>
							</v-list>
						</v-sheet>
					</v-bottom-sheet>
					
					
					<!-- <v-btn class="myselfChat" large color="primary" width=120>
						聊天
					</v-btn> -->
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		data() {
			return {
				user : JSON.parse(window.sessionStorage.getItem("user")),//当前用户
				isInit:true,
				mySelfPlayer:{
					isMaster:true,//房主
					username:'dddddddd',//用户名
					uname:'张三',//昵称
					uface:'img/waitplay.5e1581e1.png',//头像
					friends:[
						{
							isConnect:'no',//在线状态  no不在线 yes在线 not勿扰
							username:'li',//用户名
							uname:'李四',//
						}
					],//好友
					status:2,//准备状态 0 未准备 1 已准备 2开始游戏 3等待房主开始游戏
				},
				oppositePlayer:{
					isMaster:false,//房主
					username:'dfsf',//用户名
					uname:'张三对面',//昵称
					uface:'img/waitplay.5e1581e1.png',//头像
					status:0,//准备状态 0 未准备 1 已准备 2开始游戏 3等待房主开始游戏
				},
				leftPlayer:{
					isMaster:false,//房主
					username:'dsfdsf',//用户名
					uname:'飘飘左',//昵称
					uface:'img/waitplay.5e1581e1.png',//头像
					status:0,//准备状态 0 未准备 1 已准备 2开始游戏 3等待房主开始游戏
				},
				rightPlayer:{
					isMaster:false,//房主
					username:'dsfdfsfsddsf',//用户名
					uname:'揉揉右',//昵称
					uface:'img/waitplay.5e1581e1.png',//头像
					status:2,//准备状态 0 未准备 1 已准备 2开始游戏 3等待房主开始游戏
				},
				inviteFriends: false,
				chatFriends:false,
				friends: [{
						name: '张三'
					},
					{
						name: '李四'
					},
					{
						name: '王五'
					},
					{
						name: '赵六'
					},
				],
				index:0//当前玩家所在players下标
			}
		},
        computed: mapState([
            'stomp_room',
			'roomId',
			'count',
			'players',
			'roomNum'
        ]),
		methods: {
			back() {
				// 发送推出消息
				let msgObj = new Object();//发送加入房间信息
				msgObj.status = 1;//0 加入房间 1 退出房间
				msgObj.roomId = this.roomId;
				msgObj.username = this.user.username;
				this.stomp_room.send('/ws/sendAllUser/'+this.roomId, {}, JSON.stringify(msgObj));
				//关闭房间socket连接
				// this.$store.dispatch('close_connect_room');
				this.$router.push("/choseRoom");
			},
			begin() {
				this.$router.push("/beginGame")
			},
			sendToFriend(){
				alert(this.count);
			},
			sendMessage(){
				if(this.isInit){
					let msgObj = new Object();//发送加入房间信息
					msgObj.status = 0;//0 加入房间 1 退出房间
					msgObj.roomId = this.roomId;
					msgObj.username = this.user.username;
					this.stomp_room.send('/ws/sendAllUser/'+this.roomId, {}, JSON.stringify(msgObj));
					this.isInit = false;
				}
			},
			changeStatus(type){
				if(type == 0){// 切换到已准备状态
					let msgObj = new Object();//发送加入房间信息
					msgObj.status = 2;//0 加入房间 1 退出房间 2//从准备状态切换到未准备状态
					msgObj.index = this.index;
					this.stomp_room.send('/ws/sendAllUser/'+this.roomId, {}, JSON.stringify(msgObj));
				// alert(1);
				}else if(type == 1){// 切换到未准备状态
					let msgObj = new Object();//发送加入房间信息
					msgObj.status = 3;//0 加入房间 1 退出房间 2//从准备状态切换到未准备状态
					msgObj.index = this.index;
					this.stomp_room.send('/ws/sendAllUser/'+this.roomId, {}, JSON.stringify(msgObj));
					
				}
			}
			// perpare(){
			// 	this.$router.push("/game");
			// }
		},
		created() {
			this.sendMessage();
		},
		watch:{
			players: {
				handler: function() {
					console.info("players:改变了@@@@@@@");
					let myselfIndex = -1;
					for (var i = 0; i < this.players.length; i++) {
						if(this.players[i].uname == this.user.uname){ //是自己
							myselfIndex = i;
							this.index = i;
							break;
						}
					}
					let oppositeIndex = (myselfIndex + 2) % 4;//对家玩家下标
					let leftIndex = (myselfIndex + 3) % 4;//左边玩家下标
					let rightIndex = (myselfIndex + 1) % 4;//右边玩家下标
					
					//自己的信息
					this.mySelfPlayer.isMaster = this.players[myselfIndex].isMaster;
					this.mySelfPlayer.username = this.players[myselfIndex].username;
					this.mySelfPlayer.uname = this.players[myselfIndex].uname;
					this.mySelfPlayer.uface = this.players[myselfIndex].uface;
					this.mySelfPlayer.friends = this.players[myselfIndex].friends;
					this.mySelfPlayer.status = this.players[myselfIndex].status;
					
					//对家的信息
					// if(this.players[oppositeIndex].username == ''){
						this.oppositePlayer.isMaster = this.players[oppositeIndex].isMaster;
						this.oppositePlayer.username = this.players[oppositeIndex].username;
						this.oppositePlayer.uname = this.players[oppositeIndex].uname;
						this.oppositePlayer.uface = this.players[oppositeIndex].uface;
						this.oppositePlayer.status = this.players[oppositeIndex].status;
					// }
					//左边玩家信息
					// if(this.players[leftIndex].username == ''){
						this.leftPlayer.isMaster = this.players[leftIndex].isMaster;
						this.leftPlayer.username = '左边的玩家';
						// this.leftPlayer.username = this.players[leftIndex].username;
						this.leftPlayer.uname = this.players[leftIndex].uname;
						this.leftPlayer.uface = this.players[leftIndex].uface;
						this.leftPlayer.status = this.players[leftIndex].status;
					// }
					
					//右边玩家信息
					// if(this.players[rightIndex].username == ''){
						this.rightPlayer.isMaster = this.players[rightIndex].isMaster;
						this.rightPlayer.username = this.players[rightIndex].username;
						this.rightPlayer.uname = this.players[rightIndex].uname;
						this.rightPlayer.uface = this.players[rightIndex].uface;
						this.rightPlayer.status = this.players[rightIndex].status;
					// }
				}, 
				deep: true
			}
		}
	}
</script>

<style>
	.game {
		width: 100%;
		height: 100%;
	}

	#head {
		float: left;
		background-color: #ACE0F9;
		width: 100%;
		height: 75px;
	}

	#body {
		width: 100%;
		height: 100%;
		background-color: #B0C4DE;
	}

	.gameOpposite {
		height: 30%;
		/* background-color: #67C23A; */
		text-align: center;
	}

	.gameLimb {
		height: 45%;
		/* background-color: #B0C4DE; */
	}

	.leftPlayer {
		position: absolute;
		padding-top: 15px;
		padding-left: 20px;
		height: 100px;
		width: 100px;
		left: 10px;
		top: 45%;
		background-color: #ACE0F9;
	}

	.rightPlayer {
		text-align: right;
		position: absolute;
		padding-top: 15px;
		padding-right: 20px;
		height: 100px;
		width: 100px;
		right: 10px;
		top: 45%;
		background-color: #ACE0F9;
	}

	.gameMySelf {
		height: 25%;
		width: 100%;
		text-align: center;
		/* background-color: #FFCCFF; */
	}

	.oppositeImg {
		margin-left: 40%;
		width: 220px;
		height: 130px;
		padding-top: 80px;
		/* background-color: #B0C4DE; */
	}

	.myselfInvite {
		/* 		position: absolute;
		bottom: 10px;
		margin-left: 10%; */
		position: absolute;
		left: 0px;

	}

	.myselfChat {
		/* 	position: absolute;
		bottom: 10px;
		margin-left: 56%; */
		position: absolute;
		left: 0px;
	}

	.mySelfImg {
		position: absolute;
		bottom: 5px;
		margin-left: 40%;
		width: 220px;
		height: 60px;
		background-color: aqua;
	}

	.myName {
		position: absolute;
		bottom: 15px;
		left: 70px;
	}

	/* 准备装状态 */
	/* 对置为已准备状态 */
	.prepare {
		background-color: burlywood;
	}

	.noPrepare {
		background-color: whitesmoke;
	}

	.begin {
		background-color: #67C23A;
	}

	.oppositeState {
		margin-left: 40%;
		margin-top: 10px;
	}

	.leftPlayerState {
		position: absolute;
		left: 135px;
		top: 45%;
		/* padding-top: 10px; */
	}

	.rightPlayerState {
		position: absolute;
		right: 135px;
		top: 45%;
	}

	.blacky {
		background-color: #000000;
	}

	.mySelfState {
		position: absolute;
		left: 40%;
		bottom: 75px;
		background-color: #000000;
	}
</style>
