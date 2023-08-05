import { Router } from 'express';
import { loginRequired } from '../middlewares/loginRequired.js';
import { forestCommentController } from '../controllers/forestCommentController.js';

const forestCommentRouter = Router();

forestCommentRouter.post(
  '/forest/:forestId/comments',
  loginRequired,
  forestCommentController.createForestComment,
);

forestCommentRouter.put(
  '/forest/comments/:commentId',
  loginRequired,
  forestCommentController.updateForestComment,
);

forestCommentRouter.get(
  '/forest/:forestId/comments',
  forestCommentController.readForestComment,
);

export { forestCommentRouter };
