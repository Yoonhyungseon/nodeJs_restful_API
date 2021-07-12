var express = require('express');
var router = express.Router(); 

/**************************************************
* @Url : /
* @Method : GET
* @Description : GET home page.
* @Author : Hyung-Seon. Yoon
* @Version : 2021. 7. 7.
**************************************************/
router.get('/', function(req, res, next) {
  console.log('this it index page');

  res.render('index', { title: 'Express' });
});

module.exports = router;
