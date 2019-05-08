const router = require('express').Router();
const googleCV = require('../db/models/googleCVAPI');
module.exports = router;
router.post('/', async (req, res, next) => {
  try {
    const filePath = req.files.file.path;
    await googleCV.setLabels(filePath);
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});
