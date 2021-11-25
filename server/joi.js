const { func } = require('joi');
const Joi = require('joi');

const schema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required()
        .error(new Error('用户名长度必须是3到16个字符 ！！！')),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

    repeat_password: Joi.ref('password'),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
})





schema.validate({ username: 'ab', birth_year: 1994 , email: 204451});
// -> { value: { username: 'abc', birth_year: 1994 } }

schema.validate({});
// -> { value: {}, error: '"username" is required' }

// Also -

// 需要使用    validateAsync 方法才会得到报错

// try {
//     schema.validateAsync({ username: 'ab', birth_year: 1994 , email: '204451@'});
// }
// catch (error) {
//     console.log(error.Error)
//  }



const schema1 = Joi.object({
    username: Joi.string().alphanum().min(2).max(12).required().error(new Error('用户名长度必须是2到16个字符 ！！！')),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required().error(new Error('邮箱格式不符合要求，或是该邮箱已被注册 ！！！')),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required().error(new Error('密码值非法 ！！！')),
    role: Joi.string().valid('normal','admin').required().error(new Error('非法的角色值 ！！！')),
});


async function go() {
    try {
        await schema1.validateAsync({username: 'ab', birth_year: 1994 , email: '204451@qq.com',password: '$2b$10$F5Bex3VXYMRPzyXajdvnSel9Iz0BJrpyvKeukwyh7L5Iaywcwbqv2'}); 
    }
    catch(err) {
        console.log(err.message)
    }
}

go()