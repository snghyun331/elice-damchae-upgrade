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
export { forestCommentRouter };
