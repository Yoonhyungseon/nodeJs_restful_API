const { response } = require('express');
var express = require('express');
var router = express.Router(); // router 객체 생성

const maria = require('../config/maria_config'); 

/**************************************************
* @Url : board/list
* @Method : GET
* @Description : 게시판 리스트 조회
* @Author : Hyung-Seon. Yoon
* @Version : 2021. 7. 7.
**************************************************/
router.get('/list', function(req, res, next) {
  console.info("\n==================>board/list");

  var querystring = `SELECT * 
                     FROM nodeJs_DB_BOARD
                     WHERE is_release = 'Y'`;

  maria.query(querystring, function(err, rows, fields) { 
    if(!err) { 
      console.info("success : 'YES'");
      res.send(rows); 
    } else { 
      console.log("err : " + err);
      res.send(err); 
    }
  });
});

/**************************************************
* @Url : board/view
* @Method : GET
* @Description : 게시판 상세
* @Author : Hyung-Seon. Yoon
* @Version : 2021. 7. 7.
**************************************************/
router.get('/:seq', function(req, res, next) {
  console.info("\n==================>board/view", req.query);
  var seq = req.query.seq;
  var querystring = `SELECT * 
                     FROM nodeJs_DB_BOARD
                     WHERE seq = ?`;

  maria.query(querystring, seq, function(err, rows, fields) { 
    if(!err) { 
      console.info("success : 'YES'");
      res.send(rows); 
      if (rows.length <= 0) console.log(req.query,"is empty");
    } else { 
      console.log("err : " + err);
      res.send(err); 
    }
  });
});

/**************************************************
* @Url : board/write
* @Method : POST
* @Description : 게시판 등록
* @Author : Hyung-Seon. Yoon
* @Version : 2021. 7. 7.
**************************************************/
router.post('/write', function(req, res, next) {
  console.info("\n==================>board/wirte");

  var title = req.body.title;
  var contents = req.body.contents;
  var images = req.body.images;
  var created_by = req.body.created_by;
  var updated_by = req.body.updated_by;
  var datas = [title, contents, images, created_by, updated_by];

  var querystring = `INSERT INTO nodeJs_DB_BOARD
                            (title, contents, images, created_by, updated_by, is_release) values(?, ?, ?, ?, NOW(), "Y")`;

  maria.query(querystring, datas, function(err, rows, fields) { 
    if(!err) { 
      response = { success : 'YES', info : rows }; 
      console.info("success : 'YES'");
      res.send(response); 
    } else { 
      console.log("err : " + err);
      res.send(err); 
    }
  });
});

/**************************************************
* @Url : board/delete
* @Method : DELETE
* @Description : 게시판 삭제
* @Author : Hyung-Seon. Yoon
* @Version : 2021. 7. 5.
**************************************************/
router.delete('/delete', function(req, res, next) {
  console.info("\n==================>board/delte");

  var seq = req.body.seq;
  var querystring = `UPDATE nodeJs_DB_BOARD
                        SET is_release = "N"
                      WHERE seq =  ?`;

  maria.query(querystring, seq, function(err, rows, fields) { 
    if(!err) { 
      response = { success : 'YES', info : rows }; 
      console.info("success : 'YES'");
      res.send(response); 
    } else { 
      console.log("err : " + err);
      res.send(err); 
    }
  });
});

module.exports = router;  // 라우터 모듈화
