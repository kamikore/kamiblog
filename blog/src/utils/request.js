import axios from 'axios'
import {ElMessage} from 'element-plus'


// axios.defaults.withCredentials = true;
// create an axios instance
// axios.create([config])  
const instance = axios.create({
    baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 10000 // request timeout
  })
  

// axios 拦截器
instance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}` || '';
	console.log('请求：',config)
	return config
},(err) => {
	console.log(err)
	return Promise.reject(err)
});

instance.interceptors.response.use(response => {
	console.log('响应:',response)
    return response
  }, err => {
    // 如果 err.response 为空
    if(!err.response && !err.config.retry) {
      ElMessage.error('请求超时 ！！！')
      return Promise.reject(err);
    } 
    console.log('响应拦截器处理:' ,err.response,'err : ', err)
    ElMessage.error(err.response.data.message)
    return Promise.reject(err)
  });


// 暴露出axios 实例，api直接引入后直接使用
  export default instance
