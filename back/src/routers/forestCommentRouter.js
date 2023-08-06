import { Router } from 'express';
import { loginRequired } from '../middlewares/loginRequired.js';
import { forestCommentController } from '../controllers/forestCommentController.js';

const forestCommentRouter = Router();

forestCommentRouter.post(
  '/forest/:forestId/comments',
  loginRequired,
  forestCommentController.createForestComment,
);

forestCommentRouter.get(
  '/forest/:forestId/comments/statistics',
  forestCommentController.readCommentStats,
);
forestCommentRouter.put(
  '/forest/:forestId/comments/:commentId',
  loginRequired,
  forestCommentController.updateForestComment,
);
forestCommentRouter.delete(
  '/forest/:forestId/comments/:commentId',
  loginRequired,
  forestCommentController.deleteForestComment,
);
forestCommentRouter.get(
  '/forest/:forestId/comments',
  forestCommentController.readForestComment,
);

export { forestCommentRouter };
