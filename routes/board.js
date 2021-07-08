const { response } = require('express');
var express = require('express');
var router = express.Router(); // router 객체 생성

const maria = require('../config/maria_config'); 

var boardMapper = require('../models/boardMapper');

/**************************************************
* @Url : board/list
* @Method : GET
* @Description : 게시판 리스트 조회
* @Author : Hyung-Seon. Yoon
* @Version : 2021. 7. 7.
**************************************************/
router.get('/list', function(req, res, next) {
  console.info("\n===>board/list");

  boardMapper.getList(req, function(rows){
    res.send(rows);
  });
});
  
/**************************************************
* @Url : board/view
* @Method : GET
* @Description : 게시물 상세
* @Author : Hyung-Seon. Yoon
* @Version : 2021. 7. 7.
**************************************************/
router.get('/:seq', function(req, res, next) {
  console.info("\n===>board/view");
  
  boardMapper.getView(req, function(rows){
    res.send(rows);
  });
});

/**************************************************
* @Url : board/write
* @Method : POST
* @Description : 게시물 등록
* @Author : Hyung-Seon. Yoon
* @Version : 2021. 7. 7.
**************************************************/
router.post('/write', function(req, res, next) {
  console.info("\n===>board/wirte");

  boardMapper.boardWrite(req, function(rows){
    res.send(rows);
  });
});

/**************************************************
* @Url : board/delete
* @Method : DELETE
* @Description : 게시물 삭제
* @Author : Hyung-Seon. Yoon
* @Version : 2021. 7. 5.
**************************************************/
router.delete('/delete', function(req, res, next) {
  console.info("\n===>board/delete");

  boardMapper.boardDelete(req, function(rows){
    res.send(rows);
  });
});

module.exports = router;  // 라우터 모듈화
