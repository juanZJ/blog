const moment = require('moment')
//导入数据库操作模块
const conn = require('../db/db.js')

module.exports = {
    handleRegisterGet(req,res)  { 
        res.render('./user/register.ejs', {})
    },
    handleLoginGet(req, res)  {
        res.render('./user/login.ejs', {})
    },
    handleRegisterPost(req, res) {
        //TODO:完成用户注册的业务逻辑
        //body-parse
        //获取客户端提交过来的用户表单信息
        const user = req.body
        //判断表单信息是否合法,不合法返回错误状态码和信息
        if (user.username.trim().length === 0 || 
        user.password.trim().length === 0 || 
        user.nickname.trim().length === 0) return res.status(400).send({ status: 400, msg: '请填写完整的表单信息!'});
    
        //查重: 执行sql语句 在数据库中查询当前提交过来的用户名是否已存在
        const querySql = 'select count(*) as count from users where username = ?'
        conn.query(querySql, user.username, (err, result) => {
            //result是一个数组,数组中有一个对象,对象中有一个属性 count [ {count: 0}]
            // console.log(result)
            if (err) return res.status(500).send({ status: 500, msg: '用户名查询失败请重试'})
            if(result[0].count != 0) return res.status(402).send({status: 402, msg: '用户名已存在请重试'})
            //给用户添加创建时间属性
            user.ctime = moment().format('YYYY-MM-DD HH:mm:ss')
    
            //用户名不存在需要执行添加用户的sql语句
            const addSql = 'insert into users set ?'
            console.log(user)
            conn.query(addSql, user, (err, result) => {
                if (err || result.affectedRows != 1) return res.status(500).send({ status: 500, msg: '用户添加失败请重试'})
                res.send({ status: 200, msg: '用户注册成功'});
            })
        })
    },
    handleLoginPost(req, res)  {
        //获取客户端提交过来的数据
        const user = req.body
        //执行sql语句,查询用户是否存在,密码是否正确
        const querySql = 'select * from users where username = ? and password = ?'
        conn.query(querySql, [user.username, user.password], (err, result) => {
            if (err) return res.status(500).send({status: 500, msg: '登录失败请重试'})
            if(result.length === 0) return res.status(400).send({status: 400, msg: '用户名或密码错误请重试'})
            //登录成功后存储用户信息到session中
            req.session.user = result[0]
            //存储登录状态
            req.session.isLogin = true
            //设置cookie时间
            let hour = 1000 * 60 * 60 * 24 * 30
            req.session.cookie.expires = new Date(Date.now() + hour)
            res.send({ status: 200, msg: '恭喜你登陆成功'})
        })
    },
    handleLogoutGet(req, res) {
        req.session.destroy(err => { //express-session的方法
            //该回调函数执行表示销毁成功,让客户端重新访问指定的页面
            res.redirect('/')  //express的方法
        })
    }
    //约定大于规则
}