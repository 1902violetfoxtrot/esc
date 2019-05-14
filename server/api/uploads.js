const router = require('express').Router();
const googleCV = require('../db/models/googleCVAPI');
const { Location, Label } = require('../db/models');
let redisClient;

if (process.env.HEROKU_REDIS_RED_URL) {
  redisClient = require('redis').createClient(process.env.HEROKU_REDIS_RED_URL);
} else {
  redisClient = require('redis').createClient();
}

redisClient.on('error', function(err) {
  console.log('Error ' + err);
});

module.exports = router;
router.post('/', async (req, res, next) => {
  try {
    const files = req.files.files;
    let arrOfFilePaths = [];
    if (Array.isArray(files)) {
      files.forEach(file => arrOfFilePaths.push(file.path));
    } else {
      arrOfFilePaths.push(files.path);
    }

    let labels;

    redisClient.get('idAndLabels', async function(reply) {
      if (reply) {
        labels = JSON.parse(reply);
      } else {
        labels = await Label.findAll({ attributes: ['id', 'name'] });
        redisClient.set('idAndLabels', JSON.stringify(labels));
      }
      await googleCV.setLabels(arrOfFilePaths);
      const locationName = await googleCV.getMostFrequentCities(labels, Label);

      const locations = await Promise.all(
        locationName.map(locName =>
          Location.findOne({
            where: { name: locName }
          })
        )
      );

      res.json(locations);
    });
  } catch (error) {
    next(error);
  }
});
