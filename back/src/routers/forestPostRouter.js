import express from 'express';
import ForestController from '../controllers/forestController.js';
import { loginRequired } from '../middlewares/loginRequired.js';
const router = express.Router();

// 게시글 단일 조회
router.get('/search', ForestController.findByForest);

// 글 등록
router.post('/', loginRequired, ForestController.createPost);

// 글 수정
router.put('/:id', loginRequired, ForestController.updatePost);

// 글 삭제
router.delete('/:id', loginRequired, ForestController.deletePost);

router.get('/:forestId', ForestController.readStoryDetail);

router.get('/', ForestController.readAllStories);

export default router;
