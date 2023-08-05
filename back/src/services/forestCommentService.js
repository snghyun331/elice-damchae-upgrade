import { forestCommentModel } from '../db/models/forestCommentModel.js';
import { forestModel } from '../db/models/forestModel.js';
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

  static async populateForestComment(info, path) {
    const field = { path: path };
    const result = forestCommentModel.populateForestComment(info, field);
    return result;
  }
}
export { forestCommentService };
