import { StoryPost } from '../db/schemas/storyPost.js';
import { StoryPostService } from '../services/storyPostService.js';
import axios from 'axios';

const storyPostController = {
	createStoryPost: async (req, res, next) => {
		try {
			const { title, content, contentImg, storyImg, isPublic, mood, music } =
				req.body;
			const userId = req.currentUserId;
			const userInfo = userId;
			const storyPostInfo = await StoryPostService.addStoryPost({
				userInfo,
				title,
				content,
				contentImg,
				storyImg,
				isPublic,
				mood,
				music,
			});
			const result = await StoryPost.populate(storyPostInfo, {
				path: 'userInfo',
			});
			return res.status(200).json(result);
		} catch (error) {
			next(error);
		}
	},

	getPredict: async (req, res, next) => {
		try {
			const { content } = req.body;
			const result = await axios.post('http://127.0.0.1:5000/predict', {
				text: content,
			});
			console.log({ result: result.data });
			res.json({ mood: result.data.mood });
		} catch (error) {
			next(error);
		}
	},
};

export { storyPostController };
