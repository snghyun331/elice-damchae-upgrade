import { StoryPost } from '../schemas/storyPost.js';
import { storyRandomPhrase } from '../schemas/storyRandomPhrase.js';

class StoryPostModel {
	static async createStoryPost({ newStoryPost }) {
		const createdNewStoryPost = await StoryPost.create(newStoryPost);
		return createdNewStoryPost;
	}

	static async getPhraseData() {
		return storyRandomPhrase.find({}).exec();
	}
}

export { StoryPostModel };
