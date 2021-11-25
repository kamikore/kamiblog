// 对于博客页面而言，登录并非是必要的
module.exports = (req,res,next) => {
    if (req.headers.authorization) {
        res.redirect('/admin/login');
    } else {
        if (req.session.role == 'normal') {
            return res.redirect('/home');
        }
        next();
    }
}
