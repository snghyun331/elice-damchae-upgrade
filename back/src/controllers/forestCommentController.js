import { forestCommentService } from '../services/forestCommentService.js';
import axios from 'axios';

class forestCommentController {
  static async createForestComment(req, res, next) {
    try {
      const forestId = req.params.forestId;
      const writerId = req.currentUserId;
      const { comment } = req.body;
      if (!comment) {
        throw new Error('댓글을 입력해주세요');
      }
      const obj = await axios.post(
        process.env.SENTIMENT_PREDICT_FLASK_SERVER_URL,
        {
          text: comment,
        },
      );
      const mood = obj.data.mood;
      const newComment = await forestCommentService.createForestComment({
        forestId,
        writerId,
        comment,
        mood,
      });

      const result = await forestCommentService.populateForestComment(
        newComment,
        'forestId writerId',
      );
      return res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }
}

export { forestCommentController };
