import express from 'express';
import ForestController from '../controllers/forestController.js';
import { loginRequired } from '../middlewares/loginRequired.js';
const forestPostRouter = express.Router();

// 글 등록
forestPostRouter.post('/', loginRequired, ForestController.createPost);

// 글 감정분석
forestPostRouter.post(
  '/senti-predict',
  loginRequired,
  ForestController.getPredict,
);

forestPostRouter.get('/popularity', ForestController.getForestsByPopularity);

forestPostRouter.get(
  '/popularity/mbti',
  ForestController.getForestMBTIByPopularity,
);

// 글 수정
forestPostRouter.put('/:id', loginRequired, ForestController.updatePost);

// 글 삭제
forestPostRouter.delete('/:id', loginRequired, ForestController.deletePost);

// 게시글 조회
forestPostRouter.get('/', ForestController.findByForest);

// 사용자의 게시물 조회
forestPostRouter.get('/my', loginRequired, ForestController.getUserPosts);

forestPostRouter.get('/mbti', ForestController.getPostsByAuthorMBTI);

// router.get('/mbti', ForestController.getPostsByAuthorMBTI);

forestPostRouter.get('/:forestId', ForestController.readForestDetail);

// 사용자의 MBTI에 해당하는 게시글 조회
// router.get('/mbti', loginRequired, ForestController.readForestByMbti);

export { forestPostRouter };
