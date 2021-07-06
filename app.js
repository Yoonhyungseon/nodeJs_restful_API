var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser'); // 특정 문자열로 쿠키에 서명
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express(); // express 패키지를 호출하여 app 변수 객체 생성

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

/* 커스텀 미들웨어 적용 */
app.use(function (req, res, next) {
  console.log(req.url, '==커스텀 미들웨어==');
  next();
});

/* 주요 미들웨어 */
app.use(logger('dev')); /* morgan 미들웨어: 요청 정보를 콘솔에 기록 */  // 주요 인자: dev, short, common, combined 등
app.use(express.json()); // 요청 들어온 본문을 JSON으로 해석
app.use(express.urlencoded({ extended: false })); // 요청 들어온 본문을 querystring을 사용하여 해석
app.use(cookieParser()); // cookie-parser: 요청에 동봉된 쿠키 해석
app.use(express.static(path.join(__dirname, 'public'))); // 정적 파일이 담긴 폴더 설정

/* 라우팅 미들웨어 */
app.use('/', indexRouter);
app.use('/users', usersRouter);

/* 404(Not Found) 처리 미들웨어 */
app.use(function(req, res, next) {
  next(createError(404));
});

/* 에러 처리 미들웨어 */
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// bin/www 파일에서 사용하기 위한 app 객체 모듈화
module.exports = app;
