<template>
  <v-row justify="center">
    <v-col cols="12" sm="8">
      <v-card>
        <v-card-title class="cyan darken-1">
          <span class="headline white--text">Sarah Mcbeal</span>

          <v-spacer></v-spacer>

        </v-card-title>

        <v-list>
			<v-list-item>
            <v-list-item-content>
              <v-list-item-title>Orlando, FL 79938</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
		<div>
			<v-btn right=true  @click="changeStatus()">back</v-btn>
			</div>
        <v-img
          src="https://picsum.photos/700?image=996"
          height="200px"
        ></v-img>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
	export default{
		data(){
		},
		methods:{
			changeStatus(){
				  this.$router.go(-1);
				
			}
		}
	}
</script>

<style>
	a{
		float: right;
	}
</style>
