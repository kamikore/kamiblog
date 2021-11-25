import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
// const hljs = require("highlight.js");


// import "./mock"
import '../public/css/iconfont.css'
// 引入 nProgress CSS, nProgress 在路由 index.js引入并设置
import 'nprogress/nprogress.css'
import '../public/css/github-markdown.css'
// 完整引入组件
// import ElementPlus from 'element-plus'
import  api from '@/api'


import { 
	 ElLoading, 
	 ElMessage,
	 ElButton,  
	 ElAutocomplete , 
	 ElDropdown, ElDropdownMenu, ElDropdownItem,
	 ElInput, 
	 ElPagination,
	 ElForm, ElFormItem,
	 ElCol,ElRow,
	 ElDialog,
	 ElCheckbox,ElCheckboxGroup
} from 'element-plus';



const components = [ 
	ElButton, 
	ElAutocomplete,
	ElDropdown, ElDropdownMenu , ElDropdownItem,
	ElInput, 
	ElPagination,
	ElForm,ElFormItem,
	ElCol,ElRow,
	ElDialog,
	ElCheckbox,ElCheckboxGroup];
const plugins = [ ElLoading, ElMessage  ];


const app = createApp(App);
// 挂载到vue 原型
app.config.globalProperties.$api = api;


components.forEach((component) => {
	app.component(component.name, component)
})
plugins.forEach((plugin) => app.use(plugin));

// axios 配置
// axios.defaults.baseURL = 'http://localhost:3000'
// app.config.globalProperties.$axios = axios;



app.use(store).use(router).mount('#app');

export default app;

// createApp(App).use(store).use(router).component('ElButton',ElButton).mount('#app')