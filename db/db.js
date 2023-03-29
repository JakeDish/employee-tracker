const mysql = require("mysql2");

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "",
    database: "manager",
  },
  console.log(`Connected to the manager database. \n`)
);

db.connect(function(err){
  if (err) throw err;
});

module.exports = db;