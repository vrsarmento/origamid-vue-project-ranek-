import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import NotFound from './views/NotFound.vue'
import Product from './views/Product.vue'
import Login from './views/Login.vue'
import User from './views/user/User.vue'
import UserProducts from './views/user/UserProducts.vue'
import UserEdit from './views/user/UserEdit.vue'
import UserPurchases from './views/user/UserPurchases.vue'
import UserSales from './views/user/UserSales.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      component: NotFound
    },
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/produto/:id',
      name: 'product',
      component: Product,
      props: true,
    },
    {
      path: '/usuario',
      component: User,
      meta: {
        login: true,
      },
      children: [
        {
          path: "",
          name: "user",
          component: UserProducts
        },
        {
          path: "editar",
          name: "user-edit",
          component: UserEdit
        },
        {
          path: "compras",
          name: "user-purchases",
          component: UserPurchases
        },
        {
          path: "vendas",
          name: "user-sales",
          component: UserSales
        }
      ]
    },
  ],
  scrollBehavior() {
    return window.scrollTo({top: 0, behavior: "smooth"});
  }
});

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.login)) {
    if(!window.localStorage.rnktkn) {
      next("/login");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;