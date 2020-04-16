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
										<v-text-field label="房间名称" v-model="room.roomName" required></v-text-field>
									</v-col>
									<v-col cols="12">
										<v-radio-group row v-model="isPassword" :mandatory="false">
											<v-radio label="密码房" value="true"></v-radio>
											<v-radio label="普通房" value="false"></v-radio>
										</v-radio-group>
									</v-col>
									<v-col cols="12">
										<v-text-field label="请输入密码,四位数字" :rules="roomPasswordRules" v-model="room.roomPassword" required v-show="isShowPasssword"></v-text-field>
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
	
				
				
				<v-hover>
					<template v-slot:default="{ hover }">
						<v-card class="room">
							
							<v-card :color="roomColor" >
								{{room.roomName}}
								<v-icon v-show="room.roomWay">lock</v-icon>
								<v-row>
									<v-col :offset="index%2 == 0 ? 1:0" cols=5 v-for="(user, index) in room.users">
										<v-card v-if="user.uname != ''">
											<img :src="user.uface" class="head" />
											<span style="size: 8px; overflow:hidden">{{user.uname}}</span>
										</v-card>
										<v-card v-if="user.uname == ''" v-on="on">
											<img :src="user.uface" class="headNull" />
										</v-card>
									</v-col>
								</v-row>
							</v-card>
				
							<v-fade-transition  v-if="!room.roomWay">
								<v-overlay v-if="hover" absolute color="#036358">
									
									<v-btn :disabled = "room.roomState" @click="toRoom(i)">点击加入房间</v-btn>
									
									
										</v-overlay>
									</v-fade-transition>
									
									<v-dialog v-model="rooms[i].joinRoom" persistent  max-width="290">
											<template v-slot:activator="{ on }">
												<v-fade-transition  v-if="room.roomWay">
												<v-overlay v-if="hover" absolute color="#036358">
													<v-btn :disabled = "room.roomState" v-on="on">点击加入房间</v-btn>
												</v-overlay>
											</v-fade-transition>
										</template>
										<v-card>
											<v-card-title class="headline">请输入密码</v-card-title>
											<v-text-field v-model="toRoomPassword"  :error-messages="errorMessage" label="请输入房间密码"></v-text-field>
											<v-card-actions>
												<v-btn color="green darken-1" text @click="rooms[i].joinRoom = false">取消</v-btn>
												<v-btn color="green darken-1" text @click="toRoom(i)">加入</v-btn>
											</v-card-actions>
										</v-card>
									</v-dialog>
									
									
						</v-card>
					</template>
				</v-hover>
				
				
			</v-col>
		</v-row>


	</div>
</template>

<script>
	export default {
		data() {
			return {
				user:JSON.parse(window.sessionStorage.getItem("user")),
				overlay:false,
				// dialog:'false',
				roomColor: '#DAA520',
				// houseName:'张三',
				creatRoom: false,
				isPassword: 'false', //创建房间是否加密
				isShowPasssword: false,
				roomPassword: '',
				roomName: '',
				errorMessage:'',
				room:{
					roomName:'',
					roomWay:0,
					roomPassword:'',
					rlevel:0
				},
				roomPasswordRules: [
					v => /^([0-9]{4})*$/.test(v) || '请输入四位数字',
				],
				toRoomPassword: '',
				rooms: []
			}
		},
		methods: {
			back() {
				this.$router.push("/main");
			},
			perpare() {
				this.$router.push("/game");
			},
			createConnect(index){
				//let msgObj = new Object();
				//msgObj.from = this.user.username;
				//this.rooms[index].joinRoom = false;
				//this.stomp_room.send('/ws/sendAllUser/'+this.rooms[index].roomId, {}, JSON.stringify(msgObj));
				this.$store.dispatch('connect_room',this.rooms[index].roomId);
			},
			toRoom(index) {//加入房间
				if(!this.rooms[index].roomWay){//没有枷锁
					this.createConnect(index);
					return;
				}
				if(this.rooms[index].roomWay && this.toRoomPassword != this.rooms[index].roomPassword){
					this.errorMessage = '请输入正确的密码(四位数字)';
					this.toRoomPassword = '';
				}else{
					this.createConnect(index);
					this.rooms[index].joinRoom = false;
				}
					
			},
			addRoom() {//添加/创建房间
				this.postRequest("/room/create",this.room).then(s => {
					
				});
				this.creatRoom = false;
				this.isPassword = 'false';
				this.getRooms(0);
				// this.$router.push("/game")
			},
			getRooms(level){
				//初始化的时候将创建房间的名字和密码初始化一下,避免受上次创建房间操作的影响
				//创建房间是异步操作,在创建房间方法中会让这两个参数传不进去
				//this.room.roomName = '';
				//this.room.roomPassword = '';
				
				this.getRequest("/room/getAll/"+level).then(s => {
					let rooms = [];
					for (var i = 0; i < s.data.length; i++) {
						let room = new Object();
						room.roomName = s.data[i].roomName;//房间名
						room.roomId = s.data[i].roomId;//房间id
						room.roomPassword = s.data[i].roomPassword;//房间密码
						room.roomWay = s.data[i].roomWay;//默认不加锁
						room.roomState = s.data[i].roomState;//房间是否满了
						room.joinRoom = false;
						room.users = [];
						for(let j = 0; j < s.data[i].users.length; j++){
							let user =  new Object();
							user.isRoomMaster = (s.data[i].room_userId == s.data[i].users[j].uid);
							user.uname = s.data[i].users[j].uname;
							user.uface = s.data[i].users[j].uface;
							room.users.push(user);
						}
						for(let j = s.data[i].users.length; j < 4; j++){
							let user =  new Object();
							user.uname = '';
							user.uface = 'img/waitplay.5e1581e1.png';
							room.users.push(user);
						}
						rooms.push(room);
						this.rooms = rooms;
					}
				})
			}
		},
		computed: {

		},
		created(){
			this.getRooms(0);
		},
		watch: {
			isPassword: {
				handler: function() {
					if ("false" == this.isPassword) {
						this.room.roomWay = 0;
						this.isShowPasssword = false;
					} else {
						this.room.roomWay = 1;
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
