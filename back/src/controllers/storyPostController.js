import { StoryPost } from '../db/schemas/storyPost.js';
import { StoryPostService } from '../services/storyPostService.js';

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
			// const storyPostInfo = await StoryPost.create({
			// 	userInfo: userId,
			// 	title: req.body.title,
			// 	content: req.body.content,
			// 	contentImg: req.body.contentImg,
			// 	storyImg: req.body.storyImg,
			// 	isPublic: req.body.isPublic,
			// 	mood: req.body.mood,
			// 	music: req.body.music,
			// });
			const result = await StoryPost.populate(storyPostInfo, {
				path: 'userInfo',
			});
			return res.status(200).json(result);
		} catch (error) {
			next(error);
		}
	},
};

export { storyPostController };
