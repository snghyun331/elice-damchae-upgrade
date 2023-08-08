import { forestCommentService } from '../services/forestCommentService.js';
import { forestCommentModel } from '../db/models/forestCommentModel.js';
import axios from 'axios';

class forestCommentController {
  static async createForestComment(req, res, next) {
    try {
      const forestId = req.params.forestId;
      const writerId = req.currentUserId;
      const { comment } = req.body;

      if (!comment) {
        throw new Error('댓글을 입력해주세요');
      }
      const obj = await axios.post(
        process.env.SENTIMENT_PREDICT_FLASK_SERVER_URL,
        {
          text: comment,
        },
      );
      const mood = obj.data.mood;
      const newComment = await forestCommentService.createForestComment({
        forestId,
        writerId,
        comment,
        mood,
      });
      console.log('newComment:', newComment);
      const result = await forestCommentService.populateForestComment(
        newComment,
        'forestId writerId',
      );
      return res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async readCommentStats(req, res, next) {
    try {
      const forestId = req.params.forestId;
      const allComments = await forestCommentModel.findCommentsByForestId({
        forestId,
      });
      if (!allComments) {
        return res.status(200).json({ result: 'No Comments' });
      }
      const populated = await forestCommentService.populateForestComment(
        allComments,
        'writerId',
      );

      const calculateMbtisCounts = (mood) => {
        const writers = populated
          .filter((doc) => doc.mood === mood)
          .map((doc) => doc.writerId);

        const allMbtis = writers.map((writer) => writer.mbti);

        return allMbtis.reduce((count, mbti) => {
          count[mbti] = (count[mbti] || 0) + 1;
          return count;
        }, {});
      };

      const pleasureMbtiCounts = calculateMbtisCounts('pleasure');
      const insecureMbtiCounts = calculateMbtisCounts('insecure');
      const sadMbtiCounts = calculateMbtisCounts('sad');
      const neutralMbtiCounts = calculateMbtisCounts('neutral');
      const surpriseMbtiCounts = calculateMbtisCounts('surprise');
      const angerMbtiCounts = calculateMbtisCounts('anger');

      const result = {
        pleasure: pleasureMbtiCounts,
        insecure: insecureMbtiCounts,
        sad: sadMbtiCounts,
        neutral: neutralMbtiCounts,
        surprise: surpriseMbtiCounts,
        anger: angerMbtiCounts,
      };
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  static async updateForestComment(req, res, next) {
    try {
      const commentId = req.params.commentId;
      const userId = req.currentUserId;
      const { updatedComment } = req.body; // 수정된 댓글 내용

      const updatedData = await forestCommentService.updateForestComment({
        commentId,
        userId,
        updatedComment,
      });

      const result = await forestCommentService.populateForestComment(
        updatedData,
        'forestId writerId',
      );

      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async deleteForestComment(req, res, next) {
    try {
      const commentId = req.params.commentId;
      const { deletedComment } = await forestCommentService.deleteForestComment(
        commentId,
      );
      return res.status(200).send({ result: deletedComment });
    } catch (error) {
      next(error);
    }
  }
  // 댓글 개별 조회 컨트롤러
  static async readForestComment(req, res, next) {
    try {
      const forestId = req.params.forestId;
      const page = parseInt(req.query.page || 1);
      const limit = 6;
      const { comments, totalPage, count } =
        await forestCommentService.readForestComment(limit, page, forestId);
      const populageResult = await forestCommentService.populateForestComment(
        comments,
        'writerId',
      );
      const result = {
        currentPage: page,
        totalPage: totalPage,
        totalCommentsCount: count,
        comments: populageResult,
      };

      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
}

export { forestCommentController };
