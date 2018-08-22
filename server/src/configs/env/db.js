const MYSQL_HOST = process.env.MYSQL_HOST || "localhost";
const MYSQL_USER = process.env.MYSQL_USER || "root";
const MYSQL_PASS = process.env.MYSQL_PASS || "123456";
const MYSQL_DATABASE = process.env.MYSQL_DATABASE || "shopApp";
const MYSQL_DATABASE_TEST = process.env.MYSQL_DATABASE_TEST || "shopAppTest";
const MYSQL_PORT = process.env.MYSQL_PORT || "3306";

// database config
const DATABASE = {
  "username": MYSQL_USER,
  "password": MYSQL_PASS,
  "database": MYSQL_DATABASE,
  "database_test": MYSQL_DATABASE_TEST,
  "host": MYSQL_HOST,
  "port": MYSQL_PORT,
  "dialect": "mysql"
};

module.exports = {
  "development": {
    "username": DATABASE['username'],
    "password": DATABASE['password'],
    "database": DATABASE['database'],
    "host": DATABASE['host'],
    "dialect": DATABASE['dialect'],
    "logging": false,
  },
  "production": {
    "username": DATABASE['username'],
    "password": DATABASE['password'],
    "database": DATABASE['database'],
    "host": DATABASE['host'],
    "dialect": DATABASE['dialect'],
    "logging": false,
  },
  "test": {
    "username": DATABASE['username'],
    "password": DATABASE['password'],
    "database": DATABASE['database_test'],
    "host": DATABASE['host'],
    "dialect": DATABASE['dialect'],
    "logging": false,
  }
};
