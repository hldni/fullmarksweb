module.exports = {
  "transpileDependencies": [
    "vuetify",
  ],
 lintOnSave: false,
 publicPath:'./',
  devServer: {
	open: true,
	host: 'localhost',
	port: 8080,
	proxy: {
		// '/ws':{
		// 	ws: true,
		// 	changeOrigin: true,
		// 	target: "ws://127.0.0.1:8081"
		// }, 
	  '/': {
		  target: 'http://127.0.0.1:8079',  // target host
		  ws: true,  // proxy websockets
		  changeOrigin: true,  // needed for virtual hosted sites
		  pathRewrite: {
			  '^/': ''  // rewrite path
		  }
	  },
	}, 
  },

}


