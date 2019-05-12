const router = require('express').Router();
let S3 = require('aws-sdk/clients/s3');
S3 = new S3({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const params = {
      Bucket: process.env.S3_BUCKET,
      Key: process.env.S3_OBJ_KEY
    };
    await S3.getObject(params, (err, data) => {
      if (err) {
        console.error('An error occurred', err);
      } else {
        const mapJSON = JSON.parse(data.Body.toString());
        //console.log(mapJSON);
        res.json(mapJSON).status(200);
      }
    });
  } catch (error) {
    next(error);
  }
});
