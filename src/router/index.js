import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './../views/Home.vue'
import Product from './../views/Product.vue'
import Login from './../views/Login.vue'
import User from './../views/user/User.vue'
import UserProducts from './../views/user/UserProducts.vue'
import UserBuy from './../views/user/UserBuy.vue'
import UserSales from './../views/user/UserSales.vue'
import UserEdit from './../views/user/UserEdit.vue'
import store from './../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/product/:id',
    name: 'product',
    component: Product,
    props: true
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    props: true
  },
  {
    path: '/user',
    component: User,
    props: true,
    meta: {
      logged: true,
    },
    children: [
      {
        path: '',
        name: 'user',
        props: true,
        component: UserProducts
      },
      {
        path: 'buys',
        name: 'buys',
        props: true,
        component: UserBuy
      },
      {
        path: 'sales',
        name: 'sales',
        props: true,
        component: UserSales
      },
      {
        path: 'edit',
        name: 'user-edit',
        props: true,
        component: UserEdit
      },

    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return window.scrollTo({ top: 0, behavior: "smooth" })
  }
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.logged)) {
    if (!store.state.logged) {
      next("/login");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router
