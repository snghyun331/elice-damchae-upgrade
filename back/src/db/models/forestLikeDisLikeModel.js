import ForestPost from '../schemas/forestPost.js';
import { forestLike } from '../schemas/forestLike.js';

class forestLikeDislikeModel {
  static async updateClickCounts(postId, likeIncrement, dislikeIncrement) {
    await ForestPost.updateOne(
      { _id: postId },
      { $inc: { likeCount: likeIncrement, dislikeCount: dislikeIncrement } },
    );
    return;
  }

  static async findLikeForestsByUserId({ userId }) {
    const allLikeForests = await forestLike.find({ userId: userId });
    return allLikeForests;
  }

  static async populateForestLike(info, field) {
    const result = forestLike.populate(info, field);
    return result;
  }
}

export { forestLikeDislikeModel };
