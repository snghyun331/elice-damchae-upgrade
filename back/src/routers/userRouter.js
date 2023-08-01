import { Router } from 'express';
import { userAuthController } from '../controllers/userController.js';
import { outUserValidation } from '../middlewares/outUserValidation.js';
import multer from 'multer';

const userAuthRouter = Router();

const upload = multer({
  dest: 'uploads/',
  limits: { fileSize: 5 * 1024 * 1024 },
});

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

userAuthRouter.put(
  '/users/:userId',
  upload.single('profileImg'),
  userAuthController.userUpdate,
);

// 닉네임 중복확인
userAuthRouter.get('/auth/checkNickname', userAuthController.checkNickname);

userAuthRouter.put('/auth/out', userAuthController.userDelete);

// 이메일 인증관련
userAuthRouter.post('/sendEmailCode', userAuthController.sendAuthCode);

userAuthRouter.post('/checkEmailCode', userAuthController.validateString);

export { userAuthRouter };
