const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cors = require('cors')
require('express-async-errors');


// const sqlconnnect = require('./util/dbconfig')

// express 处理cookie API
const cookieParser = require('cookie-parser');


const logger = require('morgan');

// 连接数据库
require ('./utils/db');


const app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(logger('dev'));
// app.use(express.json());    //系统默认限制文件大小 100kb
app.use(express.json({limit:"2048kb"}));

// POST 请求处理 (取代 body-parser)
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());


// 静态资源处理，也会使得访问 url 直接访问文件目录能够获取到 index.html
app.use(express.static(path.join(__dirname, 'public')));



 app.use(cors())
// 或是下载cors 模块， app.use(require('cors')())


if(process.env.NODE_ENV == 'development') {
  console.log('当前是开发环境！');
} else {
  console.log('当前是生产环境！');
}

app.use('/home',(req,res,next)=>{

  if(req.url !='/') {
    next()
  }
  res.sendFile(path.join(__dirname, "public/blog/index.html"))
})


// app.use('/blog-admin',(req,res,next)=>{

//   if(req.url !='/') {
//     next()
//   }
//   res.sendFile(path.join(__dirname, "public/admin/index.html"))
// })

// 放到后面了为了显示出页面
require('./routes/blog')(app)
require('./routes/admin')(app)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.log('404中间件处理')
 // 创建一个404 错误然后错误中间件处理
  next(createError(404));
});


// error handler  
app.use((err, req, res, next) =>{
  console.log('错误中间件处理 err:',err)
  // set locals, only providing error in development
  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};

  if (err.status == 404) {
    res.render('404') 
  } else {
    res.status(err.status || 500).send({
      message: err.message
    })
  }

});


module.exports = app;



