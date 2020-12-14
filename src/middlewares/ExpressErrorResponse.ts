import { NextFunction, Request, Response } from 'express';

import ResponseError from 'modules/Response/ResponseError';

function generateErrorResponseError(e: Error, code: Number) {
  return typeof e.message === 'string'
    ? { code, message: e.message }
    : e.message;
}

async function ExpressErrorResponse(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log(err);
  if (err instanceof ResponseError.BaseResponse) {
    return res
      .status(err.statusCode)
      .json(generateErrorResponseError(err, err.statusCode));
  }
  next(err);
}

export default ExpressErrorResponse;
