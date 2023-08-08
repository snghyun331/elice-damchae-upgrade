import { Router } from 'express';
import { userAuthController } from '../controllers/userController.js';
import { loginRequired } from '../middlewares/loginRequired.js';
import { outUserValidation } from '../middlewares/outUserValidation.js';
import { uploadS3 } from '../utills/multer.js';

const userAuthRouter = Router();

userAuthRouter.post(
  '/auth/register',
  uploadS3.single('profileImg'),
  userAuthController.registerUser,
);

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
  '/auth/update',
  loginRequired,
  uploadS3.single('profileImg'),
  userAuthController.updateUser,
);

userAuthRouter.get('/auth/checkNickname', userAuthController.checkNickname);

userAuthRouter.put('/auth/out', userAuthController.deleteUser);

userAuthRouter.post('/auth/sendEmailCode', userAuthController.sendAuthCode);

userAuthRouter.post('/auth/checkEmailCode', userAuthController.validateString);

export { userAuthRouter };
