import { StoryPost } from '../schemas/storyPost.js';
import { storyRandomPhrase } from '../schemas/storyRandomPhrase.js';
import { storyRandomMusic } from '../schemas/storyRandomMusic.js';

class StoryPostModel {
  static async createStoryPost({ newStoryPost }) {
    const createdNewStoryPost = await StoryPost.create(newStoryPost);
    return createdNewStoryPost;
  }

  static async getPhraseData() {
    return storyRandomPhrase.find({}).exec();
  }

  static async getMusicData() {
    return storyRandomMusic.find({}).exec();
  }
}

export { StoryPostModel };
