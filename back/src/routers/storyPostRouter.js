import { Router } from 'express';
import { loginRequired } from '../middlewares/loginRequired.js';
import { storyPostController } from '../controllers/storyPostController.js';
import { upload } from '../utills/multer.js';

const storyPostRouter = Router();

storyPostRouter.post(
  '/stories',
  loginRequired,
  upload.single('thumbnail'),
  storyPostController.createStoryPost,
);

storyPostRouter.post(
  '/stories/recommend',
  loginRequired,
  storyPostController.getPredict,
);

storyPostRouter.delete(
  '/stories/:storyId',
  loginRequired,
  storyPostController.deleteStoryPost,
);

storyPostRouter.get('/stories/:storyId', storyPostController.readStoryDetail);

storyPostRouter.get('/stories', storyPostController.readAllStories);

storyPostRouter.get(
  '/stories/my/:userId',
  loginRequired,
  storyPostController.readUserStory,
);

// storyPostRouter.get('/stores/my', loginRequired, storyPostController)

export { storyPostRouter };
