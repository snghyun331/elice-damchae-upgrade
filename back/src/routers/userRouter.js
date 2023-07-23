import { Router } from 'express';
import { userController } from '../controllers/userController.js';

const userRouter = Router();

userRouter.post('/auth/register', userController.userRegister);

userRouter.post('/auth/login', userController.userLogin);

userRouter.put('/users/:userId', userController.userUpdate);

// 닉네임 중복확인
userRouter.get('/auth/check-nickname', userController.checkNickname);

userRouter.put('/auth/out', userController.userWithdraw);

// userRouter.get('user/stories', async function (req, res, next) {});
// userRouter.get('user/postLikes', async function (req, res, next) {});
// userRouter.get('user/comments', async function (req, res, next) {});

export { userRouter };
