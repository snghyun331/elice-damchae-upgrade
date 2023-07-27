import { Router } from 'express';
import { userAuthController } from '../controllers/userController.js';
import { outUserValidation } from '../middlewares/outUserValidation.js';
const userAuthRouter = Router();

userAuthRouter.post('/auth/register', userAuthController.userRegister);

userAuthRouter.post('/auth/googleRegister', userAuthController.googleRegister);

userAuthRouter.post(
  '/auth/login',
  outUserValidation,
  userAuthController.userLogin,
);

userAuthRouter.post(
  '/auth/googleLogin',
  outUserValidation,
  userAuthController.googleLogin,
);

userAuthRouter.put('/users/:userId', userAuthController.userUpdate);

// 닉네임 중복확인
userAuthRouter.get('/auth/checkNickname', userAuthController.checkNickname);

userAuthRouter.put('/auth/out', userAuthController.userDelete);

// userRouter.get('user/stories', async function (req, res, next) {});
// userRouter.get('user/postLikes', async function (req, res, next) {});
// userRouter.get('user/comments', async function (req, res, next) {});

export { userAuthRouter };
