import { StoryCommentService } from '../services/storyCommentService.js';
import { StoryComment } from '../db/schemas/storyComment.js';
import axios from 'axios';

const StoryCommentController = {
  createStoryComment: async (req, res, next) => {
    try {
      const storyId = req.params.storyId;
      const writerId = req.currentUserId;
      const { comment } = req.body;
      console.log(comment);
      const pureComment = comment.replace(/<[^>]+>/g, ' ');
      const obj = await axios.post('http://127.0.0.1:5000/predict', {
        text: pureComment,
      });
      // obj.data = { mood: '슬픔' }
      const mood = obj.data.mood;
      console.log(mood);
      const newComment = await StoryCommentService.createStoryComment({
        storyId,
        writerId,
        comment,
        mood,
      });
      console.log(newComment);
      //   if (!newComment.errorMessage) {
      //     throw new Error(newComment.errorMessage);
      //   }
      const result = await StoryComment.populate(newComment, {
        path: 'storyId writerId',
      });
      console.log(result);
      return res.status(201).send(result);
    } catch (error) {
      next(error);
    }
  },
};

export { StoryCommentController };
