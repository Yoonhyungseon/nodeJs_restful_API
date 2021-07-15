/**************************************************
* @Method : isAuthenticated
* @Description : Authentication 조회
* @Author : Hyung-Seon. Yoon
* @Version : 2021. 7. 7.
**************************************************/
var isAuthenticated = function (req, res, next) {
  console.info('\nAuthentication method:');

  if (req.isAuthenticated()){
    console.log("permission");
    return next();
  }
  console.log("No permission");
  res.redirect('/');
};

module.exports = isAuthenticated;