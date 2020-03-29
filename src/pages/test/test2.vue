<template>
	<v-container class="grey lighten-5">
		<v-row>
			<v-col sm="9">
				<v-card class="pa-2" outlined tile>
					Level 1: .col-sm-9
				</v-card>
				<v-row no-gutters>
					<v-col cols="8" sm="6">
						<v-card class="pa-2" outlined style="background-color: lightgrey;" tile>
							Level 2: .col-8 .col-sm-6
						</v-card>
					</v-col>
					<v-col cols="4" sm="6">
						<v-card class="pa-2" outlined style="background-color: lightgrey;" tile>
							Level 3: .col-4 .col-sm-6
						</v-card>
					</v-col>
				</v-row>
			</v-col>
		</v-row>
	</v-container>
</template>
<script>
	/* export default {
    data: () => ({
      messages: [
        {
          avatar: 'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460',
          name: 'John Leider',
          title: 'Welcome to Vuetify.js!',
          excerpt: 'Thank you for joining our community...',
        },
        {
          color: 'red',
          icon: 'people',
          name: 'Social',
          new: 1,
          total: 3,
          title: 'Twitter',
        },
        {
          color: 'teal',
          icon: 'local_offer',
          name: 'Promos',
          new: 2,
          total: 4,
          title: 'Shop your way',
          exceprt: 'New deals available, Join Today',
        },
      ],
      lorem: 'Lorem ipsum dolor sit amet, at aliquam vivendum vel, everti delicatissimi cu eos. Dico iuvaret debitis mel an, et cum zril menandri. Eum in consul legimus accusam. Ea dico abhorreant duo, quo illum minimum incorrupte no, nostro voluptaria sea eu. Suas eligendi ius at, at nemore equidem est. Sed in error hendrerit, in consul constituam cum.',
    }),
  } */
</script>

<style>
</style>
