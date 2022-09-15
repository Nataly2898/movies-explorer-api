const DATABASE_URL_DEV = 'mongodb://127.0.0.1:27017/diplomdb';
const JWT_SECRET_DEV = 'some-secret-key';

const {
  PORT = 3000,
  NODE_ENV,
  JWT_SECRET,
  DATABASE_URL,
} = process.env;

module.exports = {
  PORT,
  NODE_ENV,
  DATABASE_URL,
  DATABASE_URL_DEV,
  JWT_SECRET,
  JWT_SECRET_DEV,
};
