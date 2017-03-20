<template>
 <div class="shopcart">
  <div class="content">
  	<div class="cartLeft" :class="{curr:allCount>0}">
	  	<div class="icon-wrapper" @click="changeFold()">
	  		<div v-if='allCount>0' class="count">
	  			{{allCount}}
	  		</div>
	  		<div class="icon">
	  			<span class='icon-shopping_cart'></span>
	  		</div>
	  	</div>
	  	<div class="price">
	  		￥{{allPrice}}
	  	</div>
	  	<div class="des">
	  		另需配送费￥{{deliveryPrice}}元
	  	</div>
    </div>
    <div class="cartRight">
    	<p v-if='allPrice==0'>{{minPrice}}元起送</p>
  		<p v-if='allPrice>=minPrice' class="go">去结算</p>
  		<p v-else class='no-go'>还差￥{{minPrice-allPrice}}起送</p>
    </div>
  </div>
  <transition name='shopcart-fade'>
  <div class="shopcart-list" v-show='fold'>
    	<div class="list-header">
    		<h1 class="title">购物车</h1>
    		<span class='empty' @click = "clearCart()">清空</span>
    	</div>
    	<div class="list-content">
    		<ul class="foods-group">
    			<li class="foods" v-for='food in selectFoods'>
    				<span class='name'>{{food.name}}</span>
    				<div class="price">
    					<span>￥{{food.price*food.count}}</span>
    				</div>
    				<div class="cartcontrol-wrapper">
    					<v-cartcontrol :food = "food"></v-cartcontrol>
    				</div>
    			</li>
    		</ul>
    	</div>
    </div>
    </transition>
    <div class="mark" v-show="fold">
    	
    </div>
 </div>
</template>

<script type="text/ecmascript-6">
import cartcontrol from '../../components/cartcontrol/cartcontrol.vue';
export default {
	props: {
		// 配送费
		deliveryPrice: {
			type: Number,
			default: 0
		},
		// 最低消费
		minPrice: {
			type: Number,
			default: 0
		},
		// 选择的商品
		selectFoods: {
			type: Array,
			default () {
				return [{}];
			}
		}
	},
	data () {
		return {
		  fold: false
		};
	},
	methods: {
		changeFold: function () {
			if (this.allCount) {
				this.fold = !this.fold;
			}
		},
		clearCart: function () {
			this.selectFoods.forEach(function (food) {
				food.count = 0;
			});
		}
	},
	computed: {
		// 总价
		allPrice: function () {
			var priceAll = 0;
			this.selectFoods.forEach(function (food) {
				priceAll += food.price * food.count;
			});
			return priceAll;
		},
		// 商品数
		allCount: function () {
			var counts = 0;
			this.selectFoods.forEach(function (food) {
				counts += food.count;
			});
			if (!counts) {
				this.fold = false;
			}
			return counts;
		}
	},
	components: {
	'v-cartcontrol': cartcontrol
  	}
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
	.shopcart
		position: fixed
		left : 0
		z-index : 10
		bottom : 0
		width : 100%
		height : 48px
		background : rgba(0, 0, 0, 0.8)
		.mark
			width : 100%
			height : 100%
			top : 0
			left : 0
			position : fixed
			z-index : -2
			background-color : rgba(0, 0, 0, .4)
		.content
			display : flex
			background : #141d27
			height : 100%
			.cartLeft
				background : #141d27
				flex : 1
				&.curr
					background : #08121c
					.price 
						color : #fff
					.icon-wrapper
						background : #08121c
						.icon
							background : #00a0dc
							.icon-shopping_cart
								color : #fff
				.icon-wrapper
					display : inline-block
					background : #141d27
					margin 0px 12px
					padding : 6px
					border-radius : 50%
					position : relative
					top : -10px
					width : 56px
					height : 56px
					box-sizing : border-box
					float: left
					.count
						position : absolute
						left : 35px
						top : 0px
						background : rgb(240, 20, 20)
						color : #fff
						padding : 3px 10px
						border-radius : 10px
						font-size : 12px
						line-height : 12px
						box-shadow : 0 4px 8px 0 rgba(0, 0, 0, 0.4)
					.icon
						width : 100%
						height : 100%
						text-align : center
						background : #2b343c
						border-radius : 50%
						line-height: 44px
						.icon-shopping_cart
							color : #80858a
							font-size: 24px
							line-height : 44px
							vertical-align: top
				.price 
					display : inline-block
					font-size : 16px
					font-weight : 600
					line-height : 24px 
					margin : 12px 12px 12px 0;
					padding-right : 12px
					color : rgba(255, 255, 255, 0.4)
					border-right : 1px solid rgba(255,255,255,0.1)
					float : left
				.des
					line-height : 24px 
					font-size : 16px
					margin-top: 12px
					color : rgba( 255, 255, 255, 0.4)
					font-weight : 600
			.cartRight
				p
					flex : 0 0 105px
					width : 105px
					line-height : 48px
					font-size : 16px
					font-weight : 600
					color : rgba( 255, 255, 255, 0.4)
					text-align : center
					background : rgba(0, 0, 0, .2)
					&.no-go
						background-color : #2b333b;
					&.go
						background-color : #00b43c;
						color : #fff
		.shopcart-list
			position : absolute
			background-color : #fff
			z-index : -1
			bottom : 48px
			width : 100%
			padding-bottom : 23px
			.list-header
				background-color: #f3f5f7
				font-size : 14px
				line-height : 40px 
				overflow : hidden
				padding : 0px 18px
				border-bottom : 1px solid rgba(7, 17, 27, 0.1)
				.title
					float : left
					color : rgb(7, 17, 27)
				.empty
					float : right
					color : rgb(0, 160, 220)
			.list-content
				padding : 0px 18px
				max-height : 196px
				overflow-x: hidden
				.foods
					display : flex
					padding : 5px 0px
					line-height : 38px
					border-bottom : 1px solid rgba(7, 17, 27, 0.1)
					.cartcontrol-wrapper
						float : right
						min-width : 96px
					.name 
						flex : 1
						color : rgb(7, 17, 27)
					.price
						font-size : 10px
						color : rgb(240, 20, 20)
						padding : 0px 12px 0px 16px
.shopcart-fade-enter-active,
.shopcart-fade-leave-active{
  transition: all 0.4s ease;
}
.shopcart-fade-enter,.shopcart-fade-leave-active {
  transform: translate3d(0,100%,0);
}
</style>
