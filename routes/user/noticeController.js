const { response } = require('express');
var express = require('express');
var router = express.Router(); 

const maria = require('../../config/mariaConf'); 
var noticeMapper = require('../../models/noticeMapper');

/**************************************************
* @Url : notice
* @Method : GET
* @Description : 공지사항 리스트 조회
* @Author : Hyung-Seon. Yoon
* @Version : 2021. 7. 12.
**************************************************/
router.get('/', function(req, res, next) {
  console.info("\n> 공지사항 리스트 조회");

  noticeMapper.getList(req, function(rows){
    res.send(rows);
  });
});

/**************************************************
* @Url : notice
* @Method : PATCH
* @Description : 공지사항 노출여부 변경
* @Author : Hyung-Seon. Yoon
* @Version : 2021. 7. 12.
**************************************************/
router.patch('/', function(req, res, next) {
  console.info("\n> 공지사항 노출여부 변경");
  
  noticeMapper.updateRelease(req, function(rows){
    res.send(rows);
  });
});

/**************************************************
* @Url : notice/rank
* @Method : PATCH
* @Description : 공지사항 노출순위 변경
* @Author : Hyung-Seon. Yoon
* @Version : 2021. 7. 12.
**************************************************/
router.patch('/rank', function(req, res, next) {
  console.info("\n> 공지사항 노출순위 변경");
  
  noticeMapper.updateRanking(req, function(rows){
    res.send(rows);
  });
});
  
/**************************************************
* @Url : notice/view?seq={#seq}
* @Method : GET
* @Description : 공지사항 상세 조회
* @Author : Hyung-Seon. Yoon
* @Version : 2021. 7. 12.
**************************************************/
router.get('/:mode', function(req, res, next) {
  console.info("\n> 공지사항 상세 조회");

  if(req.params.mode == "view"){
    noticeMapper.getView(req, function(rows){
      res.send(rows);
    });
  }else{
    console.info("Not applicable domain!");
    res.status(404).send('Not Found');
  }
});

/**************************************************
* @Url : notice
* @Method : PUT
* @Description : 공지사항 수정
* @Author : Hyung-Seon. Yoon
* @Version : 2021. 7. 12.
**************************************************/
router.put('/', function(req, res, next) {
  console.info("\n> 공지사항 수정");
  
  noticeMapper.updateContents(req, function(rows){
    res.send(rows);
  });
});

/**************************************************
* @Url : notice
* @Method : POST
* @Description : 공지사항 등록
* @Author : Hyung-Seon. Yoon
* @Version : 2021. 7. 12.
**************************************************/
router.post('/', function(req, res, next) {
  console.info("\n> 공지사항 등록");

  noticeMapper.noticeWrite(req, function(rows){
    res.send(rows);
  });
});

/**************************************************
* @Url : notice
* @Method : DELETE
* @Description : 공지사항 삭제
* @Author : Hyung-Seon. Yoon
* @Version : 2021. 7. 12.
**************************************************/
router.delete('/', function(req, res, next) {
  console.info("\n> 공지사항 삭제");

  noticeMapper.noticeDelete(req, function(rows){
    res.send(rows);
  });
});

module.exports = router;
