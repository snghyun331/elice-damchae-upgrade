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

  updateStoryComment: async (req, res, next) => {
    try {
      const commentId = req.params.commentId;
      const { comment } = req.body;
      const obj = await axios.post('http://127.0.0.1:5000/predict', {
        text: comment,
      });
      const mood = obj.data.mood;
      const toUpdate = { comment, mood };

      const updatedComment = await StoryCommentService.setStoryComment({
        commentId,
        toUpdate,
      });
      const result = await StoryComment.populate(updatedComment, {
        path: 'storyId writerId',
      });
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },

  deleteStoryComment: async (req, res, next) => {
    try {
      const commentId = req.params.commentId;
      const result = await StoryCommentService.deleteStoryComment({
        commentId,
      });
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  },
};

export { StoryCommentController };
