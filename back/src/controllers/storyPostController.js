import { StoryPost } from '../db/schemas/storyPost.js';

const storyPostController = {
	createStoryPost: async (req, res, next) => {
		try {
			// const {
			// 	title,
			// 	content,
			// 	contentImgList,
			// 	storyImg,
			// 	isPublic,
			// 	mood,
			// 	music,
			// } = req.body;
			const storyPostInfo = await StoryPost.create({
				userInfo: req.currentUserID,
				title: req.body,
				content: req.body,
				contentImgList: req.body,
				storyImg: req.body,
				isPublic: req.body,
				mood: req.body,
				music: req.body,
			});
			const result = await StoryPost.populate(storyPostInfo, {
				path: 'userInfo',
			});
			return res.status(200).json(result);
		} catch (error) {
			// console.error(error)
			next(error);
		}
	},
};
