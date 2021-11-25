// 监听文件变化，更新
const chokidar = require('chokidar')
const bodyParser = require('body-parser')
// 颜色插件，使终端输出的字体带颜色 ？？
const chalk = require('chalk')
const path = require('path')
const Mock = require('mockjs')
// const { map } = require('core-js/core/array')

// process.cwd() 方法返回 Node.js 进程的当前！！！工作目录 ！！！  F:\Web Design\Vue\code\myblog\admin\mock 。
const mockDir = path.join(process.cwd(), 'mock')


// 注册响应路由
function registerRoutes(app) {
  let mockLastIndex

  // 获取到路由接口
  const { mocks } = require('./index.js')
  console.log('mocks:', mocks);


  // map()方法是js Array 方法返回一个新数组，数组中的元素为原始数组元素调用函数处理后的值，route为数组的元素
  const mocksForServer = mocks.map(route => {
    // 注册信息中只是做了return 没有做出响应，经函数返回后才是真正的响应路由信息
    return responseFake(route.url, route.type, route.response)
  })
  // 路由配置信息数组

  console.log('mocksForServer :',mocksForServer)



  // 注册服务器响应路由
  for (const mock of mocksForServer) {
    // app.get('url',callback})
    app[mock.type](mock.url, mock.response)
    mockLastIndex = app._router.stack.length
  }
  const mockRoutesLength = Object.keys(mocksForServer).length
  return {
    mockRoutesLength: mockRoutesLength,
    mockStartIndex: mockLastIndex - mockRoutesLength
  }
}

function unregisterRoutes() {
  Object.keys(require.cache).forEach(i => {
    if (i.includes(mockDir)) {
      delete require.cache[require.resolve(i)]
    }
  })
}

// for mock server  
const responseFake = (url, type, respond) => {
  return {
    // 拼接上baseurl 然后统一转正则形式
    url: new RegExp(`${process.env.VUE_APP_BASE_API}${url}`),
    type: type || 'get',
    // 相当于直接从 app 内拿到 （req,res）
    response(req, res) {
      // 请求被调用
      console.log('request invoke:' + req.path)
/* 
 Mock.mock( rurl, function( options ) )
记录用于生成响应数据的函数。当拦截到匹配 rurl 的 Ajax 请求时，函数 function(options) 将被执行，并把执行结果作为响应数据返回。
*/
      res.json(Mock.mock(respond instanceof Function ? respond(req, res) : respond))    //直接就是return 的数据
    }

  }
}


// 动态注册路由
// 暴露出接收 路由实例的方法，该方法将作为 devserver.before 的自定义中间件执行 https://v4.webpack.docschina.org/configuration/dev-server/#devserver-before
module.exports = app => {
  console.log('工作目录:',mockDir);       //F:\Web Design\Vue\code\myblog\admin\mock
  // parse app.body
  // https://expressjs.com/en/4x/api.html#req.body
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({
    extended: true
  }))

  const mockRoutes = registerRoutes(app)
  var mockRoutesLength = mockRoutes.mockRoutesLength
  var mockStartIndex = mockRoutes.mockStartIndex

  
  // watch files, hot reload mock server ！！！！
  chokidar.watch(mockDir, {
    ignored: /mock-server/,
    ignoreInitial: true
  }).on('all', (event, path) => {
    if (event === 'change' || event === 'add') {
      try {
        // remove mock routes stack
        app._router.stack.splice(mockStartIndex, mockRoutesLength)

        // clear routes cache
        unregisterRoutes()

        const mockRoutes = registerRoutes(app)
        mockRoutesLength = mockRoutes.mockRoutesLength
        mockStartIndex = mockRoutes.mockStartIndex

        console.log(chalk.magentaBright(`\n > Mock Server hot reload success! changed  ${path}`))
      } catch (error) {
        console.log(chalk.redBright(error))
      }
    }
  })
}
