const User = require('./user');
const Location = require('./location');
const Label = require('./label');

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

Location.belongsToMany(Label, { through: 'LocationLabel' });
Label.belongsToMany(Location, { through: 'LocationLabel' });

Location.prototype.getLabels = async () => {
  let labels = [];
  await Label.findAll({
    include: [{ model: Location }],
    where: {
      locationId: this.id
    }
  }).then(foundLabels => foundLabels.forEach(label => labels.push(label.name)));
};

module.exports = {
  User,
  Location,
  Label
};
