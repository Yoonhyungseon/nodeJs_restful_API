var express = require('express');
var router = express.Router(); // router 객체 생성

/* GET home page. */
// '/' 주소로 GET 요청 시 살행
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  console.log('this it index page');
});

module.exports = router;  // 라우터 모듈화
