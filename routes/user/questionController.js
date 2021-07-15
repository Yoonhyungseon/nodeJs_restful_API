const { response } = require('express');
var express = require('express');
var router = express.Router(); 

const maria = require('../../config/mariaConf'); 
var questionMapper = require('../../models/questionMapper');

/**************************************************
* @Url : question
* @Method : GET
* @Description : 문의하기 리스트 조회
* @Author : Hyung-Seon. Yoon
* @Version : 2021. 7. 12.
**************************************************/
router.get('/', function(req, res, next) {
  console.info("\n> 문의하기 리스트 조회");

  questionMapper.getList(req, function(rows){
    res.send(rows);
  });
});

/**************************************************
* @Url : question
* @Method : PATCH
* @Description : 문의하기 공개여부 변경(사용자)
* @Author : Hyung-Seon. Yoon
* @Version : 2021. 7. 12.
**************************************************/
router.patch('/', function(req, res, next) {
  console.info("\n> 문의하기 공개여부 변경");
  
  questionMapper.updatePublic(req, function(rows){
    res.send(rows);
  });
});
  
/**************************************************
* @Url : question/view
* @Method : POST
* @Description : 문의하기 상세 조회
* @Author : Hyung-Seon. Yoon
* @Version : 2021. 7. 12.
**************************************************/
router.post('/view', function(req, res, next) {
  console.info("\n> 문의하기 상세 조회");

  var data;

  questionMapper.getView(req, function(rows){
    data = {"question" : rows};
  });
  questionMapper.getAnsView(req, function(rows){
    res.send({data, "answear" : rows});
  });
});

/**************************************************
* @Url : question
* @Method : PUT
* @Description : 문의하기 수정
* @Author : Hyung-Seon. Yoon
* @Version : 2021. 7. 12.
**************************************************/
router.put('/', function(req, res, next) {
  console.info("\n> 문의하기 수정");
  
  questionMapper.updateContents(req, function(rows){
    res.send(rows);
  });
});

/**************************************************
* @Url : question
* @Method : POST
* @Description : 문의하기 등록
* @Author : Hyung-Seon. Yoon
* @Version : 2021. 7. 12.
**************************************************/
router.post('/', function(req, res, next) {
  console.info("\n> 문의하기 등록");

  questionMapper.questionWrite(req, function(rows){
    res.send(rows);
  });
});

/**************************************************
* @Url : question
* @Method : DELETE
* @Description : 문의하기 삭제
* @Author : Hyung-Seon. Yoon
* @Version : 2021. 7. 12.
**************************************************/
router.delete('/', function(req, res, next) {
  console.info("\n> 문의하기 삭제");

  questionMapper.questionDelete(req, function(rows){
    res.send(rows);
  });
});

module.exports = router;
