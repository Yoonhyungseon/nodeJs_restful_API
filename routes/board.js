const { response } = require('express');
var express = require('express');
var router = express.Router(); 

const maria = require('../config/maria_config'); 
var boardMapper = require('../models/boardMapper');

/**************************************************
* @Url : board/list
* @Method : GET
* @Description : 게시물 리스트 조회
* @Author : Hyung-Seon. Yoon
* @Version : 2021. 7. 7.
**************************************************/
router.get('/list', function(req, res, next) {
  console.info("\> 게시물 리스트 조회");

  boardMapper.getList(req, function(rows){
    res.send(rows);
  });
});

/**************************************************
* @Url : board/view
* @Method : PATCH
* @Description : 게시물 노출여부 변경
* @Author : Hyung-Seon. Yoon
* @Version : 2021. 7. 9.
**************************************************/
router.patch('/view', function(req, res, next) {
  console.info("\n> 게시물 노출여부 변경");
  
  boardMapper.updateRelease(req, function(rows){
    res.send(rows);
  });
});
  
/**************************************************
* @Url : board/view?seq={#seq}
* @Method : GET
* @Description : 게시물 상세 조회
* @Author : Hyung-Seon. Yoon
* @Version : 2021. 7. 7.
**************************************************/
router.get('/:mode', function(req, res, next) {
  console.info("\n> 게시물 상세 조회");

  if(req.params.mode == "view"){
    boardMapper.getView(req, function(rows){
      res.send(rows);
    });
  }else{
    console.info("Not applicable domain!");
    res.status(404).send('Not Found');
  }
});

/**************************************************
* @Url : board/update
* @Method : PUT
* @Description : 게시물 수정
* @Author : Hyung-Seon. Yoon
* @Version : 2021. 7. 9.
**************************************************/
router.put('/update', function(req, res, next) {
  console.info("\n> 게시물 수정");
  
  boardMapper.updateContents(req, function(rows){
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
  console.info("\n> 게시물 등록");

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
  console.info("\n> 게시물 삭제");

  boardMapper.boardDelete(req, function(rows){
    res.send(rows);
  });
});

module.exports = router;
