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

Location.prototype.getLabelNames = async () => {
  let labels = [];
  await this.getLabels()
  .then(foundLabels =>
    foundLabels.forEach(
      label => labels.push(label.name)
    )
  );
  return labels;
};

module.exports = Location;
