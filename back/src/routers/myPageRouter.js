import { Router } from 'express';
import { loginRequired } from '../middlewares/loginRequired.js';
import { myPageController } from '../controllers/myPageController.js';

const myPageRouter = Router();

myPageRouter.get(
  '/my/allComments',
  loginRequired,
  myPageController.readMyStoryAndForestComments,
);

export { myPageRouter };
