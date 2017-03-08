var vm = new Vue({
	el : "#app",
	data : {
		title : "Project"
	},
	// 局部过滤器
	filters : {

	},
	// 加载出来就执行,于jquery的ready相似
	mounted : function () {
		this.changeTitle();
	},
	methods : {
		changeTitle : function(){
			this.title = "A Vue Project";
		}
	}
})
// 全局过滤器
// Vue.filter();