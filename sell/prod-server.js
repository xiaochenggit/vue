var express = require('express');
var config = require('./config/index');
const path = require('path');
var port = 9000;
var app = express();
var router = express.Router();
router.get('/', function (req, res, next){
	req.url = 'index.html';
	next();
})
app.use(router);

// 引入模拟的数据
var appDate = require("./data.json");
// 商家数据
var seller = appDate.seller;
// 食物数据
var goods = appDate.goods;
// 评论数据
var ratings = appDate.ratings;

// 编写路由 

var apiRoutes = express.Router();

apiRoutes.get("/seller",function(req,res){
  res.json({
    errno : 0,
    data : seller
  })
});

apiRoutes.get("/goods",function(req,res){
  res.json({
    erron : 0,
    data : goods
  })
});

apiRoutes.get("/ratings",function(req,res){
  res.json({
    erron : 0,
    data : ratings
  })
})

// 调用
app.use("/api",apiRoutes);
app.use(express.static('./dist'));

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
})
