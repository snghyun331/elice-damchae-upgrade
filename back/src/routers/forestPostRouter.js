import express from 'express';
import ForestController from '../controllers/forestController.js';
import { loginRequired } from '../middlewares/loginRequired.js';
const router = express.Router();

// 글 전체 조회
router.get('/', ForestController.getAllPosts);

// 글 단일 조회
router.get('/:id', ForestController.findByPost);

// 글 등록
router.post('/', loginRequired, ForestController.createPost);

// 글 수정
router.put('/:id', loginRequired, ForestController.updatePost);

// 글 삭제
router.delete('/:id', loginRequired, ForestController.deletePost);

export default router;
