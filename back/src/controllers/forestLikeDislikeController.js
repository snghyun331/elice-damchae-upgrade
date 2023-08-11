import { forestLike } from '../db/schemas/forestLike.js';
import { forestDislike } from '../db/schemas/forestDislike.js';
import { forestLikeDislikeModel } from '../db/models/forestLikeDisLikeModel.js';
import { forestLikeDislikeService } from '../services/forestLikeDislikeService.js';
import mongoose from 'mongoose';

class forestLikeDislikeController {
  static async readForestPostLikes(req, res, next) {
    try {
      const postId = req.params.postId;
      const likes = await forestLike.find({ postId: postId });
      return res.status(200).json({ result: 'Success', likes });
    } catch (error) {
      next(error);
    }
  }

  static async readForestPostDisikes(req, res, next) {
    try {
      const postId = req.params.postId;
      const dislikes = await forestDislike.find({ postId: postId });
      return res.status(200).json({ result: 'Success', dislikes });
    } catch (error) {
      next(error);
    }
  }

  static async createForestPostLike(req, res, next) {
    try {
      // 좋아요를 클릭했을 때, 좋아요 누른 사용자ID와 포스트ID가 받아와짐
      const postId = req.params.postId;
      const userId = req.currentUserId;

      const result = await forestLikeDislikeService.createForestPostLike(
        userId,
        postId,
      );

      if (result.errorMessage) {
        throw new Error(result.errorMessage);
      }

      return res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async createForestPostDislike(req, res, next) {
    try {
      // 싫어요를 클릭했을 때, 싫어요 누른 사용자ID와 포스트ID가 받아와짐
      const postId = req.params.postId;
      const userId = req.currentUserId;

      const result = await forestLikeDislikeService.createForestPostDislike(
        userId,
        postId,
      );

      if (result.errorMessage) {
        throw new Error(result.errorMessage);
      }

      return res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  // 좋아요를 취소하는 콜백 함수
  static async deleteForestPostLike(req, res, next) {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      // 좋아요를 취소했을 때, 취소한 사용자ID와 포스트ID가 받아와짐
      const postId = req.params.postId;
      const userId = req.currentUserId;

      const likeInfo = await forestLike.findOneAndDelete(
        {
          userId,
          postId,
        },
        { session },
      );
      if (likeInfo) {
        await forestLikeDislikeModel.updateClickCounts(postId, -1, 0);
      }

      // 트랜잭션 커밋
      await session.commitTransaction();
      session.endSession();

      return res.status(200).json({ result: 'Success' });
    } catch (error) {
      // 트랜잭션 롤백
      await session.abortTransaction();
      session.endSession();
      next(error);
    }
  }

  // 싫어요를 취소하는 콜백 함수
  static async deleteForestPostDislike(req, res, next) {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      // 싫어요를 취소했을 때, 취소한 사용자ID와 포스트ID가 받아와짐
      const postId = req.params.postId;
      const userId = req.currentUserId;

      const dislikeInfo = await forestDislike.findOneAndDelete(
        {
          userId,
          postId,
        },
        { session },
      );
      if (dislikeInfo) {
        await forestLikeDislikeModel.updateClickCounts(postId, 0, -1);
      }

      // 트랜잭션 커밋
      await session.commitTransaction();
      session.endSession();

      return res.status(200).json({ result: 'Success' });
    } catch (error) {
      // 트랜잭션 롤백
      await session.abortTransaction();
      session.endSession();
      next(error);
    }
  }
}

export { forestLikeDislikeController };
