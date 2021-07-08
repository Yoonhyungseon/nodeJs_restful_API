var commonMapper = require('../models/commonMapper');

/**************************************************
* @Method : boardMapper
* @Description : 게시판 mapper
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
                            WHERE is_release = 'Y'`;
                            
        commonMapper.getQuery(querystring, "", req, callback);
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
                           WHERE seq = ?`;
                                
            commonMapper.getQuery(querystring, seq, req, callback);
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
        var updated_by = req.body.updated_by;
        var data = [title, contents, images, created_by, updated_by];
      
        var querystring = `INSERT INTO nodeJs_DB_BOARD
                                  (title, contents, images, created_by, updated_by, is_release) values(?, ?, ?, ?, NOW(), "Y")`;
                                    
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
                              SET is_release = "N"
                            WHERE seq =  ?`;   
                                                   
        commonMapper.getQuery(querystring, seq, req, callback);
    }
}

module.exports = boardMapper;