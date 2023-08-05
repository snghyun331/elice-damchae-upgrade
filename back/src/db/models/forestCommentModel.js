import { forestComment } from '../schemas/forestComment.js';

class forestCommentModel {
  static async createForestComment({ newComment }) {
    const createdNewComment = await forestComment.create(newComment);
    return createdNewComment;
  }

  static async updateForestComment(commentId, userId, updatedComment) {
    try {
      const comment = await forestComment.findById(commentId);
      console.log('update.model: ', comment);
      if (!comment) {
        throw new Error('수정할 댓글을 찾을 수 없습니다.');
      }

      if (comment.writerId.toString() !== userId) {
        throw new Error('작성자만 댓글을 수정할 수 있습니다.');
      }
      console.log('Before Update - comment.comment:', comment.comment);
      console.log('Updating comment with:', updatedComment);
      comment.comment = updatedComment;
      await comment.save();
      console.log('comment.comment: ', comment.comment);
      return comment;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async readOneByCommentId(commentId) {
    try {
      console.log('Reading comment with ID:', commentId);

      const comment = await forestComment.findOne({
        _id: commentId,
      });

      console.log('Fetched comment:', comment);

      return comment;
    } catch (error) {
      throw new Error(error);
    }
  }
  // 개별 댓글 조회 리포지토리 메서드
  static async readAllForestComment(skip, limit, forestId) {
    const comments = await forestComment
      .find({ forestId: forestId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .exec();

    const count = await forestComment.countDocuments({ forestId: forestId });
    console.log('count: ', count);
    if (!count) {
      throw new Error('요청한 댓글을 찾을 수 없습니다.');
    }

    return { comments, count };
  }
  catch(error) {
    throw new Error(error);
  }

  static async populateForestComment(info, field) {
    const result = forestComment.populate(info, field);
    return result;
  }

  static async findCommentsByForestId({ forestId }) {
    const allComments = forestComment.find({ forestId: forestId });
    return allComments;
  }
}

export { forestCommentModel };
