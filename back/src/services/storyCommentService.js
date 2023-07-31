import { StoryCommentModel } from '../db/models/storyCommentModel.js';
import { StoryPostModel } from '../db/models/storyPostModel.js';

class StoryCommentService {
  static async createStoryComment({ storyId, writerId, comment, mood }) {
    if (!comment) {
      throw new Error('댓글을 입력해주세요');
    }

    const newComment = { storyId, writerId, comment, mood };

    StoryPostModel.findAndIncreaseCommentCount({ storyId });

    const createdNewComment = await StoryCommentModel.createStoryComment({
      newComment,
    });

    return createdNewComment;
  }

  static async updateStoryComment({ commentId, toUpdate }) {
    let comment = await StoryCommentModel.findOneByCommentId({ commentId });

    if (!comment) {
      throw new Error('해당 댓글을 찾을 수 없습니다. 다시 한번 확인해부세요');
    }

    if (toUpdate.comment) {
      const fieldToUpdate = 'comment';
      const newValue = toUpdate.comment;
      comment = await StoryCommentModel.updateComment({
        commentId,
        fieldToUpdate,
        newValue,
      });
    }

    if (toUpdate.mood) {
      const fieldToUpdate = 'mood';
      const newValue = toUpdate.mood;
      comment = await StoryCommentModel.updateComment({
        commentId,
        fieldToUpdate,
        newValue,
      });
    }

    return comment;
  }

  static async deleteStoryComment({ commentId }) {
    const commentInfo = await StoryCommentModel.findOneByCommentId({
      commentId,
    });
    const storyId = commentInfo.storyId;
    StoryPostModel.findAndDecreaseCommentCount({ storyId });
    let isDeleted = await StoryCommentModel.deleteOneByCommentId({ commentId });
    if (!isDeleted) {
      throw new Error('삭제할 댓글 정보가 없습니다.');
    }

    return { result: 'Success' };
  }

  static async populateStoryComment(info, path) {
    const field = { path: path };
    const result = StoryCommentModel.populateStoryComment(info, field);
    return result;
  }

  static async readComments(limit, page, storyId) {
    const skip = (page - 1) * limit;
    const { comments, count } = await StoryCommentModel.findAndCountAll(
      skip,
      limit,
      storyId,
    );
    const totalPage = Math.ceil(count / limit);
    return { comments, totalPage, count };
  }

  static async isSameUser(loginUserId, commentId) {
    const comments = await StoryCommentModel.findOneByCommentId({ commentId });

    const commentWriterId = comments.writerId;

    if (loginUserId == commentWriterId) {
      return true;
    } else {
      return false;
    }
  }
}

export { StoryCommentService };
