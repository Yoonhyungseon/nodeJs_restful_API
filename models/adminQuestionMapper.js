var commonMapper = require('../models/commonMapper');

/**************************************************
* @Method : adminQuestionMapper
* @Description : 관리자 문의하기
* @Author : Hyung-Seon. Yoon
* @Version : 2021. 7. 12.
**************************************************/
var adminQuestionMapper = {

    /**************************************************
    * @Method : updateRelease
    * @Description : 문의하기 노출여부 변경
    * @Author : Hyung-Seon. Yoon
    * @Version : 2021. 7. 12.
    **************************************************/
    updateRelease: function(req, callback){
        var seq = req.body.seq;
        var is_release = req.body.is_release;
        var data = [is_release, seq];
        var querystring = `UPDATE nodeJs_DB_QUSTION
                              SET is_release = ?
                            WHERE seq = ?`; 
                                    
        commonMapper.getQuery(querystring, data, req, callback);
        },

    /**************************************************
    * @Method : updateContents
    * @Description : 문의하기 답변 수정
    * @Author : Hyung-Seon. Yoon
    * @Version : 2021. 7. 12.
    **************************************************/
    updateContents: function(req, callback){
        var seq = req.body.seq;
        var contents = req.body.contents;
        var images = req.body.images;
        var is_release = req.body.is_release;
        var data = [contents, images, is_release, seq];

        var querystring = `UPDATE nodeJs_DB_QUSTION_ANS
                              SET contents = ?,
                                  images = ?,
                                  is_release = ?,
                                  updated_at = NOW()
                            WHERE seq =  ?`;
                                    
        commonMapper.getQuery(querystring, data, req, callback);
        },

    /**************************************************
    * @Method : answearWrite
    * @Description : 문의하기 답변 등록
    * @Author : Hyung-Seon. Yoon
    * @Version : 2021. 7. 12.
    **************************************************/
    answearWrite: function(req, callback){
        var up_seq = req.body.up_seq;
        var contents = req.body.contents;
        var images = req.body.images;
        var created_by = req.body.created_by;
        var updated_at = req.body.updated_at;
        var data = [up_seq, contents, images, created_by, updated_at];
      
        var querystring = `INSERT INTO nodeJs_DB_QUSTION_ANS
                                  (up_seq, contents, images, created_by, updated_at, is_release) values(?, ?, ?, ?, NOW(), "Y")`;
                                    
        commonMapper.getQuery(querystring, data, req, callback);
    },

    /**************************************************
    * @Method : answearDelete
    * @Description : 문의하기 답변 삭제
    * @Author : Hyung-Seon. Yoon
    * @Version : 2021. 7. 12.
    **************************************************/
     answearDelete: function(req, callback){
        var seq = req.body.seq;
        var querystring = `UPDATE nodeJs_DB_QUSTION_ANS
                              SET delete_yn = "Y"
                            WHERE seq =  ?`;   
                                                   
        commonMapper.getQuery(querystring, seq, req, callback);
    }
}

module.exports = adminQuestionMapper;