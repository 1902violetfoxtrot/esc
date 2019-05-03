const Sequelize = require('sequelize')
const db = require('../db')

const Label = db.define('label', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Label;
