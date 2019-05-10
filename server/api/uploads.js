const router = require('express').Router();
const googleCV = require('../db/models/googleCVAPI');
const redis = require('redis');
const redisClient = redis.createClient();
const { Location, Label } = require('../db/models');
// const multer = require('multer');
// const path = require('path');

redisClient.on('error', function(err) {
  console.log('Error ' + err);
});

// const storage = multer.diskStorage({
//   destination: function(req, file, callback) {
//     callback(null, path.join(__dirname, '..', '../public/uploads'));
//   },
//   filename: function(req, file, callback) {
//     callback(
//       null,
//       file.fieldname + '-' + Date.now() + path.extname(file.originalname)
//     );
//   }
// });

// const upload = multer({ storage: storage }).array('files');

module.exports = router;
router.post('/', async (req, res, next) => {
  try {
    // upload(req, res, err => {
    //   if (err) {
    //     console.error('Failed to upload file');
    //   } else {
    const files = req.files.files;
    let arrOfFilePaths = [];
    if (Array.isArray(files)) {
      files.forEach(file => arrOfFilePaths.push(file.path));
    } else {
      arrOfFilePaths.push(files.path);
    }

    let labels;

    await redisClient.get('idAndLabels', async function(reply) {
      if (reply) {
        labels = JSON.parse(reply);
      } else {
        labels = await Label.findAll({ attributes: ['id', 'name'] });
        redisClient.set('idAndLabels', JSON.stringify(labels));
      }
      await googleCV.setLabels(arrOfFilePaths);
      const locations = await googleCV.getMostFrequentCities(labels, Label);

      const locationPromises = locations.map(async locName =>
        await Location.findOne({
          where: { name: locName },
          attributes: ['code']
        })
      );
      const locationCodes = (await Promise.all(locationPromises)).map( loc => loc.dataValues.code );

      res.json(locationCodes);
    });
  } catch (error) {
    next(error);
  }
});
