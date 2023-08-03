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

// 감정 통계
storyPostRouter.get(
  '/stories/my/moodStat',
  loginRequired,
  storyPostController.readMyMoodStatistic,
);

// 한달치 내 스토리별 감정 조회 (감정 정보만 return)
storyPostRouter.get(
  '/stories/my/calender',
  loginRequired,
  storyPostController.readMyCalender,
);

// 내 스토리 전체 조회 (스토리 전체 정보 return)
storyPostRouter.get(
  '/stories/my',
  loginRequired,
  storyPostController.readUserStory,
);

storyPostRouter.get('/stories/:storyId', storyPostController.readStoryDetail);

storyPostRouter.get('/stories', storyPostController.readAllStories);

export { storyPostRouter };
