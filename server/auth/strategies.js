const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const SpotifyStrategy = require('passport-spotify').Strategy;
const config = require('../config/index.js');


passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

passport.use(
    new SpotifyStrategy(
      {
        clientID: config.spotifyClientId,
        clientSecret: config.spotifyClientSecret,
        callbackURL: `http://localhost:${config.port}/auth/spotify/callback`,
      },
      function (accessToken, refreshToken, expires_in, profile, done) {
        User.findOrCreate({spotifyId: profile.id}, function (err, user) {
          return done(err, user);
        });
      }
    )
  );