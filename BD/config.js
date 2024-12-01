const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'DESKTOP-R2PM8H1',
  user: '',
  password: '',
  database: 'MeuBanco'
});

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados: ' + err.stack);
    return;
  }
  console.log('Conectado ao banco de dados como ID ' + connection.threadId);
});

module.exports = connection;
