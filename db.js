const Sequelize = require('sequelize');

const connection = new Sequelize('node-sequilize', 'mohib', '100200', {
  host: 'localhost',
  dialect: 'mysql',
});
