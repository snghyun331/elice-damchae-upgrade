import { StoryPost } from '../db/schemas/storyPost.js';
import { StoryPostService } from '../services/storyPostService.js';
import { StoryPostModel } from '../db/models/storyPostModel.js';
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
			// result.data = { mood: '슬픔' }
			const Mood = result.data.mood;
			const handlePhraseData = async (documents) => {
				let Phrase;
				if (Mood === '슬픔') {
					let data = documents.filter((x) => x.mood === 'sad');
					// console.log(data);
					let Phrases = data.map((item) => item.phrase);
					// console.log(phrases);
					let randomIndex = Math.floor(Math.random() * Phrases.length);
					Phrase = Phrases[randomIndex];
				}
				console.log(Phrase);
				return Phrase;
			};
			StoryPostModel.getPhraseData()
				.then(handlePhraseData)
				.then((Phrase) => {
					res.json({ mood: Mood, phrase: Phrase });
				})
				.catch((error) => {
					console.error('phrase 조회에 실패했습니다', error);
					next(error);
				});
		} catch (error) {
			next(error);
		}
	},
};

export { storyPostController };
