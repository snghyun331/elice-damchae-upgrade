import ForestPost from '../schemas/forestPost.js';

class forestLikeDislikeModel {
  static async updateClickCounts(postId, likeIncrement, dislikeIncrement) {
    await ForestPost.updateOne(
      { _id: postId },
      { $inc: { likeCount: likeIncrement, dislikeCount: dislikeIncrement } },
    );
    return;
  }
}

export { forestLikeDislikeModel };
