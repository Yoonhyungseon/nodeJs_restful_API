var express = require('express');
var router = express.Router(); // router 객체 생성


/**************************************************
* @Url : /users
* @Method : GET
* @Description : GET users listing
* @Author : Hyung-Seon. Yoon
* @Version : 2021. 7. 7.
**************************************************/
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/**************************************************
* @Url : /
* @Method : GET
* @Description : next
* @Author : Hyung-Seon. Yoon
* @Version : 2021. 7. 7.
**************************************************/
router.get('/', function(req, res, next) {
  next('route'); // 연결된 미들웨어들을 건너뜀
}, function(req, res, next) {
  console.log('실행되지 않습니다.');
  next();
}, function(req, res, next) {
  console.log('실행되지 않습니다.');
  next();
});

/**************************************************
* @Url : http://localhost:3000/users/pengsu?id=1&limit=5
* @Method : GET
* @Description : test
* @Author : Hyung-Seon. Yoon
* @Version : 2021. 7. 7.
**************************************************/
router.get('/:user', function (req, res, next) {
  console.log(req.params.user); // 경로 매개변수 정보
  console.log(req.query); // 쿼리스트링 정보
  //상태 코드 응답: 
  //두 번 이상 보내면 Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client 에러 발생
  res.send('respond with a resource'); 
  // res.status(404).send('Not Found'); // 404: Not Found
});

module.exports = router;  // 라우터 모듈화
