import { forestComment } from '../schemas/forestComment.js';

class forestCommentModel {
  static async createForestComment({ newComment }) {
    const createdNewComment = await forestComment.create(newComment);
    return createdNewComment;
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
