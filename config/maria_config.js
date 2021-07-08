const maria = require('mysql');
const conn = maria.createConnection({
  host: '49.247.5.30', 
  port: 3306,
  user: 'sumin', 
  password: 'sumin',
  database: 'sumin',
  connectionLimit: 5
});
module.exports = conn;