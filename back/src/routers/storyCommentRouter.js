import { Router } from 'express';
import { loginRequired } from '../middlewares/loginRequired.js';
import { StoryCommentController } from '../controllers/storyCommentController.js';

const storyCommentRouter = Router();

storyCommentRouter.post(
  '/stories/:storyId/comments',
  loginRequired,
  StoryCommentController.createStoryComment,
);

storyCommentRouter.patch(
  '/stories/comments/:commentId',
  loginRequired,
  StoryCommentController.updateStoryComment,
);

storyCommentRouter.delete(
  '/stories/comments/:commentId',
  loginRequired,
  StoryCommentController.deleteStoryComment,
);
export { storyCommentRouter };
