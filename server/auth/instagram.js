const passport = require('passport');
const router = require('express').Router();
const InstagramStrategy = require('passport-instagram').Strategy;
const { User } = require('../db/models');
const instagramAPI = require('../db/models/instagramAPI');
module.exports = router;

if (!process.env.INSTAGRAM_CLIENT_ID || !process.env.INSTAGRAM_CLIENT_SECRET) {
  console.log('Instagram client ID / secret not found. Skipping Google OAuth.');
} else {
  const instagramConfig = {
    clientID: process.env.INSTAGRAM_CLIENT_ID,
    clientSecret: process.env.INSTAGRAM_CLIENT_SECRET,
    callbackURL: process.env.INSTAGRAM_CALLBACK
  };

  const strategy = new InstagramStrategy(
    instagramConfig,
    (token, refreshToken, profile, done) => {
      const instagramId = profile.id;
      const name = profile.displayName;
      instagramAPI.setImages(token);

      User.findOrCreate({
        where: { instagramId },
        defaults: { name }
      })
        .then(([user]) => done(null, user))
        .catch(done);
    }
  );

  passport.use(strategy);

  router.get('/', passport.authenticate('instagram', { scope: 'basic' }));

  router.get(
    '/callback',
    passport.authenticate('instagram', {
      successRedirect: '/home',
      failureRedirect: '/login'
    })
  );
}
