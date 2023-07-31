import { forestLike } from '../db/schemas/forestLike.js';
import { forestDislike } from '../db/schemas/forestDislike.js';

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

      // forestLike collection에 좋아요 클릭 정보를 저장
      await forestLike.create({ userId: userId, postId: postId });

      // 만약 싫어요가 이미 클릭되어 있다면, 싫어요가 클릭 정보를 삭제
      await forestDislike
        .findOneAndDelete({ userId: userId, postId: postId })
        .exec();

      return res.status(201).json({ result: 'Success' });
    } catch (error) {
      next(error);
    }
  }

  static async createForestPostDislike(req, res, next) {
    try {
      // 싫어요를 클릭했을 때, 싫어요 누른 사용자ID와 포스트ID가 받아와짐
      const postId = req.params.postId;
      const userId = req.currentUserId;

      // forestDislike collection에 싫어요 클릭 정보를 저장
      await forestDislike.create({ userId: userId, postId: postId });

      // 만약 좋아요가 이미 클릭되어 있다면, 좋아요 클릭 정보를 삭제
      await forestLike
        .findOneAndDelete({ userId: userId, postId: postId })
        .exec();

      return res.status(201).json({ result: 'Success' });
    } catch (error) {
      next(error);
    }
  }

  // 좋아요를 취소하는 콜백 함수
  static async deleteForestPostLike(req, res, next) {
    try {
      // 좋아요를 취소했을 때, 취소한 사용자ID와 포스트ID가 받아와짐
      const postId = req.params.postId;
      const userId = req.currentUserId;

      await forestLike
        .findOneAndDelete({ userId: userId, postId: postId })
        .exec();

      return res.status(200).json({ result: 'Success' });
    } catch (error) {
      next(error);
    }
  }

  // 싫어요를 취소하는 콜백 함수
  static async deleteForestPostDislike(req, res, next) {
    try {
      // 싫어요를 취소했을 때, 취소한 사용자ID와 포스트ID가 받아와짐
      const postId = req.params.postId;
      const userId = req.currentUserId;

      await forestDislike
        .findOneAndDelete({ userId: userId, postId: postId })
        .exec();

      return res.status(200).json({ result: 'Success' });
    } catch (error) {
      next(error);
    }
  }
}

export { forestLikeDislikeController };
