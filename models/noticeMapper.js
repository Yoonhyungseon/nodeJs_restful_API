var commonMapper = require('../models/commonMapper');

/**************************************************
* @Method : noticeMapper
* @Description : 공지사항
* @Author : Hyung-Seon. Yoon
* @Version : 2021. 7. 12.
**************************************************/
var noticeMapper = {

    /**************************************************
    * @Method : getList
    * @Description : 공지사항 리스트 조회
    * @Author : Hyung-Seon. Yoon
    * @Version : 2021. 7. 12.
    **************************************************/
    getList: function(req, callback){
        var querystring = `SELECT * 
                             FROM nodeJs_DB_NOTICE
                            WHERE is_release = 'Y'
                              AND delete_yn = 'N'
                            ORDER BY ranking IS NULL ASC,
                                     ranking ASC,
                                     updated_at DESC`;

                            
        commonMapper.getQuery(querystring, "", req, callback);
    },

    /**************************************************
    * @Method : updateRelease
    * @Description : 공지사항 노출여부 변경
    * @Author : Hyung-Seon. Yoon
    * @Version : 2021. 7. 12.
    **************************************************/
     updateRelease: function(req, callback){
        var seq = req.body.seq;
        var is_release = req.body.is_release;
        var data = [is_release, seq];
        var querystring = `UPDATE nodeJs_DB_NOTICE
                              SET is_release = ?
                            WHERE seq = ?`; 
                                    
        commonMapper.getQuery(querystring, data, req, callback);
        },

    /**************************************************
    * @Method : updateRanking
    * @Description : 공지사항 노출순위 변경
    * @Author : Hyung-Seon. Yoon
    * @Version : 2021. 7. 12.
    **************************************************/
     updateRanking: function(req, callback){
        var seq = req.body.seq;
        var ranking = req.body.ranking;
        var data = [ranking, seq];
        var querystring = `UPDATE nodeJs_DB_NOTICE
                              SET ranking = ?
                            WHERE seq =  ?`; 
                                    
        commonMapper.getQuery(querystring, data, req, callback);
        },

    /**************************************************
    * @Method : getView
    * @Description : 공지사항 상세 조회
    * @Author : Hyung-Seon. Yoon
    * @Version : 2021. 7. 12.
    **************************************************/
    getView: function(req, callback){
        var seq = req.query.seq;
        var querystring = `SELECT * 
                           FROM nodeJs_DB_NOTICE
                          WHERE seq = ?
                            AND delete_yn = 'N'
                            AND is_release = 'Y'`;
                                
        commonMapper.getQuery(querystring, seq, req, callback);
    },

    /**************************************************
    * @Method : updateContents
    * @Description : 공지사항 수정
    * @Author : Hyung-Seon. Yoon
    * @Version : 2021. 7. 12.
    **************************************************/
     updateContents: function(req, callback){
        var seq = req.body.seq;
        var title = req.body.title;
        var contents = req.body.contents;
        var images = req.body.images;
        var is_release = req.body.is_release;
        var ranking = req.body.ranking;
        var data = [title, contents, images, is_release, ranking, seq];

        var querystring = `UPDATE nodeJs_DB_NOTICE
                              SET title = ?,
                                  contents = ?,
                                  images = ?,
                                  updated_at = NOW(),
                                  is_release = ?,
                                  ranking = ?
                            WHERE seq =  ?`;
                                    
        commonMapper.getQuery(querystring, data, req, callback);
        },

    /**************************************************
    * @Method : noticeWrite
    * @Description : 공지사항 등록
    * @Author : Hyung-Seon. Yoon
    * @Version : 2021. 7. 12.
    **************************************************/
    noticeWrite: function(req, callback){
        var title = req.body.title;
        var contents = req.body.contents;
        var images = req.body.images;
        var created_by = req.body.created_by;
        var updated_at = req.body.updated_at;
        var ranking = req.body.ranking;
        var data = [title, contents, images, created_by, ranking, updated_at];
      
        var querystring = `INSERT INTO nodeJs_DB_NOTICE (title, contents, images, created_by, ranking, updated_at, is_release) 
                                values (?, ?, ?, ?, ?, NOW(), "Y")`;
                                    
        commonMapper.getQuery(querystring, data, req, callback);
    },

    /**************************************************
    * @Method : noticeDelete
    * @Description : 공지사항 삭제
    * @Author : Hyung-Seon. Yoon
    * @Version : 2021. 7. 12.
    **************************************************/
    noticeDelete: function(req, callback){
        var seq = req.body.seq;
        var querystring = `UPDATE nodeJs_DB_NOTICE
                              SET delete_yn = "Y"
                            WHERE seq =  ?`;   
                                                   
        commonMapper.getQuery(querystring, seq, req, callback);
    }
}

module.exports = noticeMapper;