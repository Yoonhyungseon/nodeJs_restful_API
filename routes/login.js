const { response } = require('express');
var express = require('express');
var router = express.Router();

const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const maria = require('../config/maria_config'); 

var passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

/**************************************************
* @Description : serializeUser: 사용자 정보를 Session 저장
* @Version : 2021. 7. 9.
**************************************************/
passport.serializeUser(function(user, done) {
  console.log("serializeUser ", user);
  done(null, user.id);
});

/**************************************************
* @Description : serializeUser: 사용자 정보를 Session 저장
* @Version : 2021. 7. 9.
**************************************************/
passport.deserializeUser(function(id, done) {
    console.log("deserializeUser id ", id);
    var userinfo;
    var sqlstring = `SELECT * 
                       FROM nodeJs_DB_member
                      WHERE ID=?`;

    maria.query(sqlstring, [id], function (err, result) {
      if(err) console.log('mysql 에러');     
     
      console.log("deserializeUser mysql result : " , result);
      var json = JSON.stringify(result[0]);
      userinfo = JSON.parse(json);
      done(null, userinfo);
    })    
});
 
passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true //HTTP req 전달 여부
  }, 
  function (req, username, password, done) {
    var querystring = `SELECT * 
                         FROM nodeJs_DB_member
                        WHERE id = ? AND pwd=?`;

    maria.query(querystring , [username, password], function (err, rows) {
      if(err) console.log('mysql error');  

      // 입력받은 ID와 비밀번호에 일치하는 회원정보가 없는 경우   
      if(rows.length == 0){
        console.log("회원정보 없음");
        return done(null, false, { message: 'Incorrect' });
      }else{
        console.log(rows);
        
        var json = JSON.stringify(rows[0]);
        var userinfo = JSON.parse(json);
        console.log("userinfo " + userinfo);
        return done(null, userinfo);  // 회원정보 return
      }
    })
}));

router.get('/index', function (req, res, next) {
  console.log('/login/index');
  res.render('index', {"user_id" : req.user.ID});
});

/**************************************************
* @Url : login/login
* @Method : POST
* @Description : 로그인
* @Author : Hyung-Seon. Yoon
* @Version : 2021. 7. 9.
**************************************************/
router.post('/login', isNotLoggedIn, (req, res, next) => {
  passport.authenticate('local', (authError, user, info) => {
      if (authError) {
          console.error(authError);
          return next(authError);
      }
      if (!user) {
          return res.redirect(`/?loginError=${info.message}`);
      }
      return req.login(user, (loginError) => {
          if (loginError) {
              console.error(loginError);
              return next(loginError);
          }
          return res.redirect('/');
      });
  })(req, res, next); //미들웨어 내의 미들웨어에는 (req, res, next) 를 붙여준다.
});

/**************************************************
* @Url : logout
* @Method : GET
* @Description : 회원정보
* @Author : Hyung-Seon. Yoon
* @Version : 2021. 7. 9.
**************************************************/
router.get('/logout', isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

/**************************************************
* @Url : profile
* @Method : GET
* @Description : 회원정보
* @Author : Hyung-Seon. Yoon
* @Version : 2021. 7. 9.
**************************************************/
router.get('/profile', isLoggedIn, (req, res) => {
  console.log(profile);
});

/**************************************************
* @Url : join
* @Method : POST
* @Description : 회원가입
* @Author : Hyung-Seon. Yoon
* @Version : 2021. 7. 9.
**************************************************/
router.get('/join', isNotLoggedIn, (req, res) => {
  console.log(join);
});

module.exports = router; 
