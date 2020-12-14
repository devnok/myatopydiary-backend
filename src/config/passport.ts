import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';

import Account from '@models/Account';
import User from '@models/User';
import dotenv from 'dotenv';

dotenv.config();

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET_ACCESS_TOKEN,
};

export default (passport: any) => {
  console.log('strategy');
  passport.use(
    new JwtStrategy(opts, async function (jwtPayload, done) {
      try {
        const account = await Account.findByPk(jwtPayload.id, {
          include: [User],
        });
        if (!account) {
          return done(null, false);
        }
        return done(null, account);
      } catch (err) {
        return done(err, false);
      }
    }),
  );
};
