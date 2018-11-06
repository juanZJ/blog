const express = require('express')
const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser')
const app = express()
//导入session中间件
const session = require('express-session')
//注册session中间件
//只要注册了session中间件 ,那么,今后只要能访问到req这个对象,必然能访问到req.session
app.use(session({
    secret: 'blog niubility',
    resave: false,
    saveUninitialized: false
}))

//设置默认的模板引擎
app.set('view engine', 'ejs')

//模板的根目录,将来渲染页面时都相对此路径
app.set('views', './views');

//托管静态资源
app.use('/node_modules', express.static('./node_modules'))

// 注册body-parser中间件  注册以后才可以在req中使用body对象获取客户端post提交过来的数据
app.use(bodyParser.urlencoded({ extended: false }))

// //导入首页的路由模块
// const indexRouter = require('./router/index.js')
// app.use(indexRouter)

// //导入用户功能的路由模块
// const userRouter = require('./router/user.js')
// app.use(userRouter)

//使用循环的方式,进行路由的自动注册
fs.readdir('./router', (err, result) => {
    if(err) return console.log('读取文件失败')
    //循环获取的所有的文件名
    result.forEach(item => {
        //依次导入对应的路由模块
        const router = require(path.join(__dirname, './router/', item))
        //注册路由
        app.use(router)
    })
})


app.listen(80, () => {
    console.log('http://127.0.0.1');
})