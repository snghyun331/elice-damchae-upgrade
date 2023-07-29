// forestController.js
import ForestService from '../services/forestService.js';
import { statusCode } from '../utills/statusCode.js';
import BadRequest from '../middlewares/error/badRequest.js';

class ForestController {
  static async createPost(req, res, next) {
    try {
      // 로그인 상태 확인
      // console.log(req.currentUserId);
      if (!req.currentUserId) {
        return res
          .status(400)
          .json({ message: '글을 등록하려면 로그인이 필요합니다.' });
      }

      const { title, content, imageUrl } = req.body;

      // 필수 데이터인 title과 content가 존재하는지 확인
      if (!title || !content) {
        throw new BadRequest('Title과 content는 필수 입력 사항입니다.');
      }

      // 로그인한 사용자의 정보인 userId를 가져옴
      const userId = req.currentUserId;

      // 글 등록을 위해 필요한 데이터 객체 생성
      const newForestPost = await ForestService.createPost({
        title,
        content,
        imageUrl,
        userId,
      });

      // ForestService.addStoryPost() 메서드 호출 시 newForestPost를 전달
      // const createdForestPost = await ForestService.create(newForestPost);

      return res
        .status(200)
        .json({ message: '글을 등록했습니다.', userId: newForestPost });
    } catch (error) {
      next(error); // handleError 함수를 호출하여 에러를 적절히 처리
      // console.log(error);
      console.log(error);
      return res.status(500).json({
        message: '포스트 생성에 실패했습니다.',
        errorCode: 'INTERNAL_SERVER_ERROR',
      });
    }
  }

  static async getAllPosts(req, res, next) {
    try {
      const forestServiceInstance = new ForestService();

      let getAlls = [];
      if (req.query.option == 'title') {
        getAlls = [{ title: new RegExp(req.query.content) }];
      } else if (req.query.option == 'content') {
        getAlls = [{ content: new RegExp(req.query.content) }];
      } else if (req.query.option == 'title+content') {
        getAlls = [
          { title: new RegExp(req.query.content) },
          { content: new RegExp(req.query.content) },
        ];
      } else {
        throw new Error('검색 옵션이 없습니다.');
      }

      const posts = await forestServiceInstance.findAll({ getAlls });

      statusCode.setResponseCode200(res);
      res.send(posts);
    } catch (error) {
      next(error);
    }
  }

  static async findByPost(req, res, next) {
    try {
      const _id = req.currentUserId;
      const forestServiceInstance = new ForestService();
      const post = await forestServiceInstance.findByPost({ _id });
      if (!post) {
        console.log(post);
        throw new Error('존재하지 않는 글입니다');
      }
      statusCode.setResponseCode200(res);
      res.send(post);
    } catch (error) {
      next(error);
    }
  }

  static async updatePost(req, res, next) {
    try {
      // 로그인 상태 확인
      if (!req.currentUserId) {
        return res
          .status(400)
          .json({ message: '글을 수정하려면 로그인이 필요합니다.' });
      }
      // console.log(req.body);
      const { title, content, imageUrl } = req.body;
      const postId = req.params.id;

      if (!title || !content) {
        throw new BadRequest('Title과 content는 필수 입력 사항입니다.');
      }

      const userId = req.currentUserId;

      const forestServiceInstance = new ForestService();
      let updatePost = {};
      if (!imageUrl) {
        const imageUrl = 'None';
        updatePost = { _id: postId, title, content, userId, imageUrl };
      } else {
        updatePost = { _id: postId, title, content, userId, imageUrl };
      }
      const updatedPost = await forestServiceInstance.updatePost(updatePost);

      if (!updatedPost) {
        throw new Error('존재하지 않는 글입니다.');
      }

      statusCode.setResponseCode200(res);
      res.send(updatedPost);
    } catch (error) {
      console.log(error);
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

      const forestServiceInstance = new ForestService();
      let deletePost = {};
      if (!imageUrl) {
        const imageUrl = 'None';
        deletePost = { _id: postId, title, content, userId, imageUrl };
      } else {
        deletePost = { _id: postId, title, content, userId, imageUrl };
      }
      const deletedPost = await forestServiceInstance.deletePost(deletePost);

      if (!deletedPost) {
        throw new Error('존재하지 않는 글입니다.');
      }

      statusCode.setResponseCode200(res);
      res.send({ message: '글을 삭제했습니다.' });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

export default ForestController;
