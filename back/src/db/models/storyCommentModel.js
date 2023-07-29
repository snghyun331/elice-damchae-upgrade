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

  static async populateStoryComment(info, field) {
    const result = StoryComment.populate(info, field);
    return result;
  }

  static async findAndCountAll(skip, limit, storyId) {
    const comments = await StoryComment.find({ storyId: storyId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .exec();

    const count = await StoryComment.countDocuments();
    return { comments, count };
  }
}

export { StoryCommentModel };
