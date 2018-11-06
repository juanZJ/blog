//封装路由模块的目的,是为了保证每一个模块的职能单一性
//对于路由模块来说: 只需要分配URL地址到处理函数之间的对应关系即可
//路由模块,并不关心如何处理这一次的请求

const express = require('express')
const router = express.Router()

//导入自己的业务处理模块
const controller = require('../controller/index.js')

//用户请求的项目首页
router.get('/',controller.handleIndexGet)

//把路由对象暴露出去
module.exports = router