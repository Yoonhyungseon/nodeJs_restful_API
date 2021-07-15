const { response } = require('express');
var express = require('express');
var router = express.Router(); 

const maria = require('../../config/mariaConf'); 
var adminQuestionMapper = require('../../models/adminQuestionMapper');

/**************************************************
* @Url : adminQuestion
* @Method : PATCH
* @Description : 문의하기 노출여부 변경
* @Author : Hyung-Seon. Yoon
* @Version : 2021. 7. 12.
**************************************************/
router.patch('/', function(req, res, next) {
  console.info("\n> 문의하기 공개여부 변경");
  
  adminQuestionMapper.updateRelease(req, function(rows){
    res.send(rows);
  });
});

/**************************************************
* @Url : adminQuestion
* @Method : PUT
* @Description : 문의하기 답변 수정
* @Author : Hyung-Seon. Yoon
* @Version : 2021. 7. 12.
**************************************************/
router.put('/', function(req, res, next) {
  console.info("\n> 문의하기 답변 수정");
  
  adminQuestionMapper.updateContents(req, function(rows){
    res.send(rows);
  });
});

/**************************************************
* @Url : adminQuestion
* @Method : POST
* @Description : 문의하기 답변 등록
* @Author : Hyung-Seon. Yoon
* @Version : 2021. 7. 12.
**************************************************/
router.post('/', function(req, res, next) {
  console.info("\n> 문의하기 답변 등록");

  adminQuestionMapper.answearWrite(req, function(rows){
    res.send(rows);
  });
});

/**************************************************
* @Url : adminQuestion
* @Method : DELETE
* @Description : 문의하기 답변 삭제
* @Author : Hyung-Seon. Yoon
* @Version : 2021. 7. 12.
**************************************************/
router.delete('/', function(req, res, next) {
  console.info("\n> 문의하기 답변 삭제");

  adminQuestionMapper.answearDelete(req, function(rows){
    res.send(rows);
  });
});

module.exports = router;
