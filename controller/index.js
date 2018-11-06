//展示首页页面
module.exports = {
    handleIndexGet(req, res)  {   
        res.render('index.ejs', {
            user: req.session.user,
            isLogin: req.session.isLogin
        })
    }
}