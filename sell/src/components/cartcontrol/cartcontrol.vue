<template>
	<div class="cartontrol">
		<transition name='fade'>
		<div class="decrease" v-if="food.count > 0" @click.stop = "decreaseCount">
			<i class="icon-remove_circle_outline"></i>
		</div>
		</transition>	
		<div class="count" v-if="food.count > 0">
			{{food.count}}
		</div>
		<div class="add" @click.stop="addCount()">
			<i class="icon-add_circle"></i>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
import Vue from 'vue';
export default {
	props: ['food'],
	methods: {
		addCount () {
			if (!this.food.count) {
				Vue.set(this.food, 'count', 1);
			} else {
				this.food.count += 1;
			}
			console.log(this.food.count);
		},
		decreaseCount () {
			if (this.food.count) {
			   this.food.count --;
			}
		}
	}
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
	.cartontrol
		div
			display:inline-block;
			float: left;
			font-size : 24px
			line-height:  24px
			padding : 6px
		.add,.decrease
			background-color : rgba(0, 0, 0, 0)
			color : #00a0dc
		.count
			font-size : 12px
			line-height : 24px
			width : 12px
			text-align : center
			padding-top : 6px 0 0 0;
		.icon-remove_circle_outline
			display : inline-block
		.fade-enter-active, .fade-leave-active {
			transition: all .8s linear;
		}
		.fade-enter, .fade-leave-active {
			// transform: translateX(24px);
			transform: translate3D(24px,0,0);
  			opacity: 0
		}
.fade-enter-active .icon-remove_circle_outline,
.fade-leave-active .icon-remove_circle_outline{
	transition: all .8s linear;
	transform : rotate(0deg);
}
		
.fade-enter .icon-remove_circle_outline,
.fade-leave-active .icon-remove_circle_outline{
	transform : rotate(180deg)
}
</style>
