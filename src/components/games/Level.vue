<template>
	<v-row class="root">
		<v-col cols="5">
			<v-card color="#DAA520" class="room" @click="primary()"><p>&nbsp;</p><p>&nbsp;</p>初级模式</v-card>
			<!-- <div style="background-color: #DAA520;" class="room"><p>&nbsp;</ p><p>&nbsp;</p>初级模式</div> -->
		</v-col>
		<v-col cols="5">
			<v-card color="#DAA520" class="room" @click="primary1()"><p>&nbsp;</p><p>&nbsp;</p>高级模式</v-card>
		<!-- 	<v-text-field v-model="content" label="text"></v-text-field>
			<v-text-field v-model="to" label="to"></v-text-field> -->
		</v-col>
	</v-row>
</template>

<script>
    import {mapState} from 'vuex'
	export default {
		data(){
			return {
				content:'nihao',
				to:'',
				user : JSON.parse(window.sessionStorage.getItem("user"))
			}
		},
        computed: mapState([
			'currentSession',
            'stomp',
            'stomp_room',
			'test',
        ]),
		methods:{
			primary(){
				//let msgObj = new Object();
				//msgObj.from = this.user.username;
				// alert(this.user.username);
				// alert(this.currentSession);
				//msgObj.fromNickname = this.user.uname;
				// msgObj.to = this.currentSession.username;
				//msgObj.to = this.to;
				//msgObj.content = this.content;
				//this.$store.commit('GET_INFO_ROOM', this.to);
				//this.stomp.send('/ws/chat', {}, JSON.stringify(msgObj));
				// alert(this.content);
				// this.$store.commit('increment',1);
				// let count = this.$store.state.count;
				// this.$router.push("/choseRoom");
				
				//this.$store.dispatch('close_connect_room');
				//this.$store.dispatch('connect_room',this.to);
				this.$router.push("/choseRoom");
			},
			primary1(){
				
				alert(1);
				this.getRequest("/user/logout", this.user).then(s => {});
			}
		}
	}
</script>

<style>	
	.root{
		height: 560px;
	}
	.room{
		margin-left: 30%;
		margin-top: 10%;
		height: 250px;
		width: 250px;
		text-align: center;
		font-size:20px;
	}
</style>
