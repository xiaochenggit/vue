<template>
<div class="goods">
 <div class="menu-warpper" ref="menuWrapper">
  <ul>
    <li v-for="(item,index) in goods" class="menu-item" :class="{'curr':curindex==index}">
      <span class="text">
      	<span class="icon" v-if="item.type>0" :class='classMap[item.type]'></span>{{item.name}}
      </span>
    </li>
  </ul>
 </div>
 <div class="foods-warpper" ref="foodsWrapper">
   <ul>
   	 <li v-for="item in goods" class="food-list food-list-hook">
   	   <h2 class="title">{{item.name}}</h2>
   	   <ul>
   	     <li v-for="food in item.foods" class="food-item">
   	       <div class="icon">
   	         <img :src="food.icon" alt="food.name"> 	
   	       </div>
   	       <div class="conten">
   	         <h3 class="name">{{food.name}}</h3>
   	         <p class="desc" v-if="food.description">{{food.description}}</p>
   	         <div class="extra">
   	         	<span>月售{{food.sellCount}}份</span>
   	         	<span>好评率{{food.rating}}%</span>
   	         </div>
   	         <div class="price">
   	         	<span>￥{{food.price}}</span>
   	         	<span v-show='food.oldPrice' class="oldprice">￥{{food.oldPrice}}</span>
   	         </div>
   	       </div>
   	     </li>
   	   </ul>
   	 </li>
   </ul>
 </div>
</div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll';
export default {
	data () {
	   return {
	     goods: [],
	     classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
	     // list 的高度合集
	     listHeight: [],
	     // 跟踪变量 scrollY
	     scrollY: 0
	   };
	},
	mounted () {
	  var _this = this;
	  this.$nextTick(function () {
	    this.$http.get('/api/goods').then(function (response) {
	        this.goods = response.body.data;
	        _this.$nextTick(function () {
	        // 必须在加载完之后在调用
	        	_this._initScroll();
	        	_this._catHeight();
	        });
	    });
	  });
	},
	methods: {
		_initScroll () {
			// better scroll 插件
			this.menuScroll = new BScroll(this.$refs.menuWrapper, {});
			this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
			   // 添加监听位置参数
			   probeType: 3
			});
			// 添加位置监听参数之后才可以获得位置信息
			var that = this;
			this.foodsScroll.on('scroll', function (pos) {
				that.scrollY = Math.abs(Math.round(pos.y));
			});
		},
		// 获得高度
		_catHeight () {
			var listItem = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
			var height = 0;
			this.listHeight.push(height);
			for (var i = 0; i < listItem.length; i++) {
			     height += listItem[i].clientHeight;
			     this.listHeight.push(height);
			}
		}
	},
	computed: {
		curindex () {
			for (var i = 0; i < this.listHeight.length; i++) {
				var height1 = this.listHeight[i];
				var height2 = this.listHeight[i + 1];
				if (!height2 || this.scrollY >= height1 && this.scrollY < height2) {
					return i;
				}
			}
			return 0;
		}
	}
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
	.goods
		display: flex
		position: absolute 
		width: 100%
		top: 174px
		bottom: 46px
		overflow: hidden
		.menu-warpper
			flex: 0 0 80px
			width: 80px
			background : #f3f5f7
			.menu-item
				height : 56px
				padding : 0 12px
				display : table
				line-height: 14px
				&.curr
					position : relative
					font-weight : 700
					margin-top : -1px
					z-index : 1
					background:#fff
					.text:after
						border none
				.icon
					display : inline-block
					width : 12px
					height : 12px
					margin-right : 2px;
					background-size : 12px 12px
					background-repeat : no-repeat
					vertical-align : top
					&.decrease
						bg-image('decrease_3')
					&.discount
						bg-image('discount_3')
					&.guarantee
						bg-image('guarantee_3')
					&.invoice
						bg-image('invoice_3')
					&.special
						bg-image('special_3')
				.text
					font-size : 12px
					display : table-cell
					vertical-align : middle
					width : 56px
					border-1px(rgba(7, 17, 27, 0.1))
					:last-child:after
						border : none
		.foods-warpper
			flex: 1
			.food-list
				padding : 0px 0px 0px 0px
				.title
					border-left : 2px solid #d9dde1;
					text-indent : 14px
					font-size : 12px
					height : 26px
					line-height : 26px
					color : rgb(147, 153, 159)
					background-color : #f3f5f7
				.food-item
					display : flex
					margin : 0px 18px;
					padding : 18px 0px;
					border-1px(rgba(7, 17, 27, .1))
					&:last-child:after
						display : none
					.icon
						width : 57px
						flex : 0 0 57px
						margin-right : 10px
						img
							width : 57px
							border-radius : 4px
					.conten
						flex : 1
						.name
							margin : 2px 0 8px 0
							font-size : 14px
							line-height : 14px
							height : 14px
							color : rgb(7, 17, 27)
						.desc,.extra
							font-size : 10px
							line-height : 10px
							color : rgb(147, 153, 159)
							margin-bottom : 8px
						.extra
							span
							    &:first-child
								    margin-right : 12px
						.price
							font-size : 14px
							line-height : 14px
							color : rgb(240, 20, 20)
							.oldprice
								font-size : 10px
								color : rgb(147, 153, 159)
								margin-left: 8px
								line-height : 10px
								text-decoration : line-through
</style>
