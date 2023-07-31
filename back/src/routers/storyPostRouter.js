import { Router } from 'express';
import multer from 'multer';
import { loginRequired } from '../middlewares/loginRequired.js';
import { storyPostController } from '../controllers/storyPostController.js';
import { fileSize } from '../utills/constant.js';

const storyPostRouter = Router();

const upload = multer({
  dest: 'uploads/',
  limits: { fileSize: fileSize },
});

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

// storyPostRouter.patch(
//   '/stories/:storyId',
//   loginRequired,
//   upload.single('thumbnail'),
//   storyPostController.updateStoryPost,
// );

storyPostRouter.delete(
  '/stories/:storyId',
  loginRequired,
  storyPostController.deleteStoryPost,
);

storyPostRouter.get('/stories/:storyId', storyPostController.readStoryDetail);

storyPostRouter.get('/stories', storyPostController.readAllStories);

export { storyPostRouter };
