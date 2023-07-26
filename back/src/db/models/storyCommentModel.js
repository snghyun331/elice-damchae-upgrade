import { StoryComment } from '../schemas/storyComment.js';

class StoryCommentModel {
  static async createStoryComment({ newComment }) {
    const createdNewComment = await StoryComment.create(newComment);
    return createdNewComment;
  }

  static async findAllByStoryId({ storyId }) {
    const storyComments = await StoryComment.find({ storyId: storyId });
    const populatedComments = await StoryComment.populate(storyComments, {
      path: 'writerId',
    });

    return populatedComments;
  }
}

export { StoryCommentModel };
