const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 12,
        unique: [true,'该用户名已存在'],         // 是否唯一
        
    },
    email: {
        type: String,
        required: true,
        unique: [true,'该邮箱已存在']
    },
    password: {
        type: String,
        required: true,
        select: false               // 查询中是否返回该字段
        // minlength: 6,           在设置最大最小都无意义，由于是加密的会有多余的，但在joi中由于判断是未加密的可以用
    },
    role: {
        type: String,
        required: true,
        enum: ['normal'],
        default: 'normal'
    },
    avatar: {
        type: String,
        default: 'http://localhost:3000/uploads/user/avatar.png'
    },
    gender: {
        type: String,
        enum: ['man','female'],
    },
    birthday: {
        type: Date,
    },
    area: {
        type: Array,
    },
    intro: {
        type: String
    },
    editTemp:{
        type: String,
        default: null
    }

});

//创建 User集合并应用规则
const User = mongoose.model('User',userSchema);

//Joi 信息验证规则
const validateUser = req => {
    const schema = Joi.object({
        //alphanum() 仅限字母和数字
        username: Joi.string().min(2).max(12).required().error(new Error('用户名长度必须是2到16个字符 ！！！')),
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required().error(new Error('邮箱格式不符合要求 ！！！')),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,20}$')).required().error(new Error('密码长度必须在6到20个字符  ！！！')),
        role: Joi.string().valid('normal').error(new Error('非法的角色值 !!!')),
    });

    return schema.validateAsync(req.body);
}


//ES6中如果键：值，键和值名称是相同的，允许省略仅写一个
//把集合作为对象成员导出，预留后续导出的内容
module.exports = {
    User,
    validateUser
}