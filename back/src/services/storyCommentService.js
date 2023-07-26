import { StoryCommentModel } from '../db/models/storyCommentModel.js';

class StoryCommentService {
  static async createStoryComment({ storyId, writerId, comment, mood }) {
    if (!comment) {
      const errorMessage = '댓글을 입력해주세요';
      return { errorMessage };
    }

    const newComment = { storyId, writerId, comment, mood };
    const createdNewComment = await StoryCommentModel.createStoryComment({
      newComment,
    });
    return createdNewComment;
  }
}

export { StoryCommentService };
