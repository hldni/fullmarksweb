<template>
	<!--    <div id="list">
        <ul style="padding-left: 0px">
            <li v-for="item in hrs" :class="{ active: currentSession?item.username === currentSession.username:false}"
                v-on:click="changeCurrentSession(item)">
                <!--   :class="[item.id === currentSession ? 'active':'']" -->
	<!--  <img class="avatar" :src="item.userface" :alt="item.name">
                <el-badge :is-dot="isDot[user.username+'#'+item.username]"><p class="name">{{item.name}}</p></el-badge>
            </li>
        </ul>
    </div> -->
	<div>
		<v-card max-width="150" height="399"  style="background-color: #292C33;" >
			<v-list  style="background-color: #292C33;">
				<v-list-item-group v-model="model" color="white" style="background-color: #292C33;" >
					<v-list-item v-for="(item, i) in hrs" :key="i"
					v-on:click="changeCurrentSession(item)" >
						<v-list-item-content style="background-color: #292C33" >
							<v-list-item-title v-text="item.name" style="color: white;" ></v-list-item-title>
						</v-list-item-content>
					</v-list-item>
				</v-list-item-group>
			</v-list>
		</v-card>
	</div>
</template>

<script>
	import {
		mapState
	} from 'vuex'

	export default {
		name: 'list',
		data() {
			return {
				user: JSON.parse(window.sessionStorage.getItem("user")),
				model: '',
			}
		},
		computed: mapState([
			'hrs',
			'isDot',
			'currentSession'
		]),
		methods: {
			changeCurrentSession(currentSession) {
				this.$store.commit('changeCurrentSession', currentSession)
			}
		},
		watch:{
			model: {
				handler: function() {
					// alert(this.model)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.bgh{
		&:hover {
			background-color: rgba(255, 255, 255, 0.03);
			background-color: #292C33;
		}
	}
</style>
