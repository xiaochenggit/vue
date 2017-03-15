import Vue from 'vue';
import Router from 'vue-router';
import Resource from 'vue-resource';
import goods from '@/components/goods/goods.vue';
import ratings from '@/components/ratings/ratings.vue';
import seller from '@/components/seller/seller.vue';
import '@/common/stylus/index.styl';
Vue.use(Router);
Vue.use(Resource);
export default new Router({
  routes: [
    {
      path: '/goods',
      name: 'goods',
      component: goods
    },
    {
      path: '/ratings',
      name: 'ratings',
      component: ratings
    },
    {
      path: '/seller',
      name: 'seller',
      component: seller
    },
    {
      path: '/',
      redirect: '/goods'
    }
  ],
  linkActiveClass: 'active'
});
