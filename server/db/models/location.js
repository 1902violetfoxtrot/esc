const Sequelize = require('sequelize')
const db = require('../db')

const Location = db.define('location', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  longitude: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  latitude: {
    type: Sequelize.FLOAT,
    allowNull: false
  }
});

module.exports = Location;
