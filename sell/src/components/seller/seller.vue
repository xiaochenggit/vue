<template>
	<div class="seller">
		<div class="sellerwapper">
			<div class="seller-des">
				<div class="seller-des-header">
					<h1 class="name">{{seller.name}}</h1>
					<div class="des">
						<div class="starwapper">
							<v-star :size="36" :score='seller.score'></v-star>
						</div>
						<span class='text'>({{seller.ratingCount}})</span>
						<span class='text'>月售{{seller.sellCount}}单</span>
					</div>
				</div>
				<ul class="seller-des-body">
					<li class="item">
						<h2>起送价</h2>
						<p><span>{{seller.minPrice}}</span>元</p>
					</li>
					<li class="item">
						<h2>商家配送</h2>
						<p><span>{{seller.deliveryPrice}}</span>元</p>
					</li>
					<li class="item">
						<h2>平均配送时间</h2>
						<p><span>{{seller.deliveryTime}}</span>分钟</p>
					</li>
				</ul>
			</div>
			<div class="interval"></div>
			<div class="notice">
				<h2>公告与活动</h2>
				<p class="des">{{seller.bulletin}}</p>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
import star from '../star/star';
export default {
	props: ['seller'],
	components: {
		'v-star': star
	}
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
	.seller
		position: absolute
		top : 174px
		bottom : 0px
		width : 100%
		overflow: hidden
		.seller-des
			padding : 18px
			.seller-des-header
				border-bottom : 1px solid rgba(7, 17, 27, 0.1)
				.name
					font-size : 14px 
					line-height : 14px
					color : rgb(7, 17, 27)
				.des
					margin : 8px 0 18px
					.starwapper
						float: left
					span.text
						margin : 0px 8px
						color : rgb(77, 85, 93)
						line-height : 18px
						font-size : 12px
						&:last-child
							margin : 0px
			.seller-des-body
				padding : 18px 0px 0px
				display : flex
				.item
					flex : 1
					text-align : center
					border-right : 1px solid rgba(7, 17, 27, 0.1)
					&:last-child
						border-right : none
					h2
						font-size : 12px
						line-height : 12px
						color : rgb(147, 153, 159)
						margin-bottom: 4px
					p
						margin-top: 4px
						font-size : 12px
						span
							font-size : 24px
							line-height : 24px
							color : rgb(7, 17, 27)
		.interval
			border-bottom : 1px solid rgba(7,17,27,0.1)
			border-top : 1px solid rgba(7,17,27,0.1)
			height : 16px
			background-color : #f3f5f7
		.notice
			padding : 18px 18px 16px 18px
			h2
				font-size : 14px 
				line-height : 14px
				color : rgb(7, 17, 27)
				margin-bottom : 8px
			p.des
				padding : 0px 12px
				font-size : 12px
				line-height : 24px
				color : rgb(240, 20, 20)
</style>
