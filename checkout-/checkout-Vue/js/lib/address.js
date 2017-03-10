var vm = new Vue({
	el : '#address',
	data : {
		title : 'address',
		addressList : [],
		addressNum : 3,
		curIndex : 0,
		tabIndex : 1
	},
	mounted : function (argument) {
		this.$nextTick(function(){
			this.getAddressList();
		});
	},
	// 过滤
	computed : {
		filterAddressList : function(){
			return this.addressList.slice(0,this.addressNum);
		}
	},
	methods : {
		getAddressList : function (){
			var _this = this;
			this.$http.get("data/address.json").then(function(res){
				if ( res.status == 200 ) {
					this.addressList = res.body.result;
					console.log(this.addressList);
				}
			})
		},
		setDefalutAddress : function(id){
			this.addressList.forEach( function(element, index) {
				if ( element.addressId == id) {
					element.isDefault = true;
				}else{
					element.isDefault = false;
				}
			});
		},
		deleteAddress : function (index){
			if (this.addressList[index].isDefault == true) {
				this.addressList.splice(index,1);
				console.log(this.addressList.length);
				if (this.addressList.length > 0) {
					this.addressList[0].isDefault = true;
				}
			}else{
				this.addressList.splice(index,1);
			}
		}
	}
})