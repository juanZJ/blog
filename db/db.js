const mysql = require('mysql')

const conn = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'blog',
    multipleStatements: true
})

//把当前模块中创建的conn数据库连接对象,暴露出去
module.exports = conn