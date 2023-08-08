import ForestService from '../services/forestService.js';
import axios from 'axios';
import { forestCommentService } from '../services/forestCommentService.js';

class ForestController {
  // 대나무숲 글 등록 전 감정분석 수행하기
  static async getPredict(req, res, next) {
    try {
      const { content } = req.body;
      const pureContent = content.replace(/<[^>]+>/g, ' '); // content에 html태그가 섞여오기 때문에 태그 제거하기
      // flask에서 'text': pureContent 형태로 request로 들어감
      const obj = await axios.post(
        process.env.SENTIMENT_PREDICT_FLASK_SERVER_URL,
        {
          text: pureContent,
        },
      );
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
          'user',
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
          'user',
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
          'user',
        );

        if (populateResult.length === 0) {
          throw new Error('검색 결과가 없습니다.');
        }

        result = {
          currentPage: page,
          totalPage: totalPage,
          totalCount: count,
          forests: populateResult,
        };
      } else {
        const { forests, totalPage, count } = await ForestService.findByForest(
          limit,
          page,
        );
        const populateResult = await ForestService.populateForestPost(
          forests,
          'user',
        );

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
      const forestId = req.params.id;
      const userId = req.currentUserId;

      const postUser = await ForestService.readForestDetail({ forestId });

      if (!postUser) {
        throw new Error('해당 게시물이 존재하지 않습니다.');
      }

      if (!postUser || !userId) {
        throw new Error('스토리 수정 권한이 없습니다.');
      }

      const { title, content, mood } = req.body;
      if (postUser.userInfo.toString() === userId) {
        const post = await ForestService.updatePost({
          forestId,
          title,
          content,
          mood,
        });

        const result = await ForestService.populateForestPost(post, 'userInfo');
        return res.status(200).send(result);
      } else {
        throw new Error('스토리 수정 권한이 없습니다.');
      }
    } catch (error) {
      next(error);
    }
  }

  static async deletePost(req, res, next) {
    try {
      console.log('Request Params:', req.params); // 로그 추가
      console.log('Request Body:', req.body); // 로그 추가

      const forestId = req.params.id;
      const userId = req.currentUserId; // 로그인한 사용자의 ID
      const postUser = await ForestService.readForestDetail({ forestId });

      if (!postUser || !userId) {
        throw new Error('스토리 삭제 권한이 없습니다.');
      }

      // 로그인한 사용자와 게시글 작성자 비교
      if (postUser.userInfo.toString() === userId) {
        const post = await ForestService.deletePost({ forestId });

        const result = await ForestService.populateForestPost(post, 'userInfo');
        return res.status(200).send(result);
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

      const result = await ForestService.populateForestPost(forestInfo, 'user');
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
  static async getUserPosts(req, res, next) {
    try {
      const userId = req.currentUserId; // 로그인한 사용자의 ID

      const page = parseInt(req.query.page || 1); // 몇 번째 페이지인지
      const limit = 12; // 한페이지에 들어갈 스토리 수

      const { forests, totalPage, count } = await ForestService.findByUserPosts(
        userId,
        limit,
        page,
      );

      const result = {
        currentPage: page,
        totalPage: totalPage,
        totalForestsCount: count,
        forests: forests,
      };

      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async getPostsByAuthorMBTI(req, res) {
    // api/forests/mbti?filter=ISTJ,ISFJ,INFJ,INTJ,ISTP,ISFP,INFP,INTP,ESTP

    try {
      // let mbtiList = [];

      // if (req.query.filter == '') {
      // mbtiList = [
      // 'ISTJ',
      // 'ISFJ',
      // 'INFJ',
      // 'INTJ',
      // 'ISTP',
      // 'ISFP',
      // 'INFP',
      // 'INTP',
      // 'ESTP',
      // 'ESFP',
      // 'ENFP',
      // 'ENTP',
      // 'ESTJ',
      // 'ESFJ',
      // 'ENFJ',
      // 'ENTJ',
      // ];
      // } else {
      const mbtiList = req.query.filter.split(',');
      // }
      console.log('mbtiList,,,,', mbtiList);

      console.log('mbti query :', mbtiList);

      const page = parseInt(req.query.page || 1); // 몇 번째 페이지인지
      const limit = 12; // 한페이지에 들어갈 스토리 수
      let result;
      const { posts, totalPage, count } = await ForestService.findByForestMbti({
        mbtiList,
        page,
        limit,
      });
      console.log('MBTI List:', mbtiList);
      console.log('Page:', page);
      console.log('Limit:', limit);
      console.log('Total Posts Count:', count);
      console.log('Total Page:', totalPage);
      console.log('Fetched Posts:', posts);
      if (!mbtiList) {
        throw new Error('스토리를 찾을 수 없습니다.');
      }

      const populateResult = await forestCommentService.populateForestComment(
        posts,
        'userInfo',
      );

      result = {
        currentPage: page,
        totalPage: totalPage,
        totalForestsCount: count,
        forests: populateResult,
      };

      return res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default ForestController;
