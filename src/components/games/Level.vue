<template>
	<v-row class="root">
		<v-col cols="5">
			<v-card color="#DAA520" class="room" @click="primary()"><p>&nbsp;</p><p>&nbsp;</p>初级模式</v-card>
			<!-- <div style="background-color: #DAA520;" class="room"><p>&nbsp;</ p><p>&nbsp;</p>初级模式</div> -->
		</v-col>
		<v-col cols="5">
			<v-card color="#DAA520" class="room"><p>&nbsp;</p><p>&nbsp;</p>高级模式</v-card>
		</v-col>
	</v-row>
</template>

<script>
	export default {
		methods:{
			primary(){
				this.$router.push("/choseRoom");
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
