<template>
	<div class="ratings-t">
		<div class="rating-warp">
			<div class="rating-head">
				<div class="rating-head-left">
					<h2 class="score">{{seller.score}}</h2>
					<p class="des">综合评分</p>
					<p class="part">高于周边商家{{seller.rankRate}}%</p>
				</div>
				<div class="rating-head-right">
					<div class="serviceScore">
						<span>服务态度</span>
						<div class="star-warp">
							<v-star :size='36' :score='seller.serviceScore' ></v-star>
						</div>
						<span class='score'>{{seller.serviceScore}}</span>
					</div>
					<div class="foodScore">
						<span>食物评分</span>
						<div class="star-warp">
							<v-star :size='36' :score='seller.foodScore' ></v-star>
						</div>
						<span class='score'>{{seller.foodScore}}</span>
					</div>
					<div class="sendTime">
						<span>送达时间</span>
						<span class='time'>{{seller.deliveryTime}}分钟</span>
					</div>
				</div>
			</div>
			<div class="interval">
			</div>
			<div class="ratingfilter-warp">
				<v-ratingfilter ref='ratingfilter'></v-ratingfilter>
			</div>
			<div class="ratingUsers" v-if='ratings'>
				<ul>
					<li v-for='rating in ratings' class="rating">
						<div class="user-img">
							<img :src='rating.avatar' :alt="rating.username">
						</div>
						<div class="user-content">
							<div class="contenthaed">
								<div class="top">
									<div class="name">{{rating.username}}</div>
									<div class="time">{{rating.rateTime|formatDate}}</div>
								</div>
								<div class="down">
									<v-star size='24' :score='rating.score'></v-star>
									<div class="deliveryTime">{{rating.deliveryTime}}</div>
								</div>
								<div class="des">
									 {{rating.text}}
								</div>
							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
import star from '../star/star';
import ratingfilter from '../ratingfilter/ratingfilter';
import {formateDate} from '@/common/js/date';
export default {
	props: ['seller'],
	data () {
		return {
			ratings: []
		};
	},
	components: {
		'v-star': star,
		'v-ratingfilter': ratingfilter
	},
	mounted () {
		this.$nextTick(function () {
			var _this = this;
			this.$http.get('/api/ratings').then(function (res) {
				if (res.body.erron == 0) {
					_this.ratings = res.body.data;
				}
			});
		});
	},
	computed: {
		getratings: function () {
			this.$nextTick(function () {
				return this.$refs.ratingfilter.reMessage;
			});
		}
	},
	filters: {
		formatDate (time) {
			let date = new Date(time);
			return formateDate(date, 'yyyy-MM-dd hh:mm');
		}
	}
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
	.ratings-t
		position: absolute
		top : 175px
		bottom : 40px 
		width : 100%
		.rating-head
			display : flex
			padding : 18px 0px
			.rating-head-left
				flex : 0 0 136px
				width : 136px
				text-align : center
				border-right: 1px solid rgba(7, 17, 27, 0.1)
				.score
					font-size : 24px
					color : rgb(255, 153, 0)
					line-height: 28px
				.des
					font-size : 12px
					color : rgb(7, 17, 27)
					line-height : 12px
					margin : 6px 0px 8px
				.part
					font-size : 12px
					color : #acb4bb
					line-height : 12px
			.rating-head-right
				padding : 0px 24px
				font-size : 12px 
				line-height : 18px
				flex : 1
				.serviceScore,.foodScore
					overflow : hidden
					margin-bottom : 8px
					text-align:center
				span 
					float : left
					color : rgb(7, 17, 27)
					&.score
						color : rgb(255, 153, 0)
				.star-warp
					float : left
					margin : 0 12px 0
				.time 
					margin-left : 12px
					color : rgb(147, 153, 159)
		.interval
			border-bottom: 1px solid rgba(7,17,27,0.1);
			border-top: 1px solid rgba(7,17,27,0.1);
			height: 16px;
			background-color: #f3f5f7;
		.ratingUsers
			.rating
				display : flex
				padding : 18px
				.user-img
					flex : 0 0 28px
					width : 28px
					height : 28px
					margin-right : 12px
					img
						width : 28px
						height : 28px
						border-radius : 50%
				.user-content
					flex : 1
					.contenthaed
						.top
							display:flex
							font-size : 12px
							line-height : 12px
							.name
								flex:1
							.time
								float:right
								color: rgb(147, 153, 159)
						.down
							margin : 4px 0px 6px
							overflow : hidden
							.star
								float : left
							.deliveryTime
								float : left
								color: rgb(147, 153, 159)
								font-size : 12px
								line-height : 12px
								margin-left : 6px
</style>
