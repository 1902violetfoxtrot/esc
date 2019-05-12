const router = require('express').Router();
module.exports = router;

router.use('/users', require('./users'));
router.use('/uploads', require('./uploads'));
router.use('/hotels', require('./hotels'));
router.use('/flights', require('./flights'));
router.use('/AWS', require('./getFileAWS'));

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
