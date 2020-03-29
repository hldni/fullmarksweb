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
							<div >
								adsadssasddddddd
							</div>
							<div>
								等级
							</div>
						</v-col>
					</v-row>
				</v-col>
				<v-col cols="1"  offset="6">
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
			<v-row>
				<v-col cols="1">
					<v-card color="#98FB98" class="friend">好友</v-card>
				</v-col>

				<v-col cols="10">
					<router-view/>
				</v-col>
				<v-col cols="1">
					<v-card color="#4682B4" class="active">签到</v-card>
				</v-col>
			</v-row>
		</div>
		<div id="bottom" cols="12">
			<v-bottom-navigation v-model="bottomNav" dark shift>
				<v-btn disabled>
				</v-btn>
				<v-btn>
					<span>设置</span>
					<v-icon>mdi-television-play</v-icon>
				</v-btn>

				<v-btn>
					<span>商城</span>
					<v-icon>mdi-book</v-icon>
				</v-btn>
				<v-btn>
					<span>背包</span>
					<v-icon>mdi-book</v-icon>
				</v-btn>

				<v-btn>
					<span>战绩</span>
					<v-icon>mdi-image</v-icon>
				</v-btn>
			</v-bottom-navigation>
			<div cols="12" class="black"><span class="foot">版权所有</span></div>
		</div>
	</div>
</template>

<script>
	export default {
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
			}
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
		background-color: 	#B0C4DE;
	}

	#bottom {
		/* float: left; */
		margin-bottom: 0;
		bottom: 0;
		position: absolute;
		background-color: chartreuse;
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
	.friend{
		height: 450px;
		margin-left: 10px;
		text-align: center;
	}
	.active{
		margin-right: 20px;
		height: 450px;
		text-align: center;
	}
	.foot{
		width: 100%;  
		background-color: #322222; 
		float: right;
		color: white;
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
