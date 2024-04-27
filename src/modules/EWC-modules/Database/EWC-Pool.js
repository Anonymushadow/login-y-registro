const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'loginTest',
    connectionLimit: 100 // Número máximo de conexiones en la pool
});

module.exports = pool;