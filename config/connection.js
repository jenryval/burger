const mysql = require('mysql');


const connection = mysql.createConnection({
  host     : 'localhost',
  Port     : 3000,
  user     : 'root',
  password : 'root',
  database : 'burger_db'
});

connection.connect( (err) => {
    if (err) {
      console.error("error connecting: " + err.stack);
      return;
    }
    console.log("connected as id " + connection.threadId);
  });

  module.exports = connection;