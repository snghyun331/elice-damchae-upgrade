import { Router } from 'express';
import { userAuthController } from '../controllers/userController.js';
import { outUserValidation } from '../middlewares/outUserValidation.js';
const userAuthRouter = Router();

userAuthRouter.post('/auth/register', userAuthController.userRegister);

userAuthRouter.post(
  '/auth/login',
  outUserValidation,
  userAuthController.userLogin,
);

userAuthRouter.put('/users/:userId', userAuthController.userUpdate);

// 닉네임 중복확인
userAuthRouter.get('/auth/check-nickname', userAuthController.checkNickname);

userAuthRouter.put('/auth/out', userAuthController.userWithdraw);

// userRouter.get('user/stories', async function (req, res, next) {});
// userRouter.get('user/postLikes', async function (req, res, next) {});
// userRouter.get('user/comments', async function (req, res, next) {});

export { userAuthRouter };
