var mdbConn = require('../models/mariaDBConn');
var express = require('express');
var router = express.Router(); // router 객체 생성

/* GET DBtest page. */
// '/dbtest' 주소로 GET 요청 시 실행
router.get('/', function(req, res, next) {
  mdbConn.DBtest()
  .then((rows) => { res.json(rows) }) // 쿼리 결과가 JSON 형태로 출력됨
  .catch((err) => { console.error(err); });

  console.log('==DB connect test complete==\n\n');
});

module.exports = router;  // 라우터 모듈화
