const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost', // Ou o endereço IP do seu servidor MySQL
  user: 'root',
  password: 'etec',
  database: 'sgc',
  waitForConnections: true,
  connectionLimit: 10, // Número máximo de conexões no pool
  queueLimit: 0
});

module.exports = pool.promise(); // Usamos pool.promise() para trabalhar com Promises