import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Product from './views/Product.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/produto/:id',
      name: 'produto',
      component: Product,
      props: true,
    },
  ],
  scrollBehavior() {
    return window.scrollTo({top: 0, behavior: "smooth"});
  }
})
