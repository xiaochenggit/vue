<template>
	<div class="seller" ref="sellerScroll">
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
				<div class="favorite" @click="toggleFavorite($event)">
					<span class='icon-favorite' :class = '{ active : favorite}' ></span>
					<span class='favoriteText' :class = '{ active : favorite}'>{{favoriteText}}</span>
				</div>
			</div>
			<div class="interval"></div>
			<div class="notice">
				<h2>公告与活动</h2>
				<p class="des">{{seller.bulletin}}</p>
				<div class="supports">
					<div v-for="support in seller.supports">
						<span class='icon' v-bind:class="{ decrease: support.type == 0 ,discount : support.type == 1 , guarantee : support.type == 2 , invoice : support.type == 3 , special : support.type == 4}"></span>{{support.description}}
					</div>
				</div>
			</div>
			<div class="interval"></div>
			<div class="shopImgs">
				<h2>商家实景</h2>
				<div class="picsWarpper" ref='pisScrol'> 
					<ul class="pics" ref='pics'>
						<li v-for = 'pic in seller.pics' class="pic"><img :src="pic"></li>
					</ul>
				</div>
			</div>
			<div class="interval"></div>
			<div class="shopImgs">
				<h2>商家信息</h2>
				<div v-for = 'info in seller.infos'>
					{{info}}
				</div>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
import {saveToLocal, loadFromLocal} from '@/common/js/store';
import BScroll from 'better-scroll';
import star from '../star/star';
export default {
	props: ['seller'],
	components: {
		'v-star': star
	},
	data () {
		return {
			favorite: false
		};
	},
	computed: {
		favoriteText () {
			return this.favorite ? '已收藏' : '收藏';
		}
	},
	methods: {
		// 竖向滚动
		_initScroll () {
			this.$nextTick(function () {
				if (!this.sellerScroll) {
					this.sellerScroll = new BScroll(this.$refs.sellerScroll, {
						click: true
					});
				} else {
					this.sellerScroll.refresh();
				}
			});
		},
		// 横向滚动
		_pisScroll () {
			// 先要这只宽度，只有宽度跟上才能够滑动
			if (this.seller.pics) {
				let picWidth = 120;
				let marginRight = 6;
				let width = (picWidth + marginRight) * this.seller.pics.length - marginRight;
				this.$refs.pics.style.width = width + 'px';
				this.$nextTick(() => {
					if (!this.pisScrol) {
						this.pisScrol = new BScroll(this.$refs.pisScrol, {
							scrollX: true,
							eventPassthrough: 'vertocal'
						});
					} else {
						this.pisScrol.refresh();
					}
				});
			}
		},
		toggleFavorite (event) {
			if (!event._constructed) {
				return;
			}
			this.favorite = !this.favorite;
			// 存储数据到 localStorage
			saveToLocal(this.seller.id, 'favorite', this.favorite);
		}
	},
	watch: {
		seller: function () {
			 this._initScroll();
			 this._pisScroll();
			 this.favorite = loadFromLocal(this.seller.id, 'favorite', false);
		}
	},
	mounted: function () {
	    this._initScroll();
	    this._pisScroll();
	}
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin.styl"
	.seller
		position: absolute 
		width: 100%
		top: 174px
		bottom: 46px
		overflow: hidden
		.seller-des
			position : relative
			padding : 18px
			.favorite
				width : 36px
				position : absolute
				right : 18px
				top : 18px
				text-align : center
				.icon-favorite
					font-size : 24px
					line-height : 24px
					display : block
					color : #d4d6d9
					&.active
						color : red
				.favoriteText
					font-size : 12px 
					line-height : 12px 
					color : #d4d6d9
					&.active
						color : rgb(77, 85, 93)
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
				margin-bottom : 16px
			.supports
				.icon
					display : inline-block
					width : 16px
					height : 16px
					margin-right : 12px
					background-size : 16px 16px
					background-repeat : no-repeat
					vertical-align : top
					&.decrease
						bg-image('decrease_4')
					&.discount
						bg-image('discount_4')
					&.guarantee
						bg-image('guarantee_4')
					&.invoice
						bg-image('invoice_4')
					&.special
						bg-image('special_4')
				div
					padding : 16px 12px
					font-size : 12px
					line-height : 16px
					color : rgb(7, 17, 27)
					border-top : 1px solid rgba(7, 17, 27, 0.1)
		.shopImgs
			padding : 16px 16px 16px 16px
			h2
				font-size: 14px;
				line-height: 14px;
				color: #07111b;
				margin-bottom: 12px;
			div
				font-size : 12px
				color : rgb(7,17,27)
				line-height : 16px
				padding : 16px 12px
				border-top : 1px solid rgba(7, 17, 27, 0.1)
			.picsWarpper
				width : 100%
				white-space : nowrap
				overflow : hidden
				padding : 0px
				border : none
				.pics
					white-space : nowrap
					.pic
						display : inline-block
						width : 120px
						height : 90px
						overflow : hidden
						margin-right : 6px
						&:last-child
							margin : 0px
						img
							float : left
							width : 100%
							height : 100%
</style>
