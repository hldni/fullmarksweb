<template>
  <v-app>
    <v-content>
		<message></message>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import message from '@/components/Message/Message'
export default {
 
	name: 'App',
	components: {
	message
	},
	data: () => ({
	//
	}),
	mounted() {
		window.onpopstate = () => {
			if (!this.allowBack) {    //    这个allowBack 是存在vuex里面的变量
				history.go(1)
			}
		}
	}
};
</script>