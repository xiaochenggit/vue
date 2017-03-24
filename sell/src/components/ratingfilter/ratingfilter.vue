<template>
	<div class="ratingfilter">
		<div class="eva-group">
			<div class="all" @click='getRatings($event)' :class='{active:RatingType==2}'>全部<span>{{this.evaAll}}</span></div>
			<div class="good" @click='getRatings($event)' :class='{active:RatingType==0}'>推荐<span>{{this.evaGood}}</span></div>
			<div class="bad" @click='getRatings($event)' :class='{active:RatingType==1}'>吐槽<span>{{this.evaBad}}</span></div>
		</div>
		<div class="filter" @click.stop='changeRatingIsFilter()'>
			<span class='icon-check_circle' :class='{yes:ratingIsFilter}'></span>只看有内容的评价
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
export default {
	data () {
		return {
			ratings: [],
			fiterRatings: [],
			RatingType: 2,
			evaAll: 0,
			evaGood: 0,
			evaBad: 0,
			ratingIsFilter: false
		};
	},
	mounted () {
		this.$nextTick(function () {
			var _this = this;
			this.$http.get('/api/ratings').then(function (res) {
				if (res.body.erron == 0) {
					_this.ratings = res.body.data;
					_this.getDate();
				}
			});
		});
	},
	methods: {
		getRatings: function (event) {
			var target = event.target;
			var className = target.getAttribute('class');
			if (!className) {
				className = target.parentNode.getAttribute('class');
			}
			switch (className) {
				case 'all':
					this.RatingType = 2;
					break;
				case 'good':
					this.RatingType = 0;
					break;
				case 'bad':
					this.RatingType = 1;
					break;
			}
		},
		getDate: function () {
			this.fiterRatings = this.ratings;
			this.evaAll = this.ratings.length;
			var _this = this;
			this.ratings.forEach(function (rating) {
				if (rating.rateType == 0) {
					_this.evaGood += 1;
				} else {
					_this.evaBad += 1;
				}
			});
		},
		changeRatingIsFilter: function () {
			this.ratingIsFilter = !this.ratingIsFilter;
		}
	},
	computed: {
		reMessage: function () {
			var arr = [];
			var _this = this;
			this.ratings.forEach(function (rating) {
				if (_this.ratingIsFilter) {
					if (rating.text) {
						arr.push(rating);
					}
				} else {
					arr.push(rating);
				}
			});
			var arr1 = [];
			arr.forEach(function (rating) {
				if (_this.RatingType == 2) {
					arr1.push(rating);
				} else {
					if (rating.rateType == _this.RatingType) {
						arr1.push(rating);
					}
				}
			});
			return arr1.length;
		}
	}
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
.ratingfilter
	.eva-group
		padding : 12px 0px
		margin : 0px 18px
		border-bottom : 1px solid rgba(7, 17, 27, 0.1)
		overflow: hidden
		span
		    font-size : 8px
		div
			padding : 8px 12px
			font-size : 12px;
			line-height : 16px
			float: left
			border-radius : 4px
			margin-right : 8px
			color : rgb(77, 85, 93)
		.all
			background-color : rgba(0, 160, 220,0.2)
			&.active
				color : rgb(255, 255, 255)
				background-color : rgb(0, 160, 220)
		.good
			background-color : rgba(0, 160, 220,0.2)
			&.active
				color : rgb(255, 255, 255)
				background-color : rgb(0, 160, 220)
		.bad
			background-color : rgba(77, 85, 93,0.2)
			&.active
				color : rgb(255, 255, 255)
				background-color : rgb(77, 85, 93)
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
</style>
