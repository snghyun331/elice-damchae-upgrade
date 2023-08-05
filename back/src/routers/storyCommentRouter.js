import { Router } from 'express';
import { loginRequired } from '../middlewares/loginRequired.js';
import { storyCommentController } from '../controllers/storyCommentController.js';

const storyCommentRouter = Router();

storyCommentRouter.post(
  '/stories/:storyId/comments',
  loginRequired,
  storyCommentController.createStoryComment,
);

storyCommentRouter.get(
  '/stories/:storyId/comments',
  storyCommentController.readStoryComment,
);

storyCommentRouter.patch(
  '/stories/comments/:commentId',
  loginRequired,
  storyCommentController.updateStoryComment,
);

storyCommentRouter.delete(
  '/stories/comments/:commentId',
  loginRequired,
  storyCommentController.deleteStoryComment,
);

export { storyCommentRouter };
