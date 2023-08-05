import { forestCommentModel } from '../db/models/forestCommentModel.js';

import { forestModel } from '../db/models/forestModel.js';
import User from '../db/models/userModel.js';
import { forestComment } from '../db/schemas/forestComment.js';
class forestCommentService {
  static async createForestComment({ forestId, writerId, comment, mood }) {
    if (!comment) {
      throw new Error('댓글을 입력해주세요');
    }

    const newComment = { forestId, writerId, comment, mood };
    console.log(newComment);
    // forestModel.findAndIncreaseCommentCount({ forestId });

    const createdNewComment = await forestCommentModel.createForestComment({
      newComment,
    });
    console.log(createdNewComment);
    return createdNewComment;
  }

  static async updateForestComment({ commentId, userId, updatedComment }) {
    try {
      // 추가 로깅: commentId 확인
      console.log('Received commentId:', commentId);

      const updateComment = await forestCommentModel.readOneByCommentId(
        commentId,
      );

      // 추가 로깅: 조회 결과 확인
      console.log('Fetched comment for update:', updateComment);

      if (!updateComment) {
        throw new Error('수정할 댓글을 찾을 수 없습니다.');
      }

      const updatedCommentData = await forestCommentModel.updateForestComment(
        commentId,
        userId,
        updatedComment,
      );

      return {
        statusCode: 200,
        message: '댓글을 수정하였습니다.',
        updatedComment: updatedCommentData,
      };
    } catch (error) {
      throw new Error(error);
    }
  }
  static async deleteForestComment(commentId) {
    try {
      const deletedComment = await forestCommentModel.deleteComment(commentId);
      return {
        statusCode: 200,
        message: '댓글 삭제에 성공하셨습니다.',
        deletedComment,
      };
    } catch (error) {
      throw new Error(error);
    }
  }
  // 개별 댓글 조회 서비스
  static async readForestComment(limit, page, forestId) {
    const skip = (page - 1) * limit;
    const { comments, count } = await forestCommentModel.readAllForestComment(
      skip,
      limit,
      forestId,
    );
    const totalPage = Math.ceil(count / limit);
    return {
      statusCode: 200,
      message: '댓글 조회에 성공하셨습니다.',
      comments,
      totalPage,
      count,
    };
  }

  static async populateForestComment(info, path) {
    const field = { path: path };
    const result = forestCommentModel.populateForestComment(info, field);
    return result;
  }
}
export { forestCommentService };
