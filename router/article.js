const express = require('express')
const router = express.Router()
const controller = require('../controller/article.js')

//监听客户端的get 请求地址,显示文章添加页面
router.get('/article/add', controller.handleArticleAddGet);

//监听客户端发表文章的请求
router.post('/article/add', controller.handleArticleAddPost);

router.get('/article/info/:id', controller.handleArticleInfoGet);

router.get('/article/edit/:id', controller.handleArticleEditGet);


module.exports = router