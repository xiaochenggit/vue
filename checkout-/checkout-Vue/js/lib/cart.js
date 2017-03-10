var vm = new Vue({
	el : "#app",
	data : {
		title : "Project",
		productList : [],
		totalMoney : 0,
		list : [],
		isCheckedAll : false,
		allMoney : 0,
		isShow : false,
		deleteProIndex : 0
	},
	// 局部过滤器
	filters : {
		formatMoney : function(value){
			return "￥" + value.toFixed(2);
		}
	},
	// 加载出来就执行,于jquery的ready相似
	mounted : function () {
		this.changeTitle();
	},
	methods : {
		changeTitle : function(){
			this.title = "A NEW Project";
			var _this = this;
			this.$http.get("data/cart.json").then(function(res){
				_this.productList = res.body.result.productList;
				_this.totalMoney = res.body.result.totalMoney;
				_this.list = res.body.list;
			})
		},
		changeNum : function(item,type){
			item.productQuentity += type;
			if ( item.productQuentity < 1 ) {
				item.productQuentity = 1
			}
			this.changeMoney();
		},
		// 改变选择
		changIsChecked : function(item){
			if ( typeof item.isChecked == "undefined" ) {
				Vue.set(item,"isChecked",true)
			}else {
				item.isChecked = !item.isChecked ;
			}
			this.changeMoney();
		},
		// 改变全选 
		changeIsCheckedAll : function(flag){
			this.isCheckedAll = flag;
			var _this = this;
			this.productList.forEach( function(item, index) {
				if (typeof item.isChecked == "undefined") {
					_this.$set(item,"isChecked",_this.isCheckedAll)
				}else{
					item.isChecked = _this.isCheckedAll;
				}
			})
			this.changeMoney();
		},
		// 计算全部金额
		changeMoney : function(){
			this.allMoney = 0;
			var _this = this;
			this.productList.forEach( function(item, index) {
				if ( item.isChecked == true ) {
					_this.allMoney += item.productQuentity * item.productPrice;
				}
			});
		},
		// 删除
		deletePro : function(index){
			this.isShow = true;
			this.deleteProIndex = index;
		},
		deleteProduct : function(){
			this.isShow = false;
			this.productList.splice(this.deleteProIndex,1);
			this.changeMoney();
		}
	}
})
// 全局过滤器
Vue.filter("moneny",function(val,type){
	return "￥" + val.toFixed(2) + type;
});