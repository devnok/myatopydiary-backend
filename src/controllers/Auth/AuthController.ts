import { Request, Response, Router } from 'express';

import Account from '@models/Account';
import BuildResponse from '@modules/Response/BuildResponse';
import ResponseError from '@modules/Response/ResponseError';
import { createHashString } from '@utils/hash';
import dotenv from 'dotenv';
import expressAsyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import ms from 'ms';

dotenv.config();

const { JWT_SECRET_ACCESS_TOKEN } = process.env;

const JWT_ACCESS_TOKEN_EXPIRED = process.env.JWT_ACCESS_TOKEN_EXPIRED || '1y';

const expiresIn = ms(JWT_ACCESS_TOKEN_EXPIRED) / 1000;

export const AuthController = Router()
  .post(
    '/auth/signup',
    expressAsyncHandler(async (req: Request, res: Response) => {
      let { nickname, email, password } = req.body;
      if (!nickname || !email || !password)
        throw new ResponseError.BadRequest('없는 필드가 있습니다.');

      password = await createHashString(password);
      const userData = await Account.findOne({
        where: {
          email,
        },
      });
      if (userData) {
        throw new ResponseError.BadRequest('사용자가 이미 존재합니다.');
      }
      const user = await Account.create({
        nickname,
        email,
        password,
      });
      const data = {
        user,
      };
      const buildResponse = BuildResponse.get({ data });
      res.status(201).json(buildResponse);
    }),
  )
  .post(
    '/auth/signin',
    expressAsyncHandler(async (req: Request, res: Response) => {
      let { email, password } = req.body;
      if (!email || !password)
        throw new ResponseError.BadRequest('없는 필드가 있습니다.');
      const userData = await Account.findOne({
        where: {
          email,
        },
      });
      if (!userData) {
        throw new ResponseError.NotFound('없는 사용자 입니다.');
      }

      const comparePassword = await userData.comparePassword(password);

      if (comparePassword) {
        const payloadToken = {
          id: userData.id,
          nickname: userData.nickname,
          email: userData.email,
        };
        const accessToken = jwt.sign(
          JSON.parse(JSON.stringify(payloadToken)),
          JWT_SECRET_ACCESS_TOKEN!!,
          {
            expiresIn,
          },
        );

        const data = {
          accessToken,
        };
        const buildResponse = BuildResponse.get({ data });
        res.json(buildResponse);
      }
      throw new ResponseError.BadRequest('incorrect email or password!');
    }),
  )
  .get(
    '/profile',
    expressAsyncHandler(async (req: Request, res: Response) => {
      const account: Account | undefined = req.user as any;
      console.log(account?.email);
    }),
  );
