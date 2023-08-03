// forestController.js
// import { forestModel } from '../db/models/forestModel.js';
import { forestModel } from '../db/models/forestModel.js';
import User from '../db/models/userModel.js';
import ForestService from '../services/forestService.js';
import axios from 'axios';

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
      const userInfo = userId;
      // request body에는 제목, 내용, 감정분석 후 나온 감정데이터가 들어갑니다.
      const { title, content, mood } = req.body;
      const newPost = await ForestService.createPost({
        userInfo,
        title,
        content,
        mood,
      });

      const result = await ForestService.populateForestPost(
        newPost,
        'userInfo',
      ); // userId 필드를 기준으로 populate (userId에 자동으로 'User'스키마에 담긴 정보가 참조됨)

      return res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async findByForest(req, res, next) {
    try {
      const page = parseInt(req.query.page || 1); // 몇 번째 페이지인지
      const limit = 12; // 한페이지에 들어갈 스토리 수

      const { option, searchword } = req.query;
      let getAlls = {};
      let result;

      if (option === 'title') {
        getAlls = { title: new RegExp(searchword, 'i') };
        const { forests, totalPage, count } = await ForestService.findByForest(
          limit,
          page,
          getAlls,
        );
        const populateResult = await ForestService.populateForestPost(
          forests,
          'userInfo thumbnail',
        );

        if (populateResult.length === 0) {
          throw new Error('검색 결과가 없습니다.');
        }

        result = {
          currentPage: page,
          totalPage: totalPage,
          totalForestsCount: count,
          forests: populateResult,
        };
        console.log('populateResult!!!', populateResult);
      } else if (option === 'content') {
        getAlls = { content: new RegExp(searchword, 'i') };
        const { forests, totalPage, count } = await ForestService.findByForest(
          limit,
          page,
          getAlls,
        );
        const populateResult = await ForestService.populateForestPost(
          forests,
          'userInfo thumbnail',
        );

        if (populateResult.length === 0) {
          throw new Error('검색 결과가 없습니다.');
        }

        result = {
          currentPage: page,
          totalPage: totalPage,
          totalforestsCount: count,
          forests: populateResult,
        };
      } else if (option === 'title_content') {
        getAlls = {
          $or: [
            { title: new RegExp(searchword, 'i') },
            { content: new RegExp(searchword, 'i') },
          ],
        };
        const { forests, totalPage, count } = await ForestService.findByForest(
          limit,
          page,
          getAlls,
        );
        const populateResult = await ForestService.populateForestPost(
          forests,
          'userInfo thumbnail',
        );

        if (populateResult.length === 0) {
          throw new Error('검색 결과가 없습니다.');
        }

        result = {
          currentPage: page,
          totalPage: totalPage,
          totalStoriesCount: count,
          forests: populateResult,
        };
      } else {
        const { forests, totalPage, count } = await ForestService.findByForest(
          limit,
          page,
        );
        const populateResult = await ForestService.populateForestPost(
          forests,
          'userInfo thumbnail',
        );

        if (populateResult.length === 0) {
          throw new Error('스토리가 없습니다');
        }

        result = {
          currentPage: page,
          totalPage: totalPage,
          totalForestsCount: count,
          forests: populateResult,
        };
      }

      return res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  // static async findById(req, res, next) {
  //   try {
  //     const forestId = req.currentUserId;
  //     const post = await ForestService.findById({ forestId });
  //     if (!post) {
  //       throw new Error('존재하지 않는 글입니다');
  //     }
  //     return res.status(201).json(post);
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  static async updatePost(req, res, next) {
    try {
      const { title, content, imageUrl } = req.body;
      const forestId = req.params.id;

      if (!title || !content) {
        throw new Request('Title과 content는 필수 입력 사항입니다.');
      }

      const userId = req.currentUserId;

      let updatePost = {};
      if (!imageUrl) {
        updatePost = {
          _id: forestId,
          title,
          content,
          userId,
          imageUrl: imageUrl ?? 'None',
        };
      } else {
        updatePost = { _id: forestId, title, content, userId, imageUrl };
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
      const forestId = req.params.forestId;
      const userId = req.currentUserId; // 로그인한 사용자의 ID
      const postUser = await ForestService.readForestDetail({ forestId });

      // 로그인한 사용자와 게시글 작성자 비교
      if (!postUser || !userId) {
        throw new Error('스토리 삭제 권한이 없습니다.');
      }

      // 로그인한 사용자와 게시글 작성자 비교
      if (postUser.userInfo.toString() === userId) {
        const post = await ForestService.deletePost({ forestId });
        return res.status(200).send(post);
      } else {
        throw new Error('스토리 삭제 권한이 없습니다.');
      }
    } catch (error) {
      next(error);
    }
  }

  static async readForestDetail(req, res, next) {
    try {
      const forestId = req.params.forestId;
      const forestInfo = await ForestService.readForestDetail({ forestId });
      if (!forestInfo) {
        throw new Error('스토리를 찾을 수 없습니다');
      }

      const result = await ForestService.populateForestPost(
        forestInfo,
        'userInfo',
      );
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async readForestByMbti(req, res, next) {
    try {
      // console.log(req.currentUserId);

      const page = parseInt(req.query.page || 1); // 몇 번째 페이지인지
      // const limit = 12; // 한 페이지에 들어갈 스토리 수
      const userId = req.currentUserId;
      const { option, searchword } = req.query;

      let getMbti = {};
      let result;

      if (option === 'mbti') {
        // 'option'이 'mbti'인 경우 'searchword'를 제목(title)에 대한 검색어로 사용하여 MBTI를 검색합니다.

        // 데이터베이스에서 사용자의 MBTI 정보를 조회합니다.
        const user = await User.readById(userId);
        if (!user) {
          throw new Error('사용자를 찾을 수 없습니다.');
        }
        const mbtiInfo = user.mbti;

        // 사용자의 MBTI에 해당하는 대나무숲 글을 찾습니다.
        getMbti = { mbti: new RegExp(searchword, 'i') };
        const forests = await ForestService.findPostsByAuthorMBTI(
          // userId,
          // limit,
          // page,
          getMbti,
        );
        const populatedForests = await ForestService.populateForestPost(
          forests,
          'userInfo',
        );

        if (populatedForests.length === 0) {
          throw new Error('해당 MBTI에 해당하는 대나무숲 글이 없습니다.');
        }

        result = {
          currentPage: page,
          // totalPage: forests.totalPage,
          // totalForestsCount: forests.count,
          forests: populatedForests,
        };
        console.log('forestPost', forests);
      } else {
        // 'option'이 'mbti'가 아닌 경우, 오류를 발생시킵니다.
        throw new Error('잘못된 옵션입니다.');
      }

      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

export default ForestController;
