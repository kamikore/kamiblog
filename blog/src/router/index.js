import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'
import store from '../store'
import { ElMessage, ElLoading } from "element-plus";
import {verifyToken,getUser} from '@/api/user'

//  path 的 name 在路由导航to,from 会用到
const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    name: 'Home',
    path: '/home',
    component: () => import('@/views/Home.vue')
  },
  // 设置动态匹配路由
  {
    name: 'ArticleDetail',
    path: '/home/article/details/:id',
    component:  () => import('@/views/ArticleDetail.vue'),

  },
  {
    name: 'Edit',
    path: '/edit',
    components: {editor : () => import('@/views/Editor.vue')} 
  },
]

const router = createRouter({
  // 使用 createWebHistory，但它要求正确配置服务器
  history: createWebHistory(),
  routes
})


// inc 同样会启动进度条并随机增长，传入参数则按特定值增长，注意，这个方法并不会让进度条达到100%，而且会带转圈圈！！。
NProgress.inc(0.2);

// 配置
NProgress.configure({
  ease:'ease',
  speed:500,
  showSpinner:false,
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.3 // 初始化时的最小百分比
})


let path={
  'Home':'首页',
  'Friend':'友链',
  'Comment':'留言板',
  'About':'关于我',
  'File':'归档',
  'Edit':'文章发表',
  'ArticleDetail':'文章详情 '
}

// 修改网页标题
router.beforeEach( async(to, from, next) => {
  
  // ElLoading.$loading({fullscreen: true});
  document.title=path[to.name]
  const token = localStorage.getItem("token");
  if (token) {
    // 等待 验证完毕 并且 登录状态改变
    await verifyToken({ token }).then((res) => {
      switch (res.data.status) {
        case 0:
          store.dispatch("change_login", true);
          getUser(res.data._id).then((res) => {
            store.dispatch("change_userInfo", res.data.data);
          });
          break;
        case 1:
          localStorage.removeItem("token");
          console.log(res.data.message);
          break;
      }
    });
  }
 
  if( to.name === 'Edit' && !store.state.loginStatus ) {

    //返回来的路由不太好，如果是直接输入 Edit地址，会一直循环执行
    next('/')
    ElMessage.warning('请先登录 ！！！')
  } else if(to.name === 'Edit'){
    document.querySelector('.placeholder').style.height = '75px'
  } else {
    document.querySelector('.placeholder').style.height = '0px'
  }

   //避免 锚链接触发 beforeEach
   if(to.path != from.path) {
   // 不会有转圈圈，同样不会到达100%
   NProgress.start()
  }
  next()
})


//导航被确认后调用，即前置路由完成时
router.afterEach((to, from) => {
  to.name === 'Edit'?  document.body.style.position = 'fixed': document.body.style.position = ' static';
  NProgress.done()
})


export default router
