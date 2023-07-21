import { Router } from 'express';
import { loginRequired } from '../middlewares/loginRequired.js';
import { storyPostController } from '../controllers/storyPostController.js';

const storyPostRouter = Router();

storyPostRouter.post(
	'/stories',
	loginRequired,
	storyPostController.createStoryPost,
);

export { storyPostRouter };
