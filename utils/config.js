const DB_CONN_DEV = 'mongodb://localhost:27017/moviesdb';
const { NODE_ENV, JWT_SECRET, DB_CONN_PROD } = process.env;

module.exports = {
  DB_CONN_DEV,
  NODE_ENV,
  JWT_SECRET,
  DB_CONN_PROD,
};
