const mongoose = require('mongoose');

// 引入config 第三方模块,项目目录下新建config文件夹
const config = require('config');       

console.log(`mongodb://${config.get('db.username')}:${config.get('db.pwd')}@${config.get('db.host')}:${config.get('db.port')}/${config.get('db.name')}`)
//连接数据库
mongoose.connect(`mongodb://${config.get('db.username')}:${config.get('db.pwd')}@${config.get('db.host')}:${config.get('db.port')}/${config.get('db.name')}`, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log("数据库连接成功"))
        .catch(() => console.log("数据库连接失败"))

// mongoose.connect(`mongodb://${config.get('db.username')}:${config.get('db.pwd')}@120.79.218.59:${config.get('db.port')}/${config.get('db.name')}`, { useNewUrlParser: true, useUnifiedTopology: true })
//         .then(() => console.log("数据库连接成功"))
//         .catch(() => console.log("数据库连接失败"))
