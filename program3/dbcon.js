import mysql from 'mysql';
import dotenv from 'dotenv';

dotenv.config()

var pool = mysql.createPool({
  connectionLimit: 10,
  host: "classmysql.engr.oregonstate.edu",
  user: process.env.user,
  password: process.env.pass,
  database: process.env.user
});

export default pool;

