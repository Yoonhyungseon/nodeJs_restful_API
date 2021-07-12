const { response } = require('express');
var express = require('express');
var router = express.Router(); 

const maria = require('../../config/maria_config'); 
var boardMapper = require('../../models/boardMapper');

/**************************************************
* @Url : board
* @Method : GET
* @Description : 게시물 리스트 조회
* @Author : Hyung-Seon. Yoon
* @Version : 2021. 7. 7.
**************************************************/
router.get('/', function(req, res, next) {
  console.info("\n> 게시물 리스트 조회");

  boardMapper.getList(req, function(rows){
    res.send(rows);
  });
});

/**************************************************
* @Url : board
* @Method : PATCH
* @Description : 게시물 노출여부 변경
* @Author : Hyung-Seon. Yoon
* @Version : 2021. 7. 9.
**************************************************/
router.patch('/', function(req, res, next) {
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
* @Url : board
* @Method : PUT
* @Description : 게시물 수정
* @Author : Hyung-Seon. Yoon
* @Version : 2021. 7. 9.
**************************************************/
router.put('/', function(req, res, next) {
  console.info("\n> 게시물 수정");
  
  boardMapper.updateContents(req, function(rows){
    res.send(rows);
  });
});

/**************************************************
* @Url : board
* @Method : POST
* @Description : 게시물 등록
* @Author : Hyung-Seon. Yoon
* @Version : 2021. 7. 7.
**************************************************/
router.post('/', function(req, res, next) {
  console.info("\n> 게시물 등록");

  boardMapper.boardWrite(req, function(rows){
    res.send(rows);
  });
});

/**************************************************
* @Url : board
* @Method : DELETE
* @Description : 게시물 삭제
* @Author : Hyung-Seon. Yoon
* @Version : 2021. 7. 5.
**************************************************/
router.delete('/', function(req, res, next) {
  console.info("\n> 게시물 삭제");

  boardMapper.boardDelete(req, function(rows){
    res.send(rows);
  });
});

module.exports = router;
