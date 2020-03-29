<template>
	<div class="root">
		<v-btn depressed @click="back" class="back">返回</v-btn>
		<v-row>
			<v-col cols="4">
				<v-card :color="roomColor" class="room" @click="perpare">房间1
					<v-icon>lock</v-icon>
					<v-row>
						<v-col offset=1 cols=5>
							<v-card>
								<img src="../../assets/logo.png" class="head"/>
								<span style="size: 8px;">{{name}}</span>
							</v-card>
						</v-col>
						<v-col cols=5>
							<v-card>
								<img src="../../assets/waitplay.png" class="headNull"/>
							</v-card>
						</v-col>
					</v-row>
					<v-row>
						<v-col offset=1 cols=5>
							<v-card>
								<img src="../../assets/waitplay.png" class="headNull"/>
							</v-card>
						</v-col>
						<v-col cols=5>
							<v-card>
								<img src="../../assets/waitplay.png" class="headNull"/>
							</v-card>
						</v-col>
					</v-row>
				</v-card>
				<!-- <div style="background-color: #DAA520;" class="room"><p>&nbsp;</ p><p>&nbsp;</p>初级模式</div> -->
			</v-col>
			<v-col cols="4">
				<v-card :color="roomColor" class="room">房间2
					<v-icon>lock</v-icon>
					<v-row style="height: 100px;">
						<v-col offset=1 cols=5>
							<v-card>
								<img src="../../assets/logo.png" class="head"/>
								<span style="size: 10px;">{{name}}</span>
							</v-card>
						</v-col>
						<v-col cols=5>
							<v-card>
								<img src="../../assets/logo.png" class="head"/>
								<span style="size: 10px;">{{name}}</span>
							</v-card>
						</v-col>
					</v-row>
					<v-row  style="height: 100px;">
						<v-col offset=1 cols=5>
							<v-card>
								<img src="../../assets/logo.png" class="head"/>
								<span style="size: 10px;">{{name}}</span>
							</v-card>
						</v-col>
						<v-col cols=5>
							<v-card>
								<img src="../../assets/logo.png" class="head"/>
								<span style="size: 10px;">{{name}}</span>
							</v-card>
						</v-col>
					</v-row>
				</v-card>
			</v-col>
			<v-col cols="4">
				<v-card :color="roomColor" class="room">房间3
					
					<v-row>
						<v-col offset=1 cols=5>
							<v-card>
								<img src="../../assets/waitplay.png" class="headNull"/>
							</v-card>
						</v-col>
						<v-col cols=5>
							<v-card>
								<img src="../../assets/waitplay.png" class="headNull"/>
							</v-card>
						</v-col>
					</v-row>
					<v-row>
						<v-col offset=1 cols=5>
							<v-card>
								<img src="../../assets/waitplay.png" class="headNull"/>
							</v-card>
						</v-col>
						<v-col cols=5>
							<v-card>
								<img src="../../assets/waitplay.png" class="headNull"/>
							</v-card>
						</v-col>
					</v-row>
				</v-card>
			</v-col>
		</v-row>
		<v-row>
			<v-col cols="4">
				<v-card :color="roomColor" class="room">房间1
					<v-icon>lock</v-icon>
					<v-row>
						<v-col offset=1 cols=5>
							<v-card>
								<img src="../../assets/logo.png" class="head"/>
								<span style="size: 8px;">{{name}}</span>
							</v-card>
						</v-col>
						<v-col cols=5>
							<v-card>
								<img src="../../assets/waitplay.png" class="headNull"/>
							</v-card>
						</v-col>
					</v-row>
					<v-row>
						<v-col offset=1 cols=5>
							<v-card>
								<img src="../../assets/waitplay.png" class="headNull"/>
							</v-card>
						</v-col>
						<v-col cols=5>
							<v-card>
								<img src="../../assets/waitplay.png" class="headNull"/>
							</v-card>
						</v-col>
					</v-row>
				</v-card>
				<!-- <div style="background-color: #DAA520;" class="room"><p>&nbsp;</ p><p>&nbsp;</p>初级模式</div> -->
			</v-col>
			<v-col cols="4">
				<v-card :color="roomColor" class="room">房间2
					<v-icon>lock</v-icon>
					<v-row style="height: 100px;">
						<v-col offset=1 cols=5>
							<v-card>
								<img src="../../assets/logo.png" class="head"/>
								<span style="size: 10px;">{{name}}</span>
							</v-card>
						</v-col>
						<v-col cols=5>
							<v-card>
								<img src="../../assets/logo.png" class="head"/>
								<span style="size: 10px;">{{name}}</span>
							</v-card>
						</v-col>
					</v-row>
					<v-row  style="height: 100px;">
						<v-col offset=1 cols=5>
							<v-card>
								<img src="../../assets/logo.png" class="head"/>
								<span style="size: 10px;">{{name}}</span>
							</v-card>
						</v-col>
						<v-col cols=5>
							<v-card>
								<img src="../../assets/logo.png" class="head"/>
								<span style="size: 10px;">{{name}}</span>
							</v-card>
						</v-col>
					</v-row>
				</v-card>
			</v-col>
			<v-col cols="4">
				<v-card :color="roomColor" class="room">房间3
					
					<v-row>
						<v-col offset=1 cols=5>
							<v-card>
								<img src="../../assets/waitplay.png" class="headNull"/>
							</v-card>
						</v-col>
						<v-col cols=5>
							<v-card>
								<img src="../../assets/waitplay.png" class="headNull"/>
							</v-card>
						</v-col>
					</v-row>
					<v-row>
						<v-col offset=1 cols=5>
							<v-card>
								<img src="../../assets/waitplay.png" class="headNull"/>
							</v-card>
						</v-col>
						<v-col cols=5>
							<v-card>
								<img src="../../assets/waitplay.png" class="headNull"/>
							</v-card>
						</v-col>
					</v-row>
				</v-card>
			</v-col>
		</v-row>
		<v-row>
			<v-col cols="4">
				<v-card :color="roomColor" class="room">房间1
					<v-icon>lock</v-icon>
					<v-row>
						<v-col offset=1 cols=5>
							<v-card>
								<img src="../../assets/logo.png" class="head"/>
								<span style="size: 8px;">{{name}}</span>
							</v-card>
						</v-col>
						<v-col cols=5>
							<v-card>
								<img src="../../assets/waitplay.png" class="headNull"/>
							</v-card>
						</v-col>
					</v-row>
					<v-row>
						<v-col offset=1 cols=5>
							<v-card>
								<img src="../../assets/waitplay.png" class="headNull"/>
							</v-card>
						</v-col>
						<v-col cols=5>
							<v-card>
								<img src="../../assets/waitplay.png" class="headNull"/>
							</v-card>
						</v-col>
					</v-row>
				</v-card>
				<!-- <div style="background-color: #DAA520;" class="room"><p>&nbsp;</ p><p>&nbsp;</p>初级模式</div> -->
			</v-col>
			<v-col cols="4">
				<v-card :color="roomColor" class="room">房间2
					<v-icon>lock</v-icon>
					<v-row style="height: 100px;">
						<v-col offset=1 cols=5>
							<v-card>
								<img src="../../assets/logo.png" class="head"/>
								<span style="size: 10px;">{{name}}</span>
							</v-card>
						</v-col>
						<v-col cols=5>
							<v-card>
								<img src="../../assets/logo.png" class="head"/>
								<span style="size: 10px;">{{name}}</span>
							</v-card>
						</v-col>
					</v-row>
					<v-row  style="height: 100px;">
						<v-col offset=1 cols=5>
							<v-card>
								<img src="../../assets/logo.png" class="head"/>
								<span style="size: 10px;">{{name}}</span>
							</v-card>
						</v-col>
						<v-col cols=5>
							<v-card>
								<img src="../../assets/logo.png" class="head"/>
								<span style="size: 10px;">{{name}}</span>
							</v-card>
						</v-col>
					</v-row>
				</v-card>
			</v-col>
			<v-col cols="4">
				<v-card :color="roomColor" class="room">房间3
					
					<v-row>
						<v-col offset=1 cols=5>
							<v-card>
								<img src="../../assets/waitplay.png" class="headNull"/>
							</v-card>
						</v-col>
						<v-col cols=5>
							<v-card>
								<img src="../../assets/waitplay.png" class="headNull"/>
							</v-card>
						</v-col>
					</v-row>
					<v-row>
						<v-col offset=1 cols=5>
							<v-card>
								<img src="../../assets/waitplay.png" class="headNull"/>
							</v-card>
						</v-col>
						<v-col cols=5>
							<v-card>
								<img src="../../assets/waitplay.png" class="headNull"/>
							</v-card>
						</v-col>
					</v-row>
				</v-card>
			</v-col>
		</v-row>
	</div>
</template>

<script>	
	export default {
		data() {
			return {
				roomColor:'#DAA520',
				name:'张三'
			}
		},
		methods:{
			back(){
				this.$router.push("/main");
			},
			perpare(){
				this.$router.push("/game");
			}
		}
	}
</script>

<style>
	.root{
		/* max-height: 560px; */
		overflow-x: hidden;
	}
	.back{
		position: absolute;
		margin-top: 0px;
	}
	.room{
		width: 230px;
		height: 230px;
	}
	.lock{
		position:absolute;
		float: right;
		width: 50px;
		height: 50px;
	}
	.head{
		width: 40px;
		height: 40px;
	}
	.headNull{
		width: 80px;
		height: 70px;
	}
</style>
