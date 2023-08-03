import { forestComment } from '../schemas/forestcomment.js';

class forestCommentModel {
  static async createForestComment({ newComment }) {
    const createdNewComment = await forestComment.create({
      newComment,
    });
    return createdNewComment;
  }

  static async populateForestComment(info, field) {
    const result = forestComment.populate(info, field);
    return result;
  }
}
export { forestCommentModel };
