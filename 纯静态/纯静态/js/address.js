new Vue({
	el:".container",
	data:{
		limitNum:3,
		addressList:[],
		currentIndex:0
	},
	mounted:function(){
		this.$nextTick(function(){
           this.getaddresslist();
		});
	},
	computed:{
		filterAddress:function(){
			return this.addressList.slice(0,this.limitNum);
		}
	},
	methods:{
		getaddresslist:function(){
			var _this=this;
			axios.get("../data/address.json").then(function(res){
				var res=res.data;
				if(res.status==0){
					_this.addressList=res.result;
				}
			})
		},
		loadmore:function(){
			this.limitNum=this.addressList.length;
		},
		setdefault:function(addressid){
			console.log("addressid");
			this.addressList.forEach(function(address,index){
				if(address.addressId==addressid){
					address.isDefault=true;
				}else{
					address.isDefault=false;
				}
			})
		}
	}
})