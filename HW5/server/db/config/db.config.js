const mariadb = require("mariadb");
const dotenv = require("dotenv");

dotenv.config();

/*
const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 15,

  DB_HOST=eventify.club
DB_USER=eventify
DB_PASSWORD=dev@ccny2030
DB_NAME=Eventify_DB
ShoppingList
});*/

const pool = mariadb.createPool({
  host: "eventify.club",
  user: "eventify",
  password: "dev@ccny2030",
  database: "ShoppingList",
  connectionLimit: 15,
});
/*
const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 15,
});
*/
module.exports = pool;
