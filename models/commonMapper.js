const maria = require('../config/maria_config'); 

/**************************************************
* @Method : commonMapper
* @Description : 쿼리문 공통 로직
* @Author : Hyung-Seon. Yoon
* @Version : 2021. 7. 8.
**************************************************/

var commonMapper = {
    /**************************************************
    * @Method : getQuery
    * @Description : 쿼리 결과 조회 및 결과 반환
    * @Author : Hyung-Seon. Yoon
    * @Version : 2021. 7. 8.
    **************************************************/
    getQuery: function(querystring, data, req, callback){
        
        maria.query(querystring, data, function(err, rows, fields){
            if(!err) {
                console.log("\nmysql success : 'YES'");
                if (rows.length <= 0) console.log(req.query,"is empty");
                if (rows.affectedRows <= 0) console.log("affectedRows : ", rows.affectedRows);

                response = { success : 'YES', info : rows }; 
                callback(response);
            } else {
                console.log("err : " + err);
                callback(err);
            }
        });
    }
}

module.exports = commonMapper;
