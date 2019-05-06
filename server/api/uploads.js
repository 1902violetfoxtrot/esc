// const path = require('path');
// const multer = require('multer');
const vision = require('@google-cloud/vision');
const router = require('express').Router();
module.exports = router;

async function quickstart(aFile) {
  // Imports the Google Cloud client library

  // Creates a client
  const client = new vision.ImageAnnotatorClient({
    keyFilename: './API.json'
  });

  // Performs label detection on the image file
  const [result] = await client.labelDetection(aFile);
  const labels = result.labelAnnotations;
  console.log('Labels:');
  labels.forEach(label => console.log(label.description));
}


router.post('/', (req, res, next) => {
  try {
    res.sendStatus(200);
    quickstart(req.files.file.path);
  } catch (error) {
    next(error);
  }
});
