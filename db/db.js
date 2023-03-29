const mysql = require("mysql2");

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "Sincerely!23",
    database: "manager",
  },
  console.log(`Connected to the manager database. \n`)
);

db.connect(function(err){
  if (err) throw err;
});

module.exports = db;