const router = require('express').Router();
const googleCV = require('../db/models/googleCVAPI');
const redis = require('redis');
const redisClient = redis.createClient();
const { Label } = require('../db/models');

redisClient.on('error', function(err) {
  console.log('Error ' + err);
});

module.exports = router;
router.post('/', async (req, res, next) => {
  try {
    const filePath = req.files.file.path;

    let labels;

    await redisClient.get('idAndLabels', async function(reply) {
      if (reply) {
        labels = JSON.parse(reply);
      } else {
        labels = await Label.findAll({ attributes: ['id', 'name'] });
        redisClient.set('idAndLabels', JSON.stringify(labels));
      }
    });
    console.log(req.user.instagramId);
    await googleCV.setLabels(filePath);
    await googleCV.getMostFrequentCities(labels, Label);

    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});
