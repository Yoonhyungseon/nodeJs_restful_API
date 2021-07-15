var express = require('express');
var router = express.Router(); 

var isAuthenticated = require('../../config/isAuthenticated');
var passportConf = require('../../config/passportConf')
, passport = passportConf.passport;

/**************************************************
* @Url : /
* @Method : GET
* @Description : GET home page.
* @Author : Hyung-Seon. Yoon
* @Version : 2021. 7. 7.
**************************************************/
router.get('/', function(req, res, next) {
  console.log('\nthis is index page!');

  res.render('index', { title: 'Express' });
});

/**************************************************
* @Url : login
* @Method : POST
* @Description : 로그인
* @Author : Hyung-Seon. Yoon
* @Version : 2021. 7. 15.
**************************************************/
router.post('/login', passport.authenticate('local', {failureRedirect: '/login/failure', failureFlash: true}), // 인증 실패 시 401 리턴, {} -> 인증 스트레티지
  function (req, res) {
    console.log("\nlogin complete :", req.session.passport.user);
    result = { success : 'YES', "userInfo" : req.session.passport.user};
    res.send(result);
    // res.redirect('/');
  });

  /**************************************************
* @Url : login/Faliure
* @Method : GET
* @Description : 로그인 실패
* @Author : Hyung-Seon. Yoon
* @Version : 2021. 7. 15.
**************************************************/
router.get('/login/failure', function(req, res) {
  console.log('\nNo correspondent account');
  result = { success : 'NO', "Info" : "No correspondent account"};
  res.send(result);
});

/**************************************************
* @Url : /logout
* @Method : GET
* @Description : 로그아웃
* @Author : Hyung-Seon. Yoon
* @Version : 2021. 7. 15.
**************************************************/
router.get('/logout', function (req, res) {
  console.log('\nlogout complete');
  req.logout();
  result = { success : 'YES' };
  res.send(result);
  // res.redirect('/');
});

/**************************************************
* @Url : /myinfo
* @Method : GET
* @Description : 내 정보
* @Author : Hyung-Seon. Yoon
* @Version : 2021. 7. 15.
**************************************************/
router.get('/myinfo', isAuthenticated, function (req, res) {
  res.render('index',{
    title: 'My Info',
    user_info: req.user
  })
});

module.exports = router;
