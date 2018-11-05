const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const mysql = require('mysql')
const moment = require('moment')

const conn = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'blog'
})

//设置默认的模板引擎
app.set('view engine', 'ejs')

//模板的根目录,将来渲染页面时都相对此路径
app.set('views', './views');

//托管静态资源
app.use('/node_modules', express.static('./node_modules'))

// 注册body-parser中间件  注册以后才可以在req中使用body对象获取客户端post提交过来的数据
app.use(bodyParser.urlencoded({ extended: false }))

//用户请求的项目首页
app.get('/', (req, res) => {
    //使用函数之前,一定要保证安装和配置了ejs模板引擎
    res.render('index.ejs', {})
})

//用户请求的是注册页面
app.get('/register', (req,res) => {
    //注意: 当在调用模板引擎的res.render函数的时候 ./相对路径是相对于app.set('views')指定的目录来进行查找的
    res.render('./user/register.ejs', {})
})

//用户请求的是登录页面
app.get('/login', (req, res) => {
    res.render('./user/login.ejs', {})
})

//注册新用户
app.post('/register',(req, res) => {
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
});


app.listen(80, () => {
    console.log('http://127.0.0.1');
})