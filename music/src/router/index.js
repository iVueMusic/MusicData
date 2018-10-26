import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/index/login'
import regist from '@/components/index/regist'
import home from '@/components/index/home'
import commend from '@/components/index/commend'
import ranking from '@/components/index/ranking'
import search from '@/components/index/search'
import singer from '@/components/index/singer'
import detailst from '@/components/index/detailst'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:{
        path:'/login'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/regist',
      name: 'regist',
      component: regist
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      children: [
        {
          path:'',
          redirect:'commend'
        },
        {
          path: 'commend',
          name: 'commend',
          component: commend,
          children: [
            {
              path: 'detailst',
              name: 'detailst',
              component: detailst
            }
          ]
        },
        {
          path: 'ranking',
          name: 'ranking',
          component: ranking,
        },
        {
          path: 'search',
          name: 'search',
          component: search,
        },
        {
          path: 'singer',
          name: 'singer',
          component: singer,
          children: [
            {
              path: 'detailst',
              name: 'detailst',
              component: detailst
            }
          ]
        },
        
      ]
    }
  ]
})
