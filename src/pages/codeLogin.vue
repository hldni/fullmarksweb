<template>
	<v-row justify="space-between">
		<v-col cols="12" md="1"></v-col>
		<v-col cols="12" md="10">
			<v-form ref="form" v-model="valid" lazy-validation>
				<v-text-field v-model="user.phone" :counter="11" :rules="nameRules" label="手机号" required></v-text-field>

				<v-text-field v-model="user.code" :rules="codeRules" label="验证码" required></v-text-field>
				<a href="../test1">百分纸牌协议</a>
				<v-checkbox v-model="checkbox" :rules="[v => !!v || 'You must agree to continue!']" label="Do you agree?" required></v-checkbox>

				<v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">
					登录
				</v-btn>

				<v-btn color="warning" @click="resetValidation">
					去注册
				</v-btn>
			</v-form>
		</v-col>
		<v-col cols="12" md="1"></v-col>
	</v-row>
</template>

<script>
	export default{
		data(){
			return{
				valid: false,
				user: {
					phone:'',
					code:''
				},
				message:'',
				nameRules: [
					v => !!v || '手机号不能为空',
					v => /^[0-9]*$/.test(v) || '请输入合法手机号',
					v => (v && v.length == 11) || '请输入正确的长度哦',
				],
				codeRules: [
					v => !!v || '验证码不能为空'
					// v => !/^[0-9]*$/.test(v) || '不能都为数字'
					/* v => !!v || 'E-mail is required',
					v => /.+@.+\..+/.test(v) || 'E-mail must be valid', */
				],
				select: null,
				items: [
					'Item 1',
					'Item 2',
					'Item 3',
					'Item 4',
				],
				checkbox: false,
			}
		},
		methods:{
			validate() {
				if (!this.$refs.form.validate()) {
					return;
				}
				this.$parent.loading=true;
				this.$parent.$refs.schedu.active=true;
				this.$http({
					method: "post",
					url: "/user/login",
					data: this.$qs.stringify(this.user)
				}).then(() => {
					alert(1);
				}).catch(() => {
					this.user.password='ldf';
					// alert('catch');
				});
			
			},
			resetValidation() {
				this.$parent.loading=false;
				this.$refs.form.reset();
				this.$router.push("/register");
			},
		}
	}
</script>

<style>
</style>
