import { forestLikeDislikeModel } from '../db/models/forestLikeDisLikeModel.js';
import mongoose from 'mongoose';

class forestLikeDislikeService {
  static async createForestPostLike(userId, postId) {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      // 좋아요를 이미 눌렀을 경우 에러처리
      const likeInfo = await forestLikeDislikeModel.findLikeInfo(
        userId,
        postId,
      );

      if (likeInfo) {
        const errorMessage = '좋아요를 이미 눌렀습니다';
        return { errorMessage };
      }
      // forestLike collection에 좋아요 클릭 정보를 저장
      await forestLikeDislikeModel.createLike(session, userId, postId);

      // 만약 싫어요가 이미 클릭되어 있다면, 싫어요가 클릭 정보를 삭제
      const dislikeInfo = await forestLikeDislikeModel.deleteLike(
        session,
        userId,
        postId,
      );
      // 싫어요 정보가 있었던 경우에는 싫어요 클릭 수도 1 감소 (좋아요 수는 1증가)
      if (dislikeInfo) {
        await forestLikeDislikeModel.updateClickCounts(postId, 1, -1);
      } else {
        // 싫어요 정보가 없었던 경우에는 좋아요 클릭 수만 업데이트 (+1)
        await forestLikeDislikeModel.updateClickCounts(postId, 1, 0);
      }
      //   likeInfo.errorMessage = null;
      // 트랜잭션 커밋
      await session.commitTransaction();

      return { result: 'Success' };
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
    } finally {
      session.endSession();
    }
  }
}

export { forestLikeDislikeService };
