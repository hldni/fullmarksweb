<template>
	<div id="main">
		<div id="head">
			<v-row>
				<!-- <v-container  > -->
				<v-col cols="2" offset="1">
					<v-row no-gutters>
						<v-col cols="4">
							<!-- <div id="img"> -->
								<img src="../../assets/logo.png" class="headImg" />
							<!-- </div> -->
						</v-col>
						<v-col cols="8">
							<div>&nbsp;</div>
							<div >
								{{user.username}}
							</div>
			<!-- 				<div @click="test">
								等级
							</div>
							<div @click="updataFace">
								修改头像
							</div> -->
						</v-col>
					</v-row>
				</v-col>
			<v-col  cols="8">
				<Money></Money>
			</v-col>
				<v-col cols="1">
					<v-btn @click="quit" color="rgb(50,183,213)">退出</v-btn>
				</v-col>
				</v-col>
				<!-- </v-container> -->
			</v-row>
		</div>
		<div id="body">
			<v-row>
				<v-col cols="1">
					<!-- 好友 -->
					<friend ref="friend"></friend>
				</v-col>

				<v-col cols="10">
					<router-view/>
				</v-col>
				
				<v-col cols="1">
					<!-- 暂时只有签到 -->
					<singin ref="singin"></singin>
				</v-col>
			</v-row>
		</div>
		<div id="bottom" cols="12">
			<v-bottom-navigation v-model="bottomNav" dark shift>
				<v-btn>
					<span>游戏</span>
					<v-icon>mdi-television-play</v-icon>
				</v-btn>
				<!-- 设置 -->
				<setting ref="setting" @updateBottomNav="updateBottomNav"></setting>
				<!-- 商城 -->
				<shop ref="shop" @updateBottomNav="updateBottomNav"></shop>
				<!-- 背包 -->
				<backpacker ref="backpacker" @updateBottomNav="updateBottomNav"></backpacker>
				<!-- 历史战绩 -->
				<historicalRecord ref="historicalRecord" @updateBottomNav="updateBottomNav"></historicalRecord>
				
			</v-bottom-navigation>
			<div cols="12" class="black"><span class="foot">@hgf 备案号:<a style="color: white; text-decoration:none;" href="http://www.beian.miit.gov.cn/">陇ICP备19004163号</a></span></div>
		</div>
	</div>
</template>

<script>
	// 签到
	import singin from '../../components/games/SingIn.vue';
	import friend from '../../components/games/Friend.vue';
	// 设置
	import setting from '../../components/hurdle/Setting.vue';
	// 背包
	import backpacker from '../../components/hurdle/Backpacker.vue';
	// 历史战绩
	import historicalRecord from '../../components/hurdle/HistoricalRecord.vue';
	import shop from '../../components/hurdle/Shop.vue';
	// 金币钻石
	import Money from '../../components/head/money.vue'
	export default {
		components: {
			singin,
			friend,
			setting,
			backpacker,
			historicalRecord,
			shop, 	
			Money, 
		},
		data() {
			return {
				alignmentsAvailable: [
					'start',
					'center',
					'end',
					'baseline',
					'stretch',
				],
				alignment: 'start',
				dense: false,
				justifyAvailable: [
					'start',
					'center',
					'end',
					'space-around',
					'space-between',
				],
				justify: 'center',
				bottomNav: 0,
				user : JSON.parse(window.sessionStorage.getItem("user"))
				
			}
		},
		methods:{
			updateBottomNav(){
				this.bottomNav = 0;
				// alert(1);
			},
			quit(){
				this.getRequest("/user/logout").then(s => {
					if(s.status == 200 && s.msg == 'session清除成功!'){
						this.getRequest("/quit").then(s => {
							this.$message.success(s.msg);
							window.sessionStorage.removeItem("user");
							this.$router.push("/");
						})
					}
					// window.sessionStorage.removeItem("user");
					// this.$router.push("/");
				});
			},
			test(){
				
				// this.getRequest("/quifdsft", this.user).then(s => {});
			},
			updataFace(){
				this.$router.push("/updateData");
			}
		},
		created() {
			/**
			 * 更新玩家金币
			 */
			this.$store.commit("UPDATE_GOLD",this.user.ugold);
		},
		computed: {
			color() {
				switch (this.bottomNav) {
					case 0:
						return 'blue-grey'
					case 1:
						return 'teal'
					case 2:
						return 'brown'
					case 3:
						return 'indigo'
				}
			},
		},
	}
</script>

<style>
	#main {
		width: 100%;
		height: 100%;
		background-image: url(../../assets/background.jpg);
	}

	#head {
		float: left;
		/* background-color: #ACE0F9; */
		width: 100%;
		height: 75px;
	}

	#body {
		width: 100%;
		height: 100%;
		/* background-color: 	#B0C4DE; */
		
		background-image: url(../../assets/background.jpg);
	}

	#bottom {
		/* float: left; */
		margin-bottom: 0;
		bottom: 0;
		position: absolute;
		/* background-color: chartreuse; */
		width: 100%;
		height: 80px;
	}
	.headImg{
		width: 60px;
		height: 60px;
	}
	#black{
		width: 200px;
		background-color: black;
	}
	.room{
		margin-left: 30%;
		margin-top: 10%;
		height: 250px;
		width: 250px;
		text-align: center;
		font-size:20px;
	}
/* 	.friend{
		height: 450px;
		margin-left: 10px;
		text-align: center;
	} */
	
	.foot{
		width: 100%;  
		background-color: #322222; 
		float: right;
		color: white;
	}
	.friend{
		padding: 10px;
		font-size: 25px;
		text-shadow: 5px 5px 5px black, 0px 0px 2px black; 
		color: white;	
	}
	.signIn{
		font-size: 25px;
        text-shadow: 5px 5px 5px black, 0px 0px 2px black; 
        color: #8A2BE2;		
	}
/* 	img {
		height: 100%;
		bottom: 91%;
	} */

/* 	#img {
		background-color: #7FFF00;
		line-height: 0;
		position: absolute;
		bottom: 90%;
		top: 0;
	} */
</style>
