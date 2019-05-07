const router = require('express').Router();
const GoogleCloudVisionAPI = require('../db/models/googleCVAPI');
module.exports = router;

router.post('/', async (req, res, next) => {
  try {
    const filePath = req.files.file.path;
    await GoogleCloudVisionAPI.setLabels(filePath);
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});
