// forestController.js
import ForestService from '../services/forestService.js';
import { statusCode } from '../utills/statusCode.js';
import BadRequest from '../middlewares/error/badRequest.js';

class ForestController {
  static async createPost(req, res, next) {
    try {
      if (!req.currentUserId) {
        return res
          .status(400)
          .json({ message: '글을 등록하려면 로그인이 필요합니다.' });
      }

      const { title, content, imageUrl, mbti } = req.body;

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
        mbti,
      });

      return res
        .status(200)
        .json({ message: '글을 등록했습니다.', userId: newForestPost });
    } catch (error) {
      next(error);
      return res.status(500).json({
        message: '포스트 생성에 실패했습니다.',
        errorCode: 'INTERNAL_SERVER_ERROR',
      });
    }
  }

  static async findByForest(req, res, next) {
    try {
      const forestServiceInstance = new ForestService();

      let getAlls = [];
      if (req.query.option == 'title') {
        getAlls = [{ title: new RegExp(req.query.content) }];
      } else if (req.query.option == 'content') {
        getAlls = [{ content: new RegExp(req.query.content) }];
      } else if (req.query.option == 'titl+content') {
        getAlls = [
          { title: new RegExp(req.query.content) },
          { content: new RegExp(req.query.content) },
        ];
      } else {
        throw new Error('검색 옵션이 없습니다.');
      }

      const posts = await forestServiceInstance.findByForest({ getAlls });

      statusCode.setResponseCode200(res);
      res.send(posts);
    } catch (error) {
      next(error);
    }
  }

  static async findById(req, res, next) {
    try {
      const _id = req.currentUserId;
      const forestServiceInstance = new ForestService();
      const post = await forestServiceInstance.findById({ _id });
      if (!post) {
        throw new Error('존재하지 않는 글입니다');
      }
      statusCode.setResponseCode200(res);
      res.send(post);
    } catch (error) {
      next(error);
    }
  }

  static async getByMbti(req, res, next) {
    try {
      const forestServiceInstance = new ForestService();

      let getMbtis = [];
      if (req.query.option == 'mbti') {
        getMbtis = [{ mbti: new RegExp(req.query.mbti) }];
      } else {
        throw new Error('해당 MBTI가 없습니다');
      }

      const mbtis = await forestServiceInstance.findByMbti({
        getMbtis,
      });
      statusCode.setResponseCode200(res);
      res.send(mbtis);
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
      next(error);
    }
  }

  static async pagingController(req, res) {
    const { page, q } = req.query;
    try {
      const forestServiceInstance = new ForestService();

      const totalPost =
        await forestServiceInstance.forestRepository.countPosts();
      if (!totalPost) {
        throw Error();
      }

      const {
        board,
        startPage,
        endPage,
        maxPost,
        totalPage,
        currentPage,
        hidePost,
      } = await forestServiceInstance.paging(page, totalPost, q);

      res.render('home', {
        board,
        currentPage,
        startPage,
        endPage,
        maxPost,
        totalPage,
        hidePost,
      });
    } catch (error) {
      res.render('/', { board: [] });
    }
  }
}

export default ForestController;
