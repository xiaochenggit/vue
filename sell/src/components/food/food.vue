<template>
<transition name="slide-food">
	<div class="food" v-if ='showFlag' ref='foodWrapper'  @click="changeShowFlag">
		<div>
		<div class="img-header">
			<img :src="food.image" class="img">
			<div class="back">
				<span class='icon-arrow_lift'></span>
			</div>
		</div>
		<div class="des">
			<div class="name">{{food.name}}</div>
			<div class="echo">
				<span class='sellCount'>月售{{food.sellCount}}份</span>
				<span class='rating'>好评率{{food.rating}}%</span>
			</div>
			<div class="pirce-group">
				<span class='price'>￥{{food.price}}</span>
				<span class='oldPrice' v-if='food.oldPrice'>￥{{food.oldPrice}}</span>
				<div class="purchase">
					<div class="button-group" v-show='!food.count' @click.stop='addCart'>
						<span class='btn'>加入购物车</span>
					</div>
					<div class="controll" v-show='food.count'>
						<v-cartcontrol :food='food' ref='food'></v-cartcontrol>
					</div>
				</div>
			</div>
		</div>
		<div class="interval" v-show='food.info'>
		</div>
		<div class="introduce" v-show='food.info'>
			<div class="head">商品介绍</div>
			<p class="info">{{food.info}}</p>
		</div>
		<div class="interval">
		</div>
		<div class="evaluate">
			<div class="head">商品介绍</div>
			<div class="eva-group">
				<div class="all">全部<span>{{this.evaAll}}</span></div>
				<div class="good">推荐<span>{{this.evaGood}}</span></div>
				<div class="bad">吐槽<span>{{this.evaBad}}</span></div>
			</div>
		</div>
		<div class="ratings">
			<div class="filter" @click.stop='changeRatingIsFilter()'>
				<span class='icon-check_circle' :class='{yes:ratingIsFilter}'></span>只看有内容的评价
			</div>
			<div class="body">
				<ul>
					<li v-for='rating in filterRatings' class="rating">
						<div class="head">
							<div class="left">{{rating.rateTime|reTime}}</div>
							<div class="right">
								<div class="name">{{rating.username}}</div>
								<div class="img">
									<img :src='rating.avatar' alt="rating.username">
								</div>
							</div>
						</div>
						<div class="rating-body">
							<span class='icon-thumb_up' v-if='!rating.rateType==1'></span><span class='icon-thumb_down' v-else></span>{{rating.text}}
						</div>
					</li>
				</ul>
			</div>
		</div>
		</div>
	</div>
</transition>
</template>
<script type="text/ecmascript-6">
import cartcontrol from '@/components/cartcontrol/cartcontrol.vue';
import BScroll from 'better-scroll';
export default {
	props: ['food'],
	data () {
		return {
			// 是否显示
			showFlag: false,
			// 全部评价
			evaAll: 0,
			// 推荐
			evaGood: 0,
			// 吐槽
			evaBad: 0,
			// 评论数据
			ratings: [],
			// 是否过滤数据
			ratingIsFilter: false
		};
	},
	methods: {
		changeShowFlag: function () {
			this.showFlag = !this.showFlag;
			if (this.showFlag) {
				this.ratingIsFilter = false;
				var _this = this;
				this.$nextTick(function () {
					_this.ratings = _this.food.ratings;
					_this.showRatings();
				});
			}
		},
		// 加入购物车 直接调用子组件的方法
		addCart: function () {
			this.$refs.food.addCount();
		},
		showRatings: function () {
			var _this = this;
			_this.evaBad = _this.evaGood = 0;
			_this.evaAll = _this.food.ratings.length;
			_this.food.ratings.forEach(function (rating) {
				if (rating.rateType === 1) {
					_this.evaBad += 1;
				} else {
					_this.evaGood += 1;
				}
			});
			this.$nextTick(function () {
				if (!_this.foodScroll) {
					_this.foodScroll = new BScroll(_this.$refs.foodWrapper, {
						click: true
					});
				} else {
					_this.foodScroll = '';
					_this.foodScroll = new BScroll(_this.$refs.foodWrapper, {
						click: true
					});
				}
			});
			return;
		},
		changeRatingIsFilter: function () {
			this.ratingIsFilter = !this.ratingIsFilter;
		}
	},
	computed: {
		// 过滤后的数据
		filterRatings: function () {
			if (!this.ratingIsFilter) {
				return this.ratings;
			} else {
				var arr = [];
				this.ratings.forEach(function (rating) {
					if (rating.text) {
						arr.push(rating);
					}
				});
				return arr;
			}
		}
	},
	filters: {
		reTime: function (value) {
			var reNum = function (num) {
				if (num <= 9) {
					return '0' + num;
				}
				return num;
			};
			var time = new Date(value);
			var year = time.getFullYear();
			var month = reNum(time.getMonth() + 1);
			var date = reNum(time.getDate());
			var hours = reNum(time.getHours());
			var minutes = reNum(time.getMinutes());
			return year + '-' + month + '-' + date + '  ' + hours + ' : ' + minutes;
		}
	},
	components: {
		'v-cartcontrol': cartcontrol
	}
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
	.food
		position: fixed
		left : 0
		top : 0
		bottom : 48px
		z-index: 1
		width : 100%
		background : #fff
		.ratings
			.filter
				padding : 12px 18px
				font-size : 12px
				color : rgb(147, 153, 159)
				line-height : 24px
				border-bottom : 1px solid rgba(7, 17, 27, 0.1)
				.icon-check_circle
					font-size : 24px
					line-height : 24px 
					margin-right : 4px
					vertical-align: middle
					&.yes
						color : rgb(0, 160, 220)
			.body
				padding : 0 18px
				.rating
					.head
						display : flex
						font-size : 10px
						line-height : 12px
						margin : 18px 0px 6px
						color : rgb(147, 153, 159)
						.left
							flex : 1
						.right 
							flex : 0 0 62px
							.name 
								float : left
							.img
								img
									width : 12px
									height : 12px
									border-radius : 12px
									margin-left: 6px
					.rating-body
						padding-bottom : 18px
						font-size : 12px
						line-height : 16px
						color : rgb(7, 17, 27)
						border-bottom : 1px solid rgba(7, 17, 27, 0.1)
						&:last-child
							border : none;
						span 
							margin-right : 4px
							color : rgb(147, 153, 159)
						.icon-thumb_up
							color : rgb(0, 160, 220)
		.introduce,.evaluate
			padding : 18px
			.head
				font-size : 14px
				line-height : 14px
			.info
				font-size : 12px
				line-height : 24px
				color : rgb(77, 85, 93)
				padding : 8px 6px
		.evaluate
			padding : 18px 0px 0px
			.head,.eva-group
				padding : 0px 18px
				overflow:hidden;
			.eva-group
				padding : 12px 0px
				margin : 0px 18px
				border-bottom : 1px solid rgba(7, 17, 27, 0.1)
				span
				    font-size : 8px
				div
					padding : 8px 12px
					font-size : 12px;
					line-height : 16px
					float: left
					border-radius : 4px
					margin-right : 8px
				.all
					background-color : rgb(0, 160, 220)
					color : rgb(255, 255, 255)
				.good
					background-color : rgba(0, 160, 220,0.2)
					color : rgb(77, 85, 93)
				.bad
					background-color : rgba(77, 85, 93,0.2)
					color : rgb(77, 85, 93)
		.img-header
			position : relative
			width : 100%;
			height : 0px
			padding-top:100%
			.img
				top : 0px
				left : 0px
				position : absolute
				width : 100%
				height : 100%
			.back
				position : absolute
				left : 0px
				top : 0px
				padding : 10px
				span
					font-size : 18px
					line-height: 18px
		.interval
			border-bottom : 1px solid rgba(7, 17, 27, 0.1)
			border-top : 1px solid rgba(7, 17, 27, 0.1)
			height : 16px
			background-color : #f3f5f7
		.des
			padding : 18px;
			.name
				font-size : 14px
				font-weight: 700
				color : rgb(7, 14, 27)
				line-height : 14px
			.echo
				font-size : 10px
				color : rgb(147, 153, 159)
				line-height : 10px
				margin : 8px 0px 18px
			.pirce-group
				position : relative
				.purchase
					float: right
					.button-group
						.btn
							display : inline-block
							width : 74px
							text-align : center
							font-size : 10px
							color : rgb(255, 255, 255)
							background-color : rgb(0, 160, 220)
							border-radius : 12px
							line-height : 24px
					.controll
						position absolute
						right : 0px;
						top : -6px
				.price,.oldPrice
					font-size : 10px
					line-height : 24px
					font-weight : 700
				.price
					color : rgb(240, 20, 20)
				.oldPrice
					color : rgb(147, 153, 159)
					text-decoration : line-through;
.slide-food-enter-active,
.slide-food-leave-active{
  transition: all 0.8s ease;
  opacity: 1;
}
.slide-food-enter,
.slide-food-leave-active{
	transform : translateX(100%);
	opacity: 0;
}
</style>
