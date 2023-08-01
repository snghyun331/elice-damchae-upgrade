import { Router } from 'express';
import { loginRequired } from '../middlewares/loginRequired.js';
import { forestLikeDislikeController } from '../controllers/forestLikeDislikeController.js';

const forestLikeDislikeRouter = Router();

forestLikeDislikeRouter.post(
  '/forest/:postId/upLike',
  loginRequired,
  forestLikeDislikeController.createForestPostLike,
);

forestLikeDislikeRouter.get(
  '/forest/:postId/getLikes',
  forestLikeDislikeController.readForestPostLikes,
);

forestLikeDislikeRouter.post(
  '/forest/:postId/upDislike',
  loginRequired,
  forestLikeDislikeController.createForestPostDislike,
);

forestLikeDislikeRouter.get(
  '/forest/:postId/getDislikes',
  forestLikeDislikeController.readForestPostDisikes,
);

forestLikeDislikeRouter.delete(
  '/forest/:postId/unLike',
  loginRequired,
  forestLikeDislikeController.deleteForestPostLike,
);

forestLikeDislikeRouter.delete(
  '/forest/:postId/unDislike',
  loginRequired,
  forestLikeDislikeController.deleteForestPostDislike,
);

export { forestLikeDislikeRouter };
