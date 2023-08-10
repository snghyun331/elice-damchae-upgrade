import { Router } from 'express';
import { loginRequired } from '../middlewares/loginRequired.js';
import { forestCommentController } from '../controllers/forestCommentController.js';

const forestCommentRouter = Router();

forestCommentRouter.post(
  '/:forestId/comments',
  loginRequired,
  forestCommentController.createForestComment,
);

forestCommentRouter.get(
  '/:forestId/comments/statistics',
  forestCommentController.readCommentStats,
);
forestCommentRouter.put(
  '/comments/:commentId',
  loginRequired,
  forestCommentController.updateForestComment,
);
forestCommentRouter.delete(
  '/:forestId/comments/:commentId',
  loginRequired,
  forestCommentController.deleteForestComment,
);
forestCommentRouter.get(
  '/:forestId/comments',
  forestCommentController.readForestComment,
);

export { forestCommentRouter };
