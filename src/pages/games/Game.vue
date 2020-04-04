<template>
	<div class="game">
		<div id="head">
			<v-row>
				<v-col cols="2">
					<v-row no-gutters>
						<v-col cols="3" offset=3>
							<v-btn @click="back">
								返回
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
					<img src="../../assets/waitplay.png" width="70" height="70" />
					&nbsp;往事随风
				</div>
				<div>
					<v-card class="oppositeState" color="#556B2F" width="220" height="50" outlined>
						<v-card-text>
							<span style="font-size: 18px;color: white;">
								已准备
							</span>
						</v-card-text>
					</v-card>
				</div>
			</div>
			<!-- 临家 -->
			<div class="gameLimb">
				<div class="leftPlayer">
					<img src="../../assets/waitplay.png" width="70" height="70" /><br>
					&nbsp;飘飘
				</div>
				<v-card class="leftPlayerState" color="#556B2F" width="100" height="100" outlined>
					<v-card-text>
						<span style="font-size: 18px;margin-top: 10px; color: white">
							已准备
						</span>
					</v-card-text>
				</v-card>
				<div class="rightPlayer">
					<img src="../../assets/waitplay.png" width="70" height="70" /><br>
					&nbsp;揉揉
				</div>
				<v-card class="rightPlayerState" color="#CC0033" width="100" height="100" outlined>
					<v-card-text>
						<span style="font-size: 18px;color: white;">
							<br>
							未准备
						</span>
					</v-card-text>
				</v-card>
			</div>
			<!-- 自己 -->
			<div class="gameMySelf">
				<div>
					<v-bottom-sheet v-model="inviteFriends" inset>
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

				<v-card class="mySelfState" color="#008000" width="220" height="50" @click="begin">
					<v-card-text>
						<span style="font-size: 18px;color: white;">
							开始游戏
						</span>
					</v-card-text>
				</v-card>
				<div class="mySelfImg">
					<img src="../../assets/logo.png" style="margin: 10px;" width="70" height="70" />
					<span class="myName">&nbsp;过往云烟</span>
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
												<v-btn color="warning" fab small>
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
	export default {
		data() {
			return {
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
			}
		},
		methods: {
			back() {
				this.$router.push("/choseRoom");
			},
			begin() {
				this.$router.push("/beginGame")
			}
			// perpare(){
			// 	this.$router.push("/game");
			// }
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
		padding-left: 10px;
		height: 100px;
		width: 100px;
		left: 10px;
		top: 45%;
		background-color: #ACE0F9;
	}

	.rightPlayer {
		text-align: right;
		position: absolute;
		padding-right: 10px;
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
		padding-top: 10px;
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
