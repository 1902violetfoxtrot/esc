const router = require('express').Router();
const googleCV = require('../db/models/googleCVAPI');
const redis = require('redis');
const redisClient = redis.createClient();
const { Label } = require('../db/models');
const multer = require('multer');
const path = require('path');

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
    upload(req, res, err => {
      if (err) {
        console.error('Failed to upload file');
      } else {
        const filePath = req.files;
        console.log(filePath);
        // let labels;

        // await redisClient.get('idAndLabels', async function(reply) {
        //   if (reply) {
        //     labels = JSON.parse(reply);
        //   } else {
        //     labels = await Label.findAll({ attributes: ['id', 'name'] });
        //     redisClient.set('idAndLabels', JSON.stringify(labels));
        //   }
        // });
        // await googleCV.setLabels(filePath);
        // await googleCV.getMostFrequentCities(labels, Label);

        res.sendStatus(200);
      }
    });
  } catch (error) {
    next(error);
  }
});
