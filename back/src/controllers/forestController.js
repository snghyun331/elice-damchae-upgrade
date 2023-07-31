// forestController.js
import ForestService from '../services/forestService.js';
import axios from 'axios';
// import { statusCode } from '../utills/statusCode.js';
// import BadRequest from '../middlewares/error/badRequest.js';

class ForestController {
  // 대나무숲 글 등록 전 감정분석 수행하기
  static async getPredict(req, res, next) {
    try {
      const { content } = req.body;
      const pureContent = content.replace(/<[^>]+>/g, ' '); // content에 html태그가 섞여오기 때문에 태그 제거하기
      // flask에서 'text': pureContent 형태로 request로 들어감
      const obj = await axios.post('http://127.0.0.1:5000/predict', {
        text: pureContent,
      });
      // console.log(obj.data)  ->  (예) { mood : 'pleasure' }
      return res.status(201).json(obj.data);
    } catch (error) {
      next(error);
    }
  }

  // 대나무숲 글 등록
  static async createPost(req, res, next) {
    try {
      const userId = req.currentUserId; // 로그인한 유저의 ID를 userId에 저장

      // request body에는 제목, 내용, 감정분석 후 나온 감정데이터가 들어갑니다.
      const { title, content, mood } = req.body;
      const newPost = await ForestService.createPost({
        userId,
        title,
        content,
        mood,
      });
      const result = await ForestService.populateForestPost(newPost, 'userId'); // userId 필드를 기준으로 populate (userId에 자동으로 'User'스키마에 담긴 정보가 참조됨)

      return res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async findByForest(req, res, next) {
    try {
      const page = parseInt(req.query.page || 1);
      const limit = 8; // 한페이지에 들어갈 스토리 수
      let getAlls = [];
      if (req.query.option == 'title') {
        getAlls = [{ title: new RegExp(req.query.content) }];
      } else if (req.query.option == 'content') {
        getAlls = [{ content: new RegExp(req.query.content) }];
      } else if (req.query.option == 'mbti') {
        getAlls = [{ mbti: new RegExp(req.query.mbti) }];
      }

      const posts = await ForestService.findByForest({ getAlls });

      return res.status(201).json(posts);
    } catch (error) {
      next(error);
    }
  }

  static async findById(req, res, next) {
    try {
      const _id = req.currentUserId;
      const post = await ForestService.findById({ _id });
      if (!post) {
        throw new Error('존재하지 않는 글입니다');
      }
      return res.status(201).json(post);
    } catch (error) {
      next(error);
    }
  }

  static async updatePost(req, res, next) {
    try {
      const { title, content, imageUrl } = req.body;
      const postId = req.params.id;

      if (!title || !content) {
        throw new Request('Title과 content는 필수 입력 사항입니다.');
      }

      const userId = req.currentUserId;

      let updatePost = {};
      if (!imageUrl) {
        updatePost = {
          _id: postId,
          title,
          content,
          userId,
          imageUrl: imageUrl ?? 'None',
        };
      } else {
        updatePost = { _id: postId, title, content, userId, imageUrl };
      }
      const updatedPost = await ForestService.updatePost(updatePost);

      if (!updatedPost) {
        throw new Error('존재하지 않는 글입니다.');
      }

      return res.status(201).json(updatePost);
    } catch (error) {
      next(error);
    }
  }

  static async deletePost(req, res, next) {
    try {
      // 로그인 상태 확인
      if (!req.currentUserId) {
        return res
          .status(400)
          .json({ message: '글을 삭제하려면 로그인이 필요합니다.' });
      }

      const { title, content, imageUrl } = req.body;
      const postId = req.params.id;

      const userId = req.currentUserId;

      let deletePost = {};
      if (!imageUrl) {
        deletePost = {
          _id: postId,
          title,
          content,
          userId,
          imageUrl: imageUrl ?? 'None',
        };
      } else {
        deletePost = { _id: postId, title, content, userId, imageUrl };
      }
      const deletedPost = await ForestService.deletePost(deletePost);

      if (!deletedPost) {
        throw new Error('존재하지 않는 글입니다.');
      }

      return res.status(201).json(deletedPost);
    } catch (error) {
      next(error);
    }
  }
  static async readStoryDetail(req, res, next) {
    try {
      const forestId = req.params.forestId;
      const forestInfo = await ForestService.readStoryDetail({
        forestId,
      });
      const forests = await ForestService.populateForestPost(
        forestInfo,
        'forestInfo thumbnail',
      );
      return res.status(200).json(forests);
    } catch (error) {
      next(error);
    }
  }

  static async readAllStories(req, res, next) {
    try {
      const page = parseInt(req.query.page || 1); // default 페이지: 1
      const { forest, totalPage, count } = await ForestService.readPosts(page);
      const forests = await ForestService.populateForestPost(
        forest,
        'userInfo thumbnail',
      );
      return res.status(200).json({
        currentPage: page,
        totalPage: totalPage,
        totalForestsCount: count,
        forests,
      });
    } catch (error) {
      next(error);
    }
  }
}
export default ForestController;
