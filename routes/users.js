var express = require('express');
var router = express.Router();

/* GET users listing. */
// '/users' 주소로 GET 요청 시 실행
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/', function(req, res, next) {
  next('route'); // 연결된 미들웨어들을 건너뜀
}, function(req, res, next) {
  console.log('실행되지 않습니다.');
  next();
}, function(req, res, next) {
  console.log('실행되지 않습니다.');
  next();
});

// /users/1 이나 /users/pengsu 로 접속하면 이 라우터에 걸림
router.get('/users/:id', function(req, res) {
  console.log(req.params.id, req.query);
});

router.get('/:user', function (req, res, next) {
  console.log(req.params); // 경로 매개변수 정보
  console.log(req.query); // 쿼리스트링 정보
  //상태 코드 응답: 
  //두 번 이상 보내면 Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client 에러 발생
  res.send('respond with a resource'); 
  // res.status(404).send('Not Found'); // 404: Not Found
  //http://localhost:3000/users/pengsu?id=1&limit=5
});

module.exports = router;
