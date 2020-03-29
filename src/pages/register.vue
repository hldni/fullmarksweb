<template>
	<div id="app">
		<div id="bgc" v-on:mousedown.left="createLoves($event)" absolute v-on:mouseup="removeSmallHert()" v-on:mousemove="removeSmallHert()">
			<background ref="background"></background>
		</div>
		<div id="register">
			<!-- 注册进度条 -->
			<v-progress-linear indeterminate color="cyan" :active="loading"></v-progress-linear>
			<br>
			<span>注册新用户</span>

			<v-row justify="space-between">
				<v-col cols="12" md="1"></v-col>
				<v-col cols="12" md="10">
					<v-form ref="form" v-model="valid" style="line-height:10px" lazy-validation>
						<v-row justify="space-between">
							<v-col cols="12" md="3">
								用&nbsp;&nbsp;户&nbsp;&nbsp;名:</v-col>
							<v-col cols="12" md="9">
								<v-text-field dense=true v-model="user.username" height="15px" :rules="nameRules" required></v-text-field>
							</v-col>
							<v-col cols="12" md="3">
								密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码:</v-col>
							<v-col cols="12" md="9">
								<v-text-field dense=true class="dd" v-model="user.upassword" height="15px" :counter="16" :rules="passwordRules" required>
								</v-text-field>
							</v-col>
							<v-col cols="12" md="3">
								电&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;话:</v-col>
							<v-col cols="12" md="9">
								<v-text-field label="可不填" dense=true v-model="user.unumber" height="15px" :counter="11" :rules="phoneRules" required>
								</v-text-field>

							</v-col>
							<v-col cols="12" md="3">
								邮&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;箱:</v-col>
							<v-col cols="12" md="9">
								<v-text-field dense="true" v-model="user.uemail" height="15px" :rules="emailRules" required>
								</v-text-field>
							</v-col>
							<v-col cols="12" md="3">
								验&nbsp;&nbsp;证&nbsp;&nbsp;码:
							</v-col>
							<v-col cols="12" md="6">
								<v-text-field dense=true v-model="user.code" :counter="4" :rules="codeRules" label="验证码" required></v-text-field>
							</v-col>
							<v-col cols="12" md="3">
								<img id="code" v-on:click="changeImg" v-bind:src="src" />
							</v-col>
						</v-row>
						<a href="../test1">百分纸牌协议</a>
						<v-checkbox dense=true v-model="checkbox" :rules="[v => !!v || 'You must agree to continue!']" label="Do you agree?"
						 required></v-checkbox>

						<br />
						<v-btn :disabled="!valid" color="warning" class="mr-4" @click="validate">
							注册
						</v-btn>

						<v-btn color="success" @click="toLogin">
							去登录
						</v-btn>
					</v-form>
				</v-col>
				<v-col cols="12" md="1"></v-col>
			</v-row>
		</div>
	</div>

</template>

<script>
	import background from './background.vue'
	export default {
		components: {
			background
		},
		data() {
			return {
				user: {
					username: 'abcdefhijk',
					upassword: 'abcdefhijk',
					unumber: '1427213369@qq.com',
					uemail: 'dfsfds@dfs.cn',
					code:'dddd',
				},
				passwordRules: [
					v => !!v || '不能为空',
					v => v.length >= 6 || '密码长度不能小于6',
					v => v.length <=16 || '密码长度不能超过16'
				],
				nameRules: [
					v => !!v || 'Name is required',
					v => v.length >= 6 || '用户名长度不能小于6',
					v => v.length <= 11 || '用户名长度不能超过11',
					v => /^[a-zA-z0-9]*$/.test(v) || '请输入合法用户名',
				],
				phoneRules: [
					v => /^[0-9]*$/.test(v) || '请输入合法手机号',
					v => (v.length == 0 || (v && v.length == 11)) || '请输入正确的长度哦',
				],
				emailRules: [
					v => !!v || '邮箱不能为空',
					v => /.+@.+/.test(v) || '请输入合法邮箱',
				],
				codeRules: [
					v => !!v || '不能为空',
					v => v.length == 4 || '',
					// v => /^[0-9a-zA-Z_]{4}$/.test(v) || '请正确输入验证码'
				],
				checkbox: '',
				loading: false, //加载登录进度
				cutColor: ["#1E90FF", "#00BFFF"], //切换按钮的颜色
				valid:false,
				src: 'http://localhost:8079/kaptcha',
			}
		},
		methods: {
			createLoves() {
				this.$refs.background.createLoves(event)
			},
			removeSmallHert() {
				this.$refs.background.removeSmallHert()
			},
			checkLogin() {
				this.isPassword = !this.isPassword;
				this.cutColor = this.isPassword ? ["#1E90FF", "#00BFFF"] : ["#00BFFF", "#1E90FF"];
				this.$router.push(this.isPassword ? "password" : "codeLogin");
			},
			validate(){
				if (!this.$refs.form.validate()) {
					return;
				}
				this.loading = true;
				this.$http({
					method: "post",
					url: "/user/register",
					data: this.$qs.stringify(this.user)
				}).then(() => {
					alert(1);
				}).catch(() => {
					this.user.password='ldf';
					// alert('catch');
				});
			},
			toLogin(){
				this.loading = false;
				this.$router.push("/login");
			},
			changeImg() {
				this.src = 'http://localhost:8079/kaptcha?' + new Date()
			},
		}


	}
</script>

<style>
	img {
		width: 50px;
		height: 30px;
	}

	#bgc {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: linear-gradient(#fff1eb, #ace0f9);

	}

	#register {
		width: 400px;
		height: 500px;
		margin-left: -200px;
		position: absolute;
		left: 55%;
		margin-top: 100px;
		/* background-image: linear-gradient(-90deg, #29bdd9 10%, #276ace 50%); */
		/* background:linear-gradient(#fff1eb,#ace0f9); */
		/* background:linear-gradient(#243949,#517fa4); */
		/* background-image: linear-gradient(to right, #243949 0%, #517fa4 100%); */
		background-image: linear-gradient(to top, #fff1eb 0%, #ace0f9 100%);
	}

	span {

		display: flex;
		justify-content: center
	}

	v-checkbox {
		position: absolute;
		height: 1px;
	}
	
	#code {
		width: 100px;
		height: 50px;
	}
</style>
