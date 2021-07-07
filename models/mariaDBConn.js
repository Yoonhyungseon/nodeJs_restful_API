var mariadb = require('mariadb');

const pool = mariadb.createPool({
  host: '49.247.5.30', 
  port: 3306,
  user: 'sumin', 
  password: 'sumin',
  connectionLimit: 5
});

async function DBtest() {
  let conn, rows;
  try {
    conn = await pool.getConnection();
    conn.query('use sumin'); // 사용할 DB 명시
    rows = await conn.query('SELECT * FROM nodeJs_DB'); // 쿼리 실행
  }
  catch (err) { throw err; }
  finally {
    if (conn) conn.end();
    return rows;
  }
}

module.exports = { DBtest, }