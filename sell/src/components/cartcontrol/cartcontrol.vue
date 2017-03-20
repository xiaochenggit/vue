<template>
	<div class="cartontrol">
		<div class="decrease" v-if="food.count > 0" @click = "decreaseCount">
			<i class="icon-remove_circle_outline"></i>
		</div>
		<div class="count" v-if="food.count > 0">
			{{food.count}}
		</div>
		<div class="add" @click="addCount()">
			<i class="icon-add_circle"></i>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
import Vue from 'vue';
export default {
	props: ['food'],
	methods: {
		addCount (event) {
			if (!this.food.count) {
				Vue.set(this.food, 'count', 1);
			} else {
				this.food.count += 1;
			}
			console.log(this.food.count);
		},
		decreaseCount () {
			this.food.count --;
		}
	}
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
	.cartontrol
		div
			display:inline-block
			font-size : 24px
			line-height:  24px
			padding : 6px
		.add,.decrease
			background-color : rgba(0, 0, 0, 0)
			color : #00a0dc
		.count
			font-size : 12px
			line-height : 24px
</style>
