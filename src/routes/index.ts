import Account from '@models/Account';
import { AuthController } from '@controllers/Auth/AuthController';
import User from '@models/User';
import { UserController } from '@controllers/User/UserController';
import express from 'express';
import { sequelize } from '@models/_instance';

const router = express.Router();

router.use(AuthController);
router.use(UserController);
export default router;
