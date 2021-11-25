const { User, validateUser} = require('../../models/user.js');
const { Article } = require('../../models/article')
const{ generateToken, verifyToken } = require('../../utils/token')
const bcrypt = require('bcrypt');
const assert = require('http-assert');
const path = require('path')
const fs = require('fs');
const {dataTime} = require('../../utils/date')
const rimraf = require("rimraf");


module.exports = app => {
    var express = require('express');
    var router = express.Router({
      // 需要让子路由能够获取父路由的 路由参数
      // mergeParams: true
    });
  
    router.post('/:action', async(req,res) => {
      let dataBuffer = Buffer.from(req.body.imgFile.split(',')[1],'base64');
      let uid = req.userInfo._id;
      switch(req.params.action) {
        case 'upload':
          // 忽略文件夹存在报错   
          fs.mkdir(path.join(__dirname,'../../',`/uploads/user/${uid}`),()=>{})   
          // 清空文件夹
          rimraf(path.join(__dirname,'../../',`/uploads/user/${uid}/*`),() => {
            fs.writeFileSync(path.join(__dirname,'../../',`/uploads/user/${uid}/${uid+ dataTime(new Date())}.${req.body.type}`),dataBuffer,
            err =>{
              if( err != null) {
                console.log(err);
                return;
              }
            })
          })
         
          let url = `http://localhost:3000/user/${uid}/${uid + dataTime(new Date())}.${req.body.type}`;
          await req.Model.model.updateOne({_id: uid}, {avatar: url});
          res.send({url,code:20000})
          break;
      }
    });
  
  
    router.get('/:action', async(req,res) => {
      console.log(req.body)
      // 需要赋值为 对象，否则后面会找不到属性
      let data,queryOptions = {};
      switch(req.params.action) {
        case 'personalArticle' :
          data = await req.Model.model.find({author: req.userInfo._id}).populate('author',{username:1,_id: 0});
          res.send({data,code:20000})
          break;
        case 'manage':
          assert(req.userInfo.role === 'admin',401,'当前用户权限不允许访问');
          switch(req.Model.modelName) {
            case 'User':
              queryOptions = {};
              break;
            case 'Article':
              queryOptions.populate = { path: 'author', select: {username: 1,_id: 0}}
              break;
          }
          data = await req.Model.model.find().setOptions(queryOptions);
          res.send({data,code: 20000})
          break;
        case 'detail':
          data = await req.Model.model.findById(req.query.id);
          res.send({data,code: 20000})
          break;
      }
    });
  
  
    router.put('/:id', async(req,res) => {
      let data;
      switch(req.Model.modelName) {
       
        case 'Article':
             data = await req.Model.model.updateOne({_id: req.params.id},{
              title: req.body.title,
              publishTime: new Date(),
              tags : req.body.tags,
              content: req.body.content,
            })
    
           
          break;
        case 'User' :
          data = await req.Model.model.updateOne({_id: req.userInfo._id}, {
            username: req.body.usernam,
            gender: req.body.gender,
            birthday: req.body.birthday,
            area: [req.body.province, req.body.city],
            intro: req.body.intro
          })
          break; 
      }
      res.send({data, code: 20000})
  
    });
  
  
    router.delete('/', async(req,res) => {
      await req.Model.model.findByIdAndDelete(req.query['0'])
      res.send({ code: 20000,data: 'success'})
    });
    



    // 拦截去admin 的请求, 验证token获取用户信息，并通过next（） 传递这些信息方便后期加以判断
    app.use('/admin',async(req,res,next) => {
      const _id = verifyToken(req.headers['x-token']);
      assert(_id|| req.path.includes('login') || req.path.includes('logout'), 401,'请先登录')
      if(_id) {
        const data = await User.findById(_id)
        req.userInfo = data;
      }
      next()
    })

    app.post('/admin/login',async(req,res) => {
      const  { _id,password } =  await User.findOne({email: req.body.email}).select('password') || '';
      if(password && await bcrypt.compare(req.body.password,password)) {
        //返回token
        const token =  generateToken(_id.toString());
        res.send({token,code: 20000})
      } else {
        assert(password && await bcrypt.compare(req.body.password,password), 401, '用户邮箱或是密码错误')
      }
    })
    
    app.get('/admin/info', async(req,res) => {
      const data = await User.findById(req.userInfo._id)
      res.send({data, code: 20000})
    })

    app.post('/admin/logout',(req,res) => {
      res.send({ code: 20000,data: 'success'})
    })
   

    //父路由    其中设置了中间件对模块进行获取
    app.use('/admin/api/rest/:resource', async(req,res,next) => {
      const modelName = req.params.resource.charAt(0).toUpperCase() + req.params.resource.slice(1);
      req.Model = { model: require(`../../models/${req.params.resource}`)[modelName], modelName}
      next()
    }, router)
  
  }
  
  
  
  
  