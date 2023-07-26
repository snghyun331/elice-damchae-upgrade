import { Router } from 'express';
import { loginRequired } from '../middlewares/loginRequired.js';
import { StoryCommentController } from '../controllers/storyCommentController.js';

const storyCommentRouter = Router();

storyCommentRouter.post(
  '/stories/:storyId/comments',
  loginRequired,
  StoryCommentController.createStoryComment,
);

export { storyCommentRouter };
