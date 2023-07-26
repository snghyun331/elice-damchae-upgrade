import { StoryComment } from '../schemas/storyComment.js';

class StoryCommentModel {
  static async createStoryComment({ newComment }) {
    const createdNewComment = await StoryComment.create(newComment);
    return createdNewComment;
  }
}

export { StoryCommentModel };
