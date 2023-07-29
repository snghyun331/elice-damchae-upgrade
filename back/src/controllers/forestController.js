// forestController.js
import ForestService from '../services/forestService.js';
import { statusCode } from '../utills/statusCode.js';
import BadRequest from '../middlewares/error/badRequest.js';
import { imageService } from '../services/imageService.js';
class ForestController {
  static async createPost(req, res, next) {
    try {
      if (!req.currentUserId) {
        return res
          .status(400)
          .json({ message: '글을 등록하려면 로그인이 필요합니다.' });
      }
      const forestId = req.currentUserId;
      const forestInfo = forestId;

      const { title, content, imageUrl, mbti, thumbnail, mood } = req.body;
      const file = req.file ?? null;
      let thumbnailLocal;
      let thumbnailLocalId;
      let forestPostInfo;
      if (file && !thumbnail) {
        thumbnailLocal = await imageService.uploadImage({ file });
        thumbnailLocalId = thumbnailLocal._id;
        forestPostInfo = await ForestService.createPost({
          userId: forestInfo,
          title,
          content,
          thumbnail: thumbnailLocalId,
          mbti,
          imageUrl,
          mood,
        });
      } else if (!file && thumbnail) {
        forestPostInfo = await ForestService.createPost({
          userId: forestInfo,
          title,
          content,
          thumbnail: thumbnail,
          mbti,
          imageUrl,
          mood,
        });
      } else if (!file && !thumbnail) {
        forestPostInfo = await ForestService.createPost({
          userId: forestInfo,
          title,
          content,
          thumbnail: null,
          mbti,
          imageUrl,
          mood,
        });
      }
      const result = await ForestService.populateStoryPost(
        forestPostInfo,
        'userInfo thumbnail',
      );
      return res.status(201).json(result);
    } catch (error) {
      next(error);
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
      } else if (req.query.option == 'mbti') {
        getAlls = [{ mbti: new RegExp(req.query.mbti) }];
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
  static async readStoryDetail(req, res, next) {
    try {
      const forestServiceInstance = new ForestService();
      const forestId = req.params.forestId;
      const forestInfo = await forestServiceInstance.readStoryDetail({
        forestId,
      });
      const result = await ForestService.populateStoryPost(
        forestInfo,
        'forestInfo thumbnail',
      );
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async readAllStories(req, res, next) {
    try {
      const page = parseInt(req.query.page || 1); // default 페이지: 1
      const { stories, totalPage, count } = await ForestService.readPosts(page);
      const result = await ForestService.populateStoryPost(
        stories,
        'userInfo thumbnail',
      );
      return res.status(200).json({
        currentPage: page,
        totalPage: totalPage,
        totalStoriesCount: count,
        result,
      });
    } catch (error) {
      next(error);
    }
  }
}
export default ForestController;
