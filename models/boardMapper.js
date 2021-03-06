var commonMapper = require('../models/commonMapper');

/**************************************************
* @Method : boardMapper
* @Description : 게시판
* @Author : Hyung-Seon. Yoon
* @Version : 2021. 7. 8.
**************************************************/
var boardMapper = {

    /**************************************************
    * @Method : getList
    * @Description : 게시판 리스트 조회
    * @Author : Hyung-Seon. Yoon
    * @Version : 2021. 7. 7.
    **************************************************/
    getList: function(req, callback){
        var querystring = `SELECT * 
                             FROM nodeJs_DB_BOARD
                            WHERE is_release = 'Y'
                              AND delete_yn = 'N'
                            ORDER BY updated_at DESC`;
                            
        commonMapper.getQuery(querystring, "", req, callback);
    },

    /**************************************************
    * @Method : updateRelease
    * @Description : 게시물 노출여부 변경
    * @Author : Hyung-Seon. Yoon
    * @Version : 2021. 7. 9.
    **************************************************/
     updateRelease: function(req, callback){
        var seq = req.body.seq;
        var is_release = req.body.is_release;
        var data = [is_release, seq];
        var querystring = `UPDATE nodeJs_DB_BOARD
                              SET is_release = ?
                            WHERE seq = ?`; 
                                    
        commonMapper.getQuery(querystring, data, req, callback);
        },

    /**************************************************
    * @Method : getView
    * @Description : 게시물 상세 조회
    * @Author : Hyung-Seon. Yoon
    * @Version : 2021. 7. 7.
    **************************************************/
    getView: function(req, callback){
        var seq = req.query.seq;
        var querystring = `SELECT * 
                           FROM nodeJs_DB_BOARD
                          WHERE seq = ?
                            AND delete_yn = 'N'
                            AND is_release = 'Y'`;
                                
        commonMapper.getQuery(querystring, seq, req, callback);
    },

    /**************************************************
    * @Method : updateContents
    * @Description : 게시물 수정
    * @Author : Hyung-Seon. Yoon
    * @Version : 2021. 7. 9.
    **************************************************/
     updateContents: function(req, callback){
        var seq = req.body.seq;
        var title = req.body.title;
        var contents = req.body.contents;
        var images = req.body.images;
        var is_release = req.body.is_release;
        var data = [title, contents, images, is_release, seq];

        var querystring = `UPDATE nodeJs_DB_BOARD
                              SET title = ?,
                                  contents = ?,
                                  images = ?,
                                  updated_at = NOW(),
                                  is_release = ?
                            WHERE seq =  ?`;
                                    
        commonMapper.getQuery(querystring, data, req, callback);
        },

    /**************************************************
    * @Method : boardWrite
    * @Description : 게시물 등록
    * @Author : Hyung-Seon. Yoon
    * @Version : 2021. 7. 7.
    **************************************************/
    boardWrite: function(req, callback){
        var title = req.body.title;
        var contents = req.body.contents;
        var images = req.body.images;
        var created_by = req.body.created_by;
        var updated_at = req.body.updated_at;
        var data = [title, contents, images, created_by, updated_at];
      
        var querystring = `INSERT INTO nodeJs_DB_BOARD
                                  (title, contents, images, created_by, updated_at, is_release) values(?, ?, ?, ?, NOW(), "Y")`;
                                    
        commonMapper.getQuery(querystring, data, req, callback);
    },

    /**************************************************
    * @Method : boardDelete
    * @Description : 게시물 삭제
    * @Author : Hyung-Seon. Yoon
    * @Version : 2021. 7. 7.
    **************************************************/
    boardDelete: function(req, callback){
        var seq = req.body.seq;
        var querystring = `UPDATE nodeJs_DB_BOARD
                              SET delete_yn = "Y"
                            WHERE seq =  ?`;   
                                                   
        commonMapper.getQuery(querystring, seq, req, callback);
    }
}

module.exports = boardMapper;