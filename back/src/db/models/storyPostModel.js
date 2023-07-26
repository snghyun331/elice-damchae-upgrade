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

  static async findOneById({ storyId }) {
    const story = await StoryPost.findOne({ _id: storyId });
    return story;
  }

  static async updateStory({ storyId, fieldToUpdate, newValue }) {
    const filter = { _id: storyId };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };
    const updatedStory = await StoryPost.findOneAndUpdate(
      filter,
      update,
      option,
    );
    return updatedStory;
  }

  static async deleteOneByStoryId({ storyId }) {
    const deletedStory = await StoryPost.deleteOne({ _id: storyId });
    const isCompleteDeleted = deletedStory.deletedCount === 1;
    return isCompleteDeleted;
  }
}

export { StoryPostModel };
