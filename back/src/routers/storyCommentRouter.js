import { Router } from 'express';
import { loginRequired } from '../middlewares/loginRequired.js';
import { storyCommentController } from '../controllers/storyCommentController.js';

const storyCommentRouter = Router();

storyCommentRouter.post(
  '/:storyId/comments',
  loginRequired,
  storyCommentController.createStoryComment,
);

storyCommentRouter.get(
  '/:storyId/comments',
  storyCommentController.readStoryComment,
);

storyCommentRouter.patch(
  '/comments/:commentId',
  loginRequired,
  storyCommentController.updateStoryComment,
);

storyCommentRouter.delete(
  '/comments/:commentId',
  loginRequired,
  storyCommentController.deleteStoryComment,
);

export { storyCommentRouter };
