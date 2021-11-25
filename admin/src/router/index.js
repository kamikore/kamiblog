import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/layout'


export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    // 直接触发子路由 dashboard
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },

 
  {
    path: '/article',
    component: Layout,
    // 直接的地址栏输入的行为
    redirect: '/article/index',
    // name: 'Article',
    meta: { title: 'Article', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'index',
        name: 'Article',
        component: () => import('@/views/article/index'),
        meta: { title: '个人文章', icon: 'table' }
      },
    ]
  },

  {
    path: '/form',
    component: Layout,
    redirect: '/form/index',
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: '个人信息', icon: 'form' }
      }
    ]
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        name: 'Menu2',
        meta: { title: 'menu2' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'http://localhost:8888',
        meta: { title: '博客页', icon: 'link' }
      }
    ]
  },

]

export const asyncRoutes = [
  {
    path: '/manage/user',
    component: Layout,
    redirect: '/manage/user/index',
    children: [
      {
        path: 'index',
        name: 'User',
        component: () => import('@/views/manage/user/index'),
        meta: { title: '用户管理', icon: 'form',roles: ['admin'] }
      }
    ]
  },
  {
    path: '/manage/article',
    component: Layout,
    redirect: '/manage/article/index',
    children: [
      {
        path: 'index',
        name: 'manageArticle',
        component: () => import('@/views/manage/article/index'),
        meta: {title: '文章管理',icon: 'form',roles: ['admin']}
      }
    ]
  },

   // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]



const createRouter = () => new Router({
  // mode: 'history', // require service support
  // 路由滚动行为，只要路由变化滚动条就会按照行为滚动，如果是离开当前路由页面的，就会看到离开路由时才会触发滚动，最好效果是当前页的导航
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  console.log('resetRouter ~!')
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
