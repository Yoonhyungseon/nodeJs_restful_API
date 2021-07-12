var commonMapper = require('../models/commonMapper');

/**************************************************
* @Method : questionMapper
* @Description : 문의하기
* @Author : Hyung-Seon. Yoon
* @Version : 2021. 7. 12.
**************************************************/
var questionMapper = {

    /**************************************************
    * @Method : getList
    * @Description : 문의하기 리스트 조회
    * @Author : Hyung-Seon. Yoon
    * @Version : 2021. 7. 7.
    **************************************************/
    getList: function(req, callback){
        var querystring = `SELECT * 
                             FROM nodeJs_DB_QUSTION
                            WHERE is_release = 'Y'
                              AND delete_yn = 'N'
                            ORDER BY updated_at DESC`;
                            
        commonMapper.getQuery(querystring, "", req, callback);
    },

    /**************************************************
    * @Method : updatePublic
    * @Description : 문의하기 공개여부 변경
    * @Author : Hyung-Seon. Yoon
    * @Version : 2021. 7. 12.
    **************************************************/
    updatePublic: function(req, callback){
        var seq = req.body.seq;
        var is_public = req.body.is_public;
        var data = [is_public, seq];
        var querystring = `UPDATE nodeJs_DB_QUSTION
                              SET is_public = ?
                            WHERE seq = ?`; 
                                    
        commonMapper.getQuery(querystring, data, req, callback);
        },

    /**************************************************
    * @Method : getView
    * @Description : 문의하기 상세 조회
    * @Author : Hyung-Seon. Yoon
    * @Version : 2021. 7. 12.
    **************************************************/
    getView: function(req, callback){
        var seq = req.body.seq;       
        var querystring = `SELECT *
                             FROM nodeJs_DB_QUSTION AS Q
                            WHERE Q.seq = ?
                              AND Q.delete_yn = 'N'
                              AND Q.is_release = 'Y'`;
         
        commonMapper.getQuery(querystring, seq, req, callback);
    },

    /**************************************************
    * @Method : getView
    * @Description : 문의하기 답변 조회
    * @Author : Hyung-Seon. Yoon
    * @Version : 2021. 7. 12.
    **************************************************/
    getAnsView: function(req, callback){
        var seq = req.body.seq;       
        var querystring = `SELECT *
                             FROM nodeJs_DB_QUSTION AS Q
                       INNER JOIN nodeJs_DB_QUSTION_ANS AS A
                               ON Q.seq = A.up_seq 
                              AND Q.delete_yn = 'N'
                              AND Q.is_release = 'Y'
                            WHERE Q.seq = ?
                              AND A.delete_yn = 'N'
                              AND A.is_release = 'Y'
                         ORDER BY A.updated_at ASC`;
         
        commonMapper.getQuery(querystring, seq, req, callback);
    },

    /**************************************************
    * @Method : updateContents
    * @Description : 문의하기 수정
    * @Author : Hyung-Seon. Yoon
    * @Version : 2021. 7. 12.
    **************************************************/
    updateContents: function(req, callback){
        var seq = req.body.seq;
        var title = req.body.title;
        var contents = req.body.contents;
        var images = req.body.images;
        var is_public = req.body.is_public;
        var data = [title, contents, images, is_public, seq];

        var querystring = `UPDATE nodeJs_DB_QUSTION
                              SET title = ?,
                                  contents = ?,
                                  images = ?,
                                  is_public = ?,
                                  updated_at = NOW()
                            WHERE seq =  ?`;
                                    
        commonMapper.getQuery(querystring, data, req, callback);
        },

    /**************************************************
    * @Method : questionWrite
    * @Description : 문의하기 등록
    * @Author : Hyung-Seon. Yoon
    * @Version : 2021. 7. 12.
    **************************************************/
    questionWrite: function(req, callback){
        var title = req.body.title;
        var contents = req.body.contents;
        var images = req.body.images;
        var created_by = req.body.created_by;
        var updated_at = req.body.updated_at;
        var is_public = req.body.is_public;
        var data = [title, contents, images, created_by, is_public, updated_at];
      
        var querystring = `INSERT INTO nodeJs_DB_QUSTION
                                  (title, contents, images, created_by, is_public, updated_at, is_release) values(?, ?, ?, ?, ?, NOW(), "Y")`;
                                    
        commonMapper.getQuery(querystring, data, req, callback);
    },

    /**************************************************
    * @Method : questionDelete
    * @Description : 문의하기 삭제
    * @Author : Hyung-Seon. Yoon
    * @Version : 2021. 7. 12.
    **************************************************/
    questionDelete: function(req, callback){
        var seq = req.body.seq;
        var querystring = `UPDATE nodeJs_DB_QUSTION
                              SET delete_yn = "Y"
                            WHERE seq =  ?`;   
                                                   
        commonMapper.getQuery(querystring, seq, req, callback);
    }
}

module.exports = questionMapper;