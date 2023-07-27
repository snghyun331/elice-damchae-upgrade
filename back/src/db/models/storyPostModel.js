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

  static async findOneByStoryId({ storyId }) {
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

  static async findAndCountAll(skip, limit) {
    const stories = await StoryPost.find({}) // 모두 가져오기
      .sort({ createdAt: -1 }) // 생성일 필드를 기준으로 내림차순 정렬
      .skip(skip) // 처음 몇 개의 스토리를 건너뛸지(1페이지에 10개 스토리 보여준다고 가정할 때 사용자가 2페이지를 요청하면 1페이지에서 10개 스토리를 건너뛰어야함)
      .limit(limit) // 한 페이지에 몇 개의 스토리를 보여줄지
      .exec(); // 해당 쿼리 실행하고 프로미스 반환

    const count = await StoryPost.countDocuments(); // 전체 스토리 수
    return { stories, count };
  }
}

export { StoryPostModel };
