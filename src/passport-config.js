import { Strategy, ExtractJWT } from 'passport-jwt';
import mongoose from 'mongoose';
import User from './models/user';

require('dotenv').config();

const secret = process.env.SECRET || 'Some other secret as default';
const opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretKey: secret
};

module.exports = passport => {
  passport.use(
    new Strategy(opts, (payload, done) => {
      User.findById(payload.id)
        .then(user => {
          if (user) {
            return done(null, {
              id: user.id,
              name: user.name,
              email: user.email
            });
          }
          return done(null, false);
        })
        .catch(err => console.error(err));
    })
  );
};
