
'use strict';

require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const userSchema = require('./users.js');

const DATABASE_URL = process.env.NODE_ENV === 'test' ? 'sqlite:memory:' : process.env.DATABASE_URL||'postgres://localhost:5432/dunia';

const DATABASE_CONFIG = process.env.NODE_ENV === 'production' ? {
  dialectOptions: {
    ssl: true,
    rejectUnauthorized: false,
  }
} : {}

const sequelize = new Sequelize(DATABASE_URL, DATABASE_CONFIG);

module.exports = {
  db: sequelize,
  users: userSchema(sequelize, DataTypes),
}












// "use strict";

// require("dotenv");

// const UsersModel = require('./users');
// //Connect to the database
// const POSTGRES_URI = process.env.NODE_ENV="test" ?'sqlite:memory' :'postgres://localhost:5432/dunia';
// const {Sequelize, DataTypes} = require('sequelize');
// // const POSTGRES_URI = 'postgres://localhost:5432/dunia';

// // config for prod
// const sequelize = new Sequelize(POSTGRES_URI, {});

// module.exports = {
//     db: sequelize,
//     UsersModel:UsersModel(sequelize, DataTypes),
    
//   }
