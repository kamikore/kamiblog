import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'


const state = {
  tags: [
    {tag:'前端',tagItems: ['json','jquery','html','css','javascript','typescript','h5','es6','css3','ajax','vue','react','angular']},
    {tag:'后端',tagItems: ['java','C#','C++','C语言','python','php','node.js','django','golang']},
    {tag:'运维',tagItems: ['docker','nginx','linux','负载均衡','ssh']},
    {tag:'测试',tagItems: ['postman','单元测试','压力测试','集成测试']},
    {tag:'网络',tagItems: ['http','https','ssl','websocket','tcp/ip','udp']},
    {tag:'计算机基础',tagItems:['操作系统','网络协议','数据结构与算法']},
    {tag:'数据库',tagItems: ['mongodb','mongoose','mysql','navicat']}
  ],
}

export default {
    // 采用命名空间，调用也需要路径调用
    namespaced: true,
    state,
  }
  