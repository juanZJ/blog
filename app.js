const express = require('express')
const app = express()

//设置默认的模板引擎
app.set('view engine', 'ejs')

//模板的根目录,将来渲染页面时都相对此路径
app.set('views', './views');

//托管静态资源
app.use('/node_modules', express.static('./node_modules'))

//用户请求的项目首页
app.get('/', (req, res) => {
    //使用函数之前,一定要保证安装和配置了ejs模板引擎
    res.render('index.ejs', {})
})

app.listen(80, () => {
    console.log('http://127.0.0.1');
})