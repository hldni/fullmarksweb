<template>
	<div class="root">
		<v-row>
			<v-col cols=1>
				<v-tooltip right color="success">
					<template v-slot:activator="{ on }">
						<v-btn class="mx-2" fab dark color="indigo" v-on="on" @click="back">
							<v-icon dark>arrow_back</v-icon>
						</v-btn>
					</template>
					<span>返回</span>
				</v-tooltip>

			</v-col>
			<v-col cols=1 offset=9>
				<!-- 		<v-tooltip left color="#D2691E">
				  <template v-slot:activator="{ on }">
					<v-btn class="mx-2" fab dark color="#00008B"  v-on="on">
					  <v-icon dark>mdi-plus</v-icon>
					</v-btn>
				  </template>
				  <span>创建房间</span>
				</v-tooltip>
				 -->
				<v-dialog v-model="creatRoom" persistent max-width="290">
					<template v-slot:activator="{ on }">
						<v-tooltip left color="success">
							<template v-slot:activator="{ on }">
								<v-btn class="mx-2" fab dark color="#00008B" v-on="on" @click.stop="creatRoom = true">
									<v-icon dark>mdi-plus</v-icon>
								</v-btn>
							</template>
							<span>创建房间</span>
						</v-tooltip>
					</template>
					<v-card>
						<v-card-title class="headline">创建房间</v-card-title>
						<v-card-text>
							<v-container>
								<v-row>
									<v-col cols="12">
										<v-text-field label="房间名称" v-model="roomName" required></v-text-field>
									</v-col>
									<v-col cols="12">
										<v-radio-group row v-model="isPassword" :mandatory="false">
											<v-radio label="密码房" value="true"></v-radio>
											<v-radio label="普通房" value="false"></v-radio>
										</v-radio-group>
									</v-col>
									<v-col cols="12">
										<v-text-field label="请输入密码,四位数字" :rules="roomPasswordRules" v-model="roomPassword" required v-show="isShowPasssword"></v-text-field>
									</v-col>
								</v-row>
							</v-container>
							<small>*请将以上内容填写完整,如果创建密码房请填写四位数字密码</small>
						</v-card-text>
						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn color="green darken-1" text @click="creatRoom = false">取消</v-btn>
							<v-btn color="green darken-1" text @click="addRoom()">确认</v-btn>
						</v-card-actions>
					</v-card>
				</v-dialog>
			</v-col>
		</v-row>
		<v-row>
			<v-col cols="4" v-for="(room, i) in rooms">
				<v-card :color="roomColor" class="room">
					{{room.houseName}}
					<v-icon v-show="room.houseWay">lock</v-icon>
					<v-row>
						<v-col :offset="index%2 == 0 ? 1:0" cols=5 v-for="(user, index) in room.users">
							<v-card v-if="user.uname != ''">
								<img :src="user.uface" class="head" />
								<span style="size: 8px;">{{user.uname}}</span>
							</v-card>
							<!-- 		<v-card v-if="user.uname == ''"  @click="perpare">
								<img :src="user.uface" class="headNull"/>
							</v-card>
							 -->
							<v-card v-if="user.uname == ''" v-on="on">
								<img :src="user.uface" class="headNull" @click="toRoom" />
							</v-card>
							<!-- 	
							<v-tooltip bottom color="success">
								<template v-slot:activator="{ on }">
									<v-card v-if="user.uname == '' && !room.houseWay"  v-on="on">
										<img :src="user.uface" class="headNull"  @click="toRoom"/>
									</v-card>
								</template>
								<span>点击加入房间:{{room.houseName}}</span>
							</v-tooltip>
						 -->


							<!-- 
							<v-dialog v-model="rooms[i].joinRoom"  max-width="290">
								<template v-slot:activator="{ on }">
									<v-card v-if="user.uname == '' && room.houseWay" v-on="on">
										<img :src="user.uface" class="headNull"/>
									</v-card>
								</template>
								<v-card>
									<v-card-title class="headline">请输入密码</v-card-title>
									<v-text-field v-model="toRoomPassword"  label="请输入房间密码"></v-text-field>
									<v-card-actions>
										<v-btn color="green darken-1" text @click="toRoom(i)">加入</v-btn>
									</v-card-actions>
								</v-card>
							</v-dialog> -->
						</v-col>
					</v-row>
				</v-card>
				
			<!-- 	
				<v-hover>
					<template v-slot:default="{ hover }">
						<v-card class="mx-auto">
							
								<span class="primary--text subtitle-2">64 Reviews</span>
				
							<v-fade-transition>
								<v-overlay v-if="hover" absolute color="#036358">
									<v-btn>点击加入房间</v-btn>
								</v-overlay>
							</v-fade-transition>
						</v-card>
					</template>
				</v-hover> -->
				
				
			</v-col>
		</v-row>


	</div>
</template>

<script>
	export default {
		data() {
			return {
				overlay:false,
				// dialog:'false',
				roomColor: '#DAA520',
				// houseName:'张三',
				creatRoom: false,
				isPassword: 'false', //创建房间是否加密
				isShowPasssword: false,
				roomPassword: '',
				roomName: '',
				roomPasswordRules: [
					v => /^([0-9]{4})*$/.test(v) || '请输入四位数字',
				],
				toRoomPassword: '',
				rooms: [{
						houseName: '房间1',
						hoseId: '232323',
						houseWay: false,
						joinRoom: false,
						users: [{
								user_houseId: '',
								uname: '张三',
								uface: 'img/logo.82b9c7a5.png',
							},
							{
								user_houseId: '',
								uname: '张三',
								uface: 'img/logo.82b9c7a5.png',
							},
							{
								user_houseId: '',
								uname: '张三',
								uface: 'img/logo.82b9c7a5.png',
							},
							{
								user_houseId: '',
								uname: '',
								uface: 'img/waitplay.5e1581e1.png',
							}
						]
					},
					{
						houseName: '房间2',
						hoseId: '232324',
						houseWay: true,
						joinRoom: false,
						users: [{
								user_houseId: '',
								uname: '张三',
								uface: 'img/logo.82b9c7a5.png',
							},
							{
								user_houseId: '',
								uname: '张三',
								uface: 'img/logo.82b9c7a5.png',
							},
							{
								user_houseId: '',
								uname: '张三',
								uface: 'img/logo.82b9c7a5.png',
							},
							{
								user_houseId: '',
								uname: '张三',
								uface: 'img/logo.82b9c7a5.png',
							}
						]
					},
					{
						houseName: '房间3',
						hoseId: '232325',
						houseWay: true,
						joinRoom: false,
						users: [{
								user_houseId: '',
								uname: '张三',
								uface: 'img/logo.82b9c7a5.png',
							},
							{
								user_houseId: '',
								uname: '张三',
								uface: 'img/logo.82b9c7a5.png',
							},
							{
								user_houseId: '',
								uname: '张三',
								uface: 'img/logo.82b9c7a5.png',
							},
							{
								user_houseId: '',
								uname: '张三',
								uface: 'img/logo.82b9c7a5.png',
							}
						]
					},
					{
						houseName: '房间4',
						hoseId: '232325',
						houseWay: true,
						joinRoom: false,
						users: [{
								user_houseId: '',
								uname: '张三',
								uface: 'img/logo.82b9c7a5.png',
							},
							{
								user_houseId: '',
								uname: '张三',
								uface: 'img/logo.82b9c7a5.png',
							},
							{
								user_houseId: '',
								uname: '',
								uface: 'img/waitplay.5e1581e1.png',
							},
							{
								user_houseId: '',
								uname: '',
								uface: 'img/waitplay.5e1581e1.png',
							}
						]
					}
				]
			}
		},
		methods: {
			back() {
				this.$router.push("/main");
			},
			perpare() {
				this.$router.push("/game");
			},
			toRoom(index) {
				alert("加入成功");
				this.rooms[index].joinRoom = false;
				// this.$router.push("/game");
			},
			addRoom() {
				this.creatRoom = false;
				let isPassword = new Boolean(this.isPassword);
				if ('false' == this.isPassword) {
					isPassword = false;
				} else {
					isPassword = true;
				}
				this.rooms.push({
					houseName: this.roomName,
					hoseId: '232326',
					houseWay: isPassword,
					users: [{
							user_houseId: '',
							uname: '张三',
							uface: 'img/logo.82b9c7a5.png',
						},
						{
							user_houseId: '',
							uname: '',
							uface: 'img/waitplay.5e1581e1.png',
						},
						{
							user_houseId: '',
							uname: '',
							uface: 'img/waitplay.5e1581e1.png',
						},
						{
							user_houseId: '',
							uname: '',
							uface: 'img/waitplay.5e1581e1.png',
						}
					]
				});
				this.roomName = '';
				this.roomPassword = '';
				this.isPassword = 'false';

				// this.$router.push("/game")
			}
		},
		computed: {

		},
		watch: {
			isPassword: {
				handler: function() {
					if ("false" == this.isPassword) {
						this.isShowPasssword = false;
					} else {
						this.isShowPasssword = true;
					}
				}
			}
		}
	}
</script>

<style>
	.root {
		/* max-height: 560px; */
		overflow-x: hidden;
	}

	.back {
		position: absolute;
		margin-top: 0px;
	}

	.room {
		width: 230px;
		height: 230px;
	}

	.lock {
		position: absolute;
		float: right;
		width: 50px;
		height: 50px;
	}

	.head {
		width: 40px;
		height: 40px;
	}

	.headNull {
		width: 80px;
		height: 70px;
	}
</style>
