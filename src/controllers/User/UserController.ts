import { Request, Response, Router } from 'express';

import Account from '@models/Account';
import AtopyDetail from '@models/AtopyDetail';
import BuildResponse from '@modules/Response/BuildResponse';
import ResponseError from '@modules/Response/ResponseError';
import User from '@models/User';
import authenticator from '@middlewares/Authenticator';
import dotenv from 'dotenv';
import expressAsyncHandler from 'express-async-handler';

dotenv.config();

export const UserController = Router().post(
  '/users/adduser',
  authenticator,
  expressAsyncHandler(async (req: Request, res: Response) => {
    const account: Account = req.user as any;
    let {
      name,
      birthday,
      gender,
      atopyDetail: { startYear, comorbidity, visitingHospital },
    } = req.body;
    if (
      !name ||
      !birthday ||
      !gender ||
      !startYear ||
      !comorbidity ||
      !visitingHospital
    ) {
      throw new ResponseError.BadRequest('없는 필드가 있습니다.');
    }

    const user = new User(
      {
        name,
        birthday: new Date(birthday),
        gender,
        atopyDetail: {
          startYear,
          comorbidity,
          visitingHospital,
        },
      },
      {
        include: [AtopyDetail],
      },
    );
    await user.save();
    await account.$add('users', user);

    const buildResponse = BuildResponse.get({
      data: { success: true },
    });
    res.json(buildResponse);
  }),
);
