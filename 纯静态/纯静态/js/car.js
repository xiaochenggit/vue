var vm=new Vue({
	el:"#container",
	data:{
		totalMoney:0,
		productList:[],
		checkallflag:false,
		delflag:false,
		curproduct:""
	},
	filters:{
		formatMoney:function (value){
			return "￥"+value.toFixed(2);
		}

	},
	// mounted dom渲染完后，默认查询的一些数据
	mounted:function(){
		this.$nextTick(function(){
			this.cartView();
		});
	},
	methods:{
		cartView:function(){
			var _this=this;
			axios.get("../data/carData.json").then(function (res){
				_this.productList=res.data.result.list;
				_this.totalMoney=res.data.result.totalMoney;
			})
		},
		changemoney:function(product,way){
			if(way>0){
				product.productQuentity++;
			}else{
				product.productQuentity--;
				if(product.productQuentity<1){
					product.productQuentity=1;
				}
			}
			this.calctotalprice();
		},
		// 点击时先判断data里面有没有checked的选项，若没有就注册一个，并且为选中，第二次之后点击开始取反，因为之前注册好了
		selectedProduct:function(item){
			if(typeof item.checked=='undefined'){
				// Vue.set(item,"checked",true)全局注册
				this.$set(item,"checked",true)//局部注册
			}else{
				item.checked=!item.checked;

			}
			this.calctotalprice();
		},
		checkall:function(flag){
			this.checkallflag=flag;
			var _this=this;
			this.productList.forEach(function(item,index){
				if(typeof item.checked=='undefined'){
					_this.$set(item,"checked",_this.checkallflag)
				}else{
                    item.checked=_this.checkallflag; 
				}
			});
			this.calctotalprice();
		},
		calctotalprice:function(){
			var _this=this;
			this.totalMoney=0;
			this.productList.forEach(function(item,index){
				if(item.checked){
					_this.totalMoney+=item.productPrice*item.productQuentity;
				}				
			})
		},
		delconfirm:function(item){
			this.delflag=true;
			this.curproduct=item;
		},
		delproduct:function(){
			var index=this.productList.indexOf(this.curproduct);
			this.productList.splice(index,1);
			this.delflag=false;
		}

	}
});
Vue.filter("money",function(value,type){
	return "￥"+value.toFixed(2)+type;
})
