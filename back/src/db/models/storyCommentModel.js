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

  static async findOneByCommentId({ commentId }) {
    const comment = await StoryComment.findOne({ _id: commentId });
    return comment;
  }

  static async updateComment({ commentId, fieldToUpdate, newValue }) {
    const filter = { _id: commentId };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };
    const updatedComment = await StoryComment.findOneAndUpdate(
      filter,
      update,
      option,
    );
    return updatedComment;
  }

  static async deleteOneByCommentId({ commentId }) {
    const deletedComment = await StoryComment.deleteOne({ _id: commentId });
    const isCompletedDeleted = deletedComment.deletedCount === 1;
    return isCompletedDeleted;
  }
}

export { StoryCommentModel };
