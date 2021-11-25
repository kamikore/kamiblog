const { User, validateUser} = require('../../models/user.js');
const{ generateToken, verifyToken } = require('../../utils/token')
const bcrypt = require('bcrypt');
const assert = require('http-assert')
const fs = require('fs');
const path = require('path')

module.exports = app => {
  var express = require('express');
  
  var router = express.Router({
    // 需要让子路由能够获取父路由的 路由参数
    mergeParams: true
  });
  
// 添加资源
  router.post('/:action', async(req,res) => {
    assert(verifyToken(req.body.uid), 401, '登录过期 ！！！');
  
    let uid = verifyToken(req.body.uid);
    
    switch(req.params.action) {
      case 'publish': 
        await req.Model.create({
          content: req.body.content,
          author: uid,
          title: req.body.title,
          tags: req.body.tags
        }).catch( err => {
          assert(false, 406, err.message)
        })
        res.send()
    
        break;

      case 'upload':
        let dataBuffer = Buffer.from(req.body.imgFile.split(',')[1],'base64');
        fs.mkdir(path.join(__dirname,'../../',`/uploads/article/${uid}`),()=>{});   
        fs.writeFileSync(path.join(__dirname,'../../',`/uploads/article/${uid}/${req.body.fileName}.${req.body.type}`),dataBuffer,
        err =>{
          if( err != null) {
            console.log(err);
            return;
          }
        })
        let url = `http://localhost:3000/article/${uid}/${req.body.fileName}.${req.body.type}`;
        res.send({url,code:20000})
        break;
    }
  });

// 获取资源
  router.get('/:action/:data', async(req,res) => {
    // const queryOptions ={}
    // if (req.Model.modelName === 'Category') {
    //   queryOptions.populate = 'parent'
    // }
    // const items = await req.Model.find().setOptions(queryOptions).limit(10)
    // console.log(req.Model.modelName)
    let items = {};
    switch(req.params.action) {
      case 'page':
        items.total = await req.Model.find().count();
        items.data = await req.Model.find().populate('author',{username:1,avatar:1,_id: 0}).skip((req.params.data-1)*8).sort({'publishTime': -1}).limit(8);
        break;
      case 'details':
        items.data = await req.Model.findById(req.params.data).populate('author',{username:1,avatar:1,_id: 0});
        break;
      case 'info': 
        items.data = await req.Model.findById(req.params.data);
        break;
      case 'comment': 
        items.data = await req.Model.findById(req.params.data);
        break;
    }
    res.send(items);
  });

// 更新资源
  router.put('/:action/:id', async(req,res) => {
    switch(req.params.action) {
      case 'comment':
        var {comment} = await req.Model.findOne({_id: req.params.id});  // case 不用块级
        // push 对象, { 用户名 ： 评论内容}
        comment.push(req.body)
        await req.Model.updateOne({_id: req.params.id},{
              comment
          }).then(() => {
            res.send(comment)
          }).catch((err)=>{
            console.log(err)
          })
        break;

      case 'reply':
        var {comment} = await req.Model.findOne({_id: req.params.id});  
        console.log(comment)
        comment[req.body.index].replyList.push(req.body.reply)
        await req.Model.updateOne({_id: req.params.id},{
              comment
          }).then(() => {
            res.send(comment)
          }).catch((err)=>{
            console.log(err)
          })
        break;

    }
      

  });

// 删除资源
  router.delete('/', async(req,res) => {
    await req.Model.findByIdAndDelete(req.params.id)
    res.send({
      success: true
    });
  });



  // token 验证，改变登录状态，但不应该报错误码
  app.use('/blog/api/verify', async(req,res) =>{
      const _id = verifyToken(req.headers.authorization.split(' ').pop())
      //注意校验字段中加了 类型 bearar
      if (_id) {
        res.send({status:0, _id,message: '校验通过'})
      }else {
        res.send({status:1, message: '校验失败'})
      }
  });


  // 动态匹配 通用CURD, req.url 是在路由地址的基础上的， baseurl 就是/blog/api/rest/:resource, 其中设置了中间件对模块进行获取
  app.use('/blog/api/rest/:resource', (req,res,next) => {
    const modelName = req.params.resource.charAt(0).toUpperCase() + req.params.resource.slice(1);
    req.Model = require(`../../models/${req.params.resource}`)[modelName]

    next()
  }, router)



  // 登录 / 注册
  app.post('/blog/api/login', async(req,res) => {
    //取字符串,由于为 null 无法对象解构，所以做取空
    const  { _id,password } =  await User.findOne({email: req.body.email}).select('password') || '';
    if(password && await bcrypt.compare(req.body.password,password)) {
      //返回token
      const token =  generateToken(_id.toString());
      res.send({token,_id})
    } else {
      assert(password && await bcrypt.compare(req.body.password,password), 401, '用户邮箱或是密码错误')
    }
  });


  app.post('/blog/api/register', async(req,res) => {
    await validateUser(req);

    // 判断用户信息是否已存在
    assert( !await User.findOne({username: req.body.username}), 401, '该用户名已注册 ！！！');
    assert( !await User.findOne({email: req.body.email}), 401, '该用邮箱已注册 ！！！');


     //用户密码 加盐加密
     const salt = await bcrypt.genSalt(10);    
     const password = await bcrypt.hash(req.body.password,salt);
     req.body.password = password;

    // 这里是 mongoserver 的集合规则 捕捉错误让代码继续执行, 由于规则本身错误信息难以统一，所以主要还是joi验证
    await User.create(req.body).catch(err => {
      assert(false, 401, err.message)
    })

    res.send()
  });


}




