require('dotenv').config();

const {
  PORT, JWT_SECRET, MONGO_DB_URL, NODE_ENV,
} = process.env;

const ENV_PORT = PORT || 3000;
const JWT_KEY = (NODE_ENV === 'production') ? JWT_SECRET : 'dev-secret';
const DB_URL = MONGO_DB_URL || 'mongodb://127.0.0.1:27017/diplomdb';

module.exports = {
  ENV_PORT,
  JWT_KEY,
  DB_URL,
};
