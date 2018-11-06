module.exports = {
    handleArticleAddGet(req,res) {
        res.render('./article/add.ejs', {
            user: req.session.user,
            isLogin: req.session.isLogin
        })
    }
}