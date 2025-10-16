import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// bikin pool (bukan connection tunggal)
const pool = mysql.createPool({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQL_DATABASE,
});

// tes koneksi
try {
  const connection = await pool.getConnection();
  console.log('✅ Connected to MySQL database!');
  connection.release();
} catch (err) {
  console.error('❌ Database connection failed:', err.message);
  console.log(err);
}

export default pool;
