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
      // 이미 loginRequired.js에서 로그인안한 상태로 등록하면 '로그인한 유저만 가능합니다'msg가 떠서 아래 코드는 없어도 될 것 같습니다
      // if (!req.currentUserId) {
      //   return res
      //     .status(400)
      //     .json({ message: '글을 등록하려면 로그인이 필요합니다.' });
      // }

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

  // static async findByForest(req, res, next) {
  //   try {
  //     const forestServiceInstance = new ForestService();

  //     let getAlls = [];
  //     if (req.query.option == 'title') {
  //       getAlls = [{ title: new RegExp(req.query.content) }];
  //     } else if (req.query.option == 'content') {
  //       getAlls = [{ content: new RegExp(req.query.content) }];
  //     } else if (req.query.option == 'mbti') {
  //       getAlls = [{ mbti: new RegExp(req.query.mbti) }];
  //     }

  //     const posts = await forestServiceInstance.findByForest({ getAlls });

  //     statusCode.setResponseCode200(res);
  //     res.send(posts);
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  // static async findById(req, res, next) {
  //   try {
  //     const _id = req.currentUserId;
  //     const forestServiceInstance = new ForestService();
  //     const post = await forestServiceInstance.findById({ _id });
  //     if (!post) {
  //       throw new Error('존재하지 않는 글입니다');
  //     }
  //     statusCode.setResponseCode200(res);
  //     res.send(post);
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  // static async getByMbti(req, res, next) {
  //   try {
  //     const forestServiceInstance = new ForestService();

  //     let getMbtis = [];
  //     if (req.query.option == 'mbti') {
  //       getMbtis = [{ mbti: new RegExp(req.query.mbti) }];
  //     } else {
  //       throw new Error('해당 MBTI가 없습니다');
  //     }

  //     const mbtis = await forestServiceInstance.findByMbti({
  //       getMbtis,
  //     });
  //     statusCode.setResponseCode200(res);
  //     res.send(mbtis);
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  // static async updatePost(req, res, next) {
  //   try {
  //     // 로그인 상태 확인
  //     if (!req.currentUserId) {
  //       return res
  //         .status(400)
  //         .json({ message: '글을 수정하려면 로그인이 필요합니다.' });
  //     }
  //     // console.log(req.body);
  //     const { title, content, imageUrl } = req.body;
  //     const postId = req.params.id;

  //     if (!title || !content) {
  //       throw new BadRequest('Title과 content는 필수 입력 사항입니다.');
  //     }

  //     const userId = req.currentUserId;

  //     const forestServiceInstance = new ForestService();
  //     let updatePost = {};
  //     if (!imageUrl) {
  //       const imageUrl = 'None';
  //       updatePost = { _id: postId, title, content, userId, imageUrl };
  //     } else {
  //       updatePost = { _id: postId, title, content, userId, imageUrl };
  //     }
  //     const updatedPost = await forestServiceInstance.updatePost(updatePost);

  //     if (!updatedPost) {
  //       throw new Error('존재하지 않는 글입니다.');
  //     }

  //     statusCode.setResponseCode200(res);
  //     res.send(updatedPost);
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  // static async deletePost(req, res, next) {
  //   try {
  //     // 로그인 상태 확인
  //     if (!req.currentUserId) {
  //       return res
  //         .status(400)
  //         .json({ message: '글을 삭제하려면 로그인이 필요합니다.' });
  //     }

  //     const { title, content, imageUrl } = req.body;
  //     const postId = req.params.id;

  //     const userId = req.currentUserId;

  //     const forestServiceInstance = new ForestService();
  //     let deletePost = {};
  //     if (!imageUrl) {
  //       const imageUrl = 'None';
  //       deletePost = { _id: postId, title, content, userId, imageUrl };
  //     } else {
  //       deletePost = { _id: postId, title, content, userId, imageUrl };
  //     }
  //     const deletedPost = await forestServiceInstance.deletePost(deletePost);

  //     if (!deletedPost) {
  //       throw new Error('존재하지 않는 글입니다.');
  //     }

  //     statusCode.setResponseCode200(res);
  //     res.send({ message: '글을 삭제했습니다.' });
  //   } catch (error) {
  //     next(error);
  //   }
  // }
  // static async readStoryDetail(req, res, next) {
  //   try {
  //     const forestServiceInstance = new ForestService();
  //     const forestId = req.params.forestId;
  //     const forestInfo = await forestServiceInstance.readStoryDetail({
  //       forestId,
  //     });
  //     const result = await ForestService.populateStoryPost(
  //       forestInfo,
  //       'forestInfo thumbnail',
  //     );
  //     return res.status(200).json(result);
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  // static async readAllStories(req, res, next) {
  //   try {
  //     const page = parseInt(req.query.page || 1); // default 페이지: 1
  //     const { stories, totalPage, count } = await ForestService.readPosts(page);
  //     const result = await ForestService.populateStoryPost(
  //       stories,
  //       'userInfo thumbnail',
  //     );
  //     return res.status(200).json({
  //       currentPage: page,
  //       totalPage: totalPage,
  //       totalStoriesCount: count,
  //       result,
  //     });
  //   } catch (error) {
  //     next(error);
  //   }
  // }
}
export default ForestController;
