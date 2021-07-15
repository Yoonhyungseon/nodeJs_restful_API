var commonMapper = require('../models/commonMapper');

var passport = require('passport')
, LocalStrategy = require('passport-local').Strategy;

/**************************************************
* @Method : passportConf
* @Description : passport configuration
* @Author : Hyung-Seon. Yoon
* @Version : 2021. 7. 15.
**************************************************/
var passportConf = {
    /**************************************************
    * @Method : passport
    * @Description : binding passport require
    * @Author : Hyung-Seon. Yoon
    * @Version : 2021. 7. 15.
    **************************************************/
    passport : passport = passport,

    /**************************************************
    * @Method : serializeUser
    * @Description : passport serializeUser// 세션 저장
    * @Author : Hyung-Seon. Yoon
    * @Version : 2021. 7. 15.
    **************************************************/
    serializeUser : passport.serializeUser(function (user, done) {
        done(null, user)
    }),

    /**************************************************
    * @Method : deserializeUser
    * @Description : passport deserializeUser
    * @Author : Hyung-Seon. Yoon
    * @Version : 2021. 7. 15.
    **************************************************/
    deserializeUser : passport.deserializeUser(function (user, done) {
        done(null, user);
    }),

    /**************************************************
    * @Method : LocalStrategy
    * @Description : passport LocalStrategy
    * @Author : Hyung-Seon. Yoon
    * @Version : 2021. 7. 15.
    **************************************************/
    LocalStrategy : passport.use(new LocalStrategy({
        usernameField: 'userId',
        passwordField: 'password',
        passReqToCallback: true //인증을 수행하는 인증 함수로 HTTP request를 그대로  전달할지 여부를 결정한다
        }, function (req, userId, password, done) {
            var data = [userId, password];
            var querystring = `SELECT * 
                                 FROM nodeJs_DB_MEMBER
                                WHERE USER_ID = ? AND USER_PWD=?`;

            commonMapper.getQuery(querystring, data, req, function(rows){
                // console.log(rows);

                if(rows.info.length > 0 && userId == rows.info[0].USER_ID && password == rows.info[0].USER_PWD){
                    return done(null, {
                        'user_id': userId,
                    });
                }else{
                    return done(false, null)
                }
            });
        }))
}

module.exports = passportConf;