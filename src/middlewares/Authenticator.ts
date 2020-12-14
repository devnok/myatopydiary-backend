import { NextFunction, Request, Response } from 'express';

import ResponseError from '@modules/Response/ResponseError';

export default (req: Request, res: Response, next: NextFunction) => {
  console.log(req.user);
  const account: Account | undefined = req.user as any;
  if (!account) {
    next(new ResponseError.Unauthorized('인증되지 않은 사용자입니다.'));
  }
  next();
};
