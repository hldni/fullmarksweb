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
				<!-- </v-container> -->
			</v-row>
		</div>
		<div id="body">
			<!-- 对家 -->
			<div class="opposite">
				<div class="oppositeImg">
					<img src="../../assets/waitplay.png" width="70" height="70" />
					&nbsp;往事随风
				</div>
				<div>
					<v-card style="margin-left: 40%;margin-top: 10px;background-color: burlywood;" width="220" height="50" outlined>
						<v-card-text>
							<span style="font-size: 18px;color: aquamarine;">
								已准备
							</span>
						</v-card-text>
					</v-card>
				</div>
			</div>
			<!-- 临家 -->
			<div class="limb">
				<div class="leftPlayer">
					<img src="../../assets/waitplay.png" width="70" height="70" /><br>
					&nbsp;飘飘
				</div>
				<v-card style="position: absolute;left: 135px;top: 45%;background-color: #67C23A;" width="100" height="100" outlined>
					<v-card-text>
						<span style="font-size: 18px;color: blueviolet">
							等待开始游戏
						</span>
					</v-card-text>
				</v-card>
				<div class="rightPlayer">
					<img src="../../assets/waitplay.png" width="70" height="70" /><br>
					&nbsp;揉揉
				</div>
				<v-card style="position: absolute;right: 135px;top: 45%;background-color: #CC0033;" width="100" height="100" outlined>
					<v-card-text>
						<span style="font-size: 18px;color: whitesmoke;">
							<br>
							未准备
						</span>
					</v-card-text>
				</v-card>
			</div>
			<!-- 自己 -->
			<div class="mySelf">
				<div>
					<v-btn class="myselfInvite" large color="primary" width=120>
						邀请好友a
					</v-btn>
				</div>
				
				<v-card style="position: absolute;left: 40%;bottom: 75px;background-color: burlywood;" width="220" height="50" outlined>
					<v-card-text>
						<span style="font-size: 18px;color: aquamarine;">
							已准备
						</span>
					</v-card-text>
				</v-card>
				<div class="mySelfImg">
					<img src="../../assets/logo.png" style="margin: 10px;" width="70" height="70" />
					<span class="myName">&nbsp;过往云烟</span>
				</div>
				<div>
					<v-btn class="myselfChat" large color="primary" width=120>
						聊天
					</v-btn>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				// roomColor:'#DAA520',
				// name:'张三'
			}
		},
		methods: {
			back() {
				this.$router.push("/choseRoom");
			},
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

	.opposite {
		height: 30%;
		background-color: #67C23A;
		text-align: center;
	}

	.limb {
		height: 45%;
		background-color: #B0C4DE;
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

	.mySelf {
		height: 25%;
		background-color: #FFCCFF;
	}

	.oppositeImg {
		margin-left: 40%;
		width: 220px;
		height: 130px;
		background-color: #B0C4DE;
	}

	.myselfInvite {
		position: absolute;
		bottom: 10px;
		margin-left: 30%;
	}

	.myselfChat {
		position: absolute;
		bottom: 10px;
		margin-left: 56%;
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
</style>
