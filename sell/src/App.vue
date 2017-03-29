<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/goods" :seller="seller">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <router-view :seller='seller'></router-view>
    <!-- <div class="content">
      am content
    </div> -->
    <!-- 源代码 -->
    <!-- <img src="./assets/logo.png">
    <router-view></router-view> -->
  </div>
</template>

<script>
// export default {
//   name: 'app'
// };
// 引用组件
import header from './components/header/header.vue';
const ERR_OR = 0;
export default {
  data () {
    return {
      seller: {}
    };
  },
  mounted () {
    this.$nextTick(function () {
      this.$http.get('/api/seller').then(function (response) {
        if (response.body.errno == ERR_OR) {
          this.seller = response.body.data;
        }
      });
    });
  },
  components: {
    'v-header': header
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
// 载入样式
@import "./common/stylus/mixin.styl"
/*样式*/
#app
  .tab
    display:flex
    width : 100%
    height : 40px
    line-height : 40px
    border-1px(rgba(7, 17, 27, 0.1))
    background-color : #fff;
    .tab-item
      flex : 1
      text-align : center
      &>a
        display : block
        font-size : 14px
        color : rgb(77,85,93)
        &.active
          color : rgb(240, 20, 20)
</style>
