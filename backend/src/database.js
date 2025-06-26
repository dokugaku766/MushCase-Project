const mysql = require('mysql2/promise');
require('dotenv').config();

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '123qweazsxdcQ',
  database: process.env.DB_NAME || 'mushcase',
  charset: 'utf8mb4'
};

// Создание пула соединений
const pool = mysql.createPool(dbConfig);
module.exports = { pool, testConnection };
// Проверка подключения
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Подключение к MySQL успешно!');
    connection.release();
  } catch (error) {
    console.error('❌ Ошибка подключения к MySQL:', error.message);
  }
}

module.exports = { pool, testConnection };