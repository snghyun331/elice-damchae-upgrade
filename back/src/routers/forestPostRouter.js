import express from 'express';
import ForestController from '../controllers/forestController.js';
import { loginRequired } from '../middlewares/loginRequired.js';
const router = express.Router();

// 게시글 단일 조회
router.get('/', ForestController.findByForest);

// 글 등록
router.post('/', loginRequired, ForestController.createPost);

// 글 수정
router.put('/:id', loginRequired, ForestController.updatePost);

// 글 삭제
router.delete('/:id', loginRequired, ForestController.deletePost);

// MBTI 별로 게시물 조회
router.get('/mbti/:mbti', ForestController.getByMbti);

export default router;
