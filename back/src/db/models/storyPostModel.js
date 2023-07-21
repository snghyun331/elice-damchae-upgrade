import { StoryPost } from '../schemas/storyPost.js';

class StoryPostModel {
	static async createStoryPost({ newStoryPost }) {
		const createdNewStoryPost = await StoryPost.create(newStoryPost);
		return createdNewStoryPost;
	}
}

export { StoryPostModel };
