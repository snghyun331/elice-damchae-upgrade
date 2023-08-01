import { Router } from 'express';
import { userAuthController } from '../controllers/userController.js';
import { loginRequired } from '../middlewares/loginRequired.js';
import { outUserValidation } from '../middlewares/outUserValidation.js';
import { upload } from '../utills/multer.js';

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

userAuthRouter.put(
  '/users/:userId',
  upload.single('profileImg'),
  userAuthController.userUpdate,
);

userAuthRouter.get('/auth/checkNickname', userAuthController.checkNickname);

userAuthRouter.put('/auth/out', userAuthController.userDelete);

userAuthRouter.post('/auth/sendEmailCode', userAuthController.sendAuthCode);

userAuthRouter.post('/auth/checkEmailCode', userAuthController.validateString);

export { userAuthRouter };
