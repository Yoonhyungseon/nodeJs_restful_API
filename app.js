var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');

/**************************************************
* express-session 
**************************************************/
var session = require('express-session');
/**************************************************
* cookieParser
**************************************************/
var cookieParser = require('cookie-parser'); // 특정 문자열로 쿠키에 서명


var app = express(); // express 패키지를 호출하여 app 변수 객체 생성

/**************************************************
* router 객체 생성
* router 객체를 만든 후 app.js 파일에서 이들을 미들웨어로 사용하여 라우팅 
**************************************************/
var indexRouter = require('./routes/user/indexController'); //routes 폴더에 있는 js 파일(router 객체)을 require
var usersRouter = require('./routes/users'); 
var boardRouter = require('./routes/user/boardController'); 
var noticeRouter = require('./routes/user/noticeController'); 
var questionRouter = require('./routes/user/questionController'); 
var adminQuestionRouter = require('./routes/admin/adminQuestionController'); 
var loginRouter = require('./routes/login'); 


/**************************************************
* DB 연결
**************************************************/
const mariaDB = require('./config/maria_config');
mariaDB.connect();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

/**************************************************
* 커스텀 미들웨어
**************************************************/
// app.use(function (req, res, next) {
//   console.log(req.url, '=========');
//   next();
// });

/**************************************************
* 주요 미들웨어
**************************************************/
app.use(logger('dev')); /* morgan 미들웨어: 요청 정보를 콘솔에 기록 */  // 주요 인자: dev, short, common, combined 등
app.use(express.json()); // 요청 들어온 본문을 JSON으로 해석
app.use(express.urlencoded({ extended: false })); // 요청 들어온 본문을 querystring을 사용하여 해석
app.use(cookieParser()); // cookie-parser: 요청에 동봉된 쿠키 해석
app.use(express.static(path.join(__dirname, 'public'))); //정적 파일을 제공하는 폴더를 public 폴더로 지정 (/public/abc.png -> abc.png)
// app.use('/img', express.static(path.join(__dirname, 'public'))); // public 폴더 경로를 img로 지정 (/public/abc.png => /img/abc.png)

/**************************************************
* express-session 미들웨어 
* express-session은 cookie-parser 뒤에
**************************************************/
app.use(session({
  resave: false, // 세션 수정사항이 없더라도 세션을 다시 저장할 것인지?
  saveUninitialized: false, // 세션에 저장할 내역이 없더라도 세션을 저장할 것인지? (방문자 추적 용도)
  secret: 'secret code', // 필수 항목. 클라이언트에 세션 쿠키를 보낼때 사용할 서명 값. cookie-parser의 secret과 같게 설정해야 함.
  cookie: {
    httpOnly: true, // 클라이언트에서 쿠키를 확인하지 못하도록 함
    secure: false, // https가 아닌 환경에서도 사용할 수 있도록 함 (배포 시에는 true 권장)
  },
}));

/**************************************************
* Passport 설정/ 세션 뒤에 위치
**************************************************/
// var passport = require('passport') //passport module add
// // var passportConfig = require('./config/passport_config');
// var cookieSession = require('cookie-session');
// var flash = require('connect-flash');

// app.use(cookieSession({
//   keys: ['node_passport'],
//   cookie: {
//     maxAge: 1000 * 60 * 60 // 유효기간 1시간
//   }
// }));
// // passportConfig();
// app.use(flash());
// app.use(passport.initialize());
// app.use(passport.session());

/**************************************************
* 라우팅 미들웨어
**************************************************/
app.use('/', indexRouter); // 주소가 /로 시작하면 routes/index.js를 호출
app.use('/users', usersRouter); // 주소가 /users로 시작하면 routes/users.js를 호출
app.use('/board', boardRouter); 
app.use('/notice', noticeRouter); 
app.use('/question', questionRouter); 
app.use('/adminQuestion', adminQuestionRouter); 
app.use('/login', loginRouter); 

app.use('/', function (req, res, next) {
  console.log('/ 주소의 요청일 때만 실행됩니다.');
  next();
});
app.get('/', function (req, res, next) {
  console.log('GET 메서드');
  next();
});
app.post('/data', function (req, res, next) {
  console.log('POST 메서드');
  next();
});

/**************************************************
* 404(Not Found) 처리 미들웨어
**************************************************/
app.use(function(req, res, next) {
  next(createError(404));
});

/**************************************************
* 에러 처리 미들웨어
**************************************************/
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

/**************************************************
* bin/www 파일에서 사용하기 위한 app 객체 모듈화
**************************************************/
module.exports = app;
