import { Router } from 'express';
import { userServiceController } from '../controllers/userController.js';

const userServiceRouter = Router();

userServiceRouter.get(
  '/user/stories/:userId',
  userServiceController.userStories,
);
userServiceRouter.get(
  '/user/forests/:userId',
  userServiceController.userForests,
);

export { userServiceRouter };
