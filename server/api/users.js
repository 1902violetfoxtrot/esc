const router = require('express').Router();
const { User } = require('../db/models');
const instagramAPI = require('../db/models/instagramAPI');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get('/instagram', (req, res, next) => {
  try {
    const instagramImages = instagramAPI.getImages();
    res.json(instagramImages).status(200);
    // let labels;

    // await redisClient.get('idAndLabels', async function(reply) {
    //   if (reply) {
    //     labels = JSON.parse(reply);
    //   } else {
    //     labels = await Label.findAll({ attributes: ['id', 'name'] });
    //     redisClient.set('idAndLabels', JSON.stringify(labels));
    //   }
    // });
    // const instagramImages = instagramAPI.getImages();
    // instagramImages.forEach(async image => {
    //   await googleCV.setLabels(image);
    // });

    // await googleCV.getMostFrequentCities(labels, Label);
  } catch (err) {
    next(err);
  }
});
