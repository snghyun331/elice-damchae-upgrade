import { StoryCommentService } from '../services/storyCommentService.js';
import { StoryComment } from '../db/schemas/storyComment.js';
import axios from 'axios';

const StoryCommentController = {
  createStoryComment: async (req, res, next) => {
    try {
      const storyId = req.params.storyId;
      const writerId = req.currentUserId;
      const { comment } = req.body;
      const obj = await axios.post('http://127.0.0.1:5000/predict', {
        text: comment,
      });
      const mood = obj.data.mood;
      const newComment = await StoryCommentService.createStoryComment({
        storyId,
        writerId,
        comment,
        mood,
      });

      const result = await StoryComment.populate(newComment, {
        path: 'storyId writerId',
      });
      return res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  },
};

export { StoryCommentController };
