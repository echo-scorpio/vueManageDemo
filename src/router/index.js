import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* layout */
const CommonLayout = () => import('@/layout/CommonLayout')

/*  */
const Transfer = () => import('@/pages/transfer')

/* 首页 */
const Dashboard = () => import('@/pages/home')

/* 组件管理 */
const Comp1 = () => import('@/pages/comp-manage/Comp1')
const Comp2 = () => import('@/pages/comp-manage/Comp2')

/* 设置 */
const Setting = () => import('@/pages/setting')

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/common',
      component: CommonLayout,
      children: [
        {
          path: '/transfer/:path(.*)',
          name: 'transfer',
          meta: { hidden: true },
          component: Transfer
        },
        {
          path: '',
          name: 'Dashboard',
          meta: { title: '概览' },
          component: Dashboard
        }, {
          path: 'comp1',
          name: 'Comp1',
          meta: { title: '组件一' },
          component: Comp1
        }, {
          path: 'comp2',
          name: 'Comp2',
          meta: { title: '组件二' },
          component: Comp2
        }, {
          path: 'setting',
          name: 'Setting',
          meta: { title: '设置' },
          component: Setting
        }
      ]
    }
  ]
})

export default router
