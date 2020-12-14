import express, { NextFunction, Request, Response } from 'express';
import winstonLogger, { winstonStream } from '@config/winston';

import Account from '@models/Account';
import ExpressErrorResponse from '@middlewares/ExpressErrorResponse';
import ExpressErrorSequelize from '@middlewares/ExpressErrorSequelize';
import apiRouter from '@routes/.';
import bodyParser from 'body-parser';
import cors from 'cors';
import createError from 'http-errors';
import helmet from 'helmet';
import logger from 'morgan';
import passport from 'passport';
import passportConfig from '@config/passport';

const app = express();

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(logger('dev'));
app.use(logger('combined', { stream: winstonStream }));

app.use(passport.initialize());
passportConfig(passport);
app.use((req: Request, res: Response, next: NextFunction) =>
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (user) req.user = user;
    next();
  })(req, res, next),
);
app.use(apiRouter);

app.use(ExpressErrorSequelize);
app.use(ExpressErrorResponse);

// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
  next(createError(404));
});

// error handler
app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  err.status = err.status || err.statusCode;
  // add this line to include winston logging
  winstonLogger.error(
    `${err.status || 500} - ${err.message} - ${req.originalUrl} - ${
      req.method
    } - ${req.ip}`,
  );

  // render the error page
  res.status(err.status || 500);
  res.json({
    code: err.status,
    message: err.message,
  });
});

export default app;
