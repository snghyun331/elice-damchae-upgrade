import { Router } from 'express';
import { loginRequired } from '../middlewares/loginRequired.js';
import { myPageController } from '../controllers/myPageController.js';

const myPageRouter = Router();

myPageRouter.get(
  '/my/allComments',
  loginRequired,
  myPageController.readMyStoryAndForestComments,
);

myPageRouter.get(
  '/my/likeForestPosts',
  loginRequired,
  myPageController.readLikeForestPosts,
);

export { myPageRouter };
