import { storyPost } from '../schemas/storyPost.js';
import { storyRandomPhrase } from '../schemas/storyRandomPhrase.js';
import { storyRandomMusic } from '../schemas/storyRandomMusic.js';

class storyPostModel {
  static async createStoryPost({ newStoryPost }) {
    const createdNewStoryPost = await storyPost.create(newStoryPost);
    return createdNewStoryPost;
  }

  static async getPhraseData() {
    return storyRandomPhrase.find({}).exec();
  }

  static async getMusicData() {
    return storyRandomMusic.find({}).exec();
  }

  static async findOneByStoryId({ storyId }) {
    const story = await storyPost.findOne({ _id: storyId });
    return story;
  }

  // 조회수 1증가
  static async findAndIncreaseView({ storyId }) {
    await storyPost.updateOne({ _id: storyId }, { $inc: { views: 1 } });
    const story = await storyPost.findOne({ _id: storyId });
    return story;
  }

  static async findAndIncreaseCommentCount({ storyId }) {
    await storyPost.updateOne({ _id: storyId }, { $inc: { commentCount: 1 } });
  }

  static async findAndDecreaseCommentCount({ storyId }) {
    await storyPost.updateOne(
      { _id: storyId, commentCount: { $gt: 0 } },
      { $inc: { commentCount: -1 } },
    );
  }

  // static async updateStory({ storyId, fieldToUpdate, newValue }) {
  //   const filter = { _id: storyId };
  //   const update = { [fieldToUpdate]: newValue };
  //   const option = { returnOriginal: false };
  //   const updatedStory = await storyPost.findOneAndUpdate(
  //     filter,
  //     update,
  //     option,
  //   );
  //   return updatedStory;
  // }

  static async deleteOneByStoryId({ storyId }) {
    const deletedStory = await storyPost.deleteOne({ _id: storyId });
    const isCompleteDeleted = deletedStory.deletedCount === 1;
    return isCompleteDeleted;
  }

  static async findAndCountAll(skip, limit) {
    const stories = await storyPost
      .find({ isPublic: true }) // 공개 글만 모두 가져오기
      .sort({ createdAt: -1 }) // 생성일 필드를 기준으로 내림차순 정렬
      .skip(skip) // 처음 몇 개의 스토리를 건너뛸지(1페이지에 10개 스토리 보여준다고 가정할 때 사용자가 2페이지를 요청하면 1페이지에서 10개 스토리를 건너뛰어야함)
      .limit(limit) // 한 페이지에 몇 개의 스토리를 보여줄지
      .exec(); // 해당 쿼리 실행하고 프로미스 반환

    const count = await storyPost.countDocuments({ isPublic: true }); // 전체 공개 스토리 수
    return { stories, count };
  }

  static async findSearchQueryAndCountAll(skip, limit, searchQuery) {
    const updatedSearchQuery = { ...searchQuery, isPublic: true };
    const stories = await storyPost
      .find(updatedSearchQuery)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .exec();
    const count = await storyPost.countDocuments(updatedSearchQuery);
    return { stories, count };
  }

  static async findMyAndCountAll(skip, limit, userId) {
    const stories = await storyPost
      .find({ userInfo: userId }) // 공개 글만 모두 가져오기
      .sort({ createdAt: -1 }) // 생성일 필드를 기준으로 내림차순 정렬
      .skip(skip) // 처음 몇 개의 스토리를 건너뛸지(1페이지에 10개 스토리 보여준다고 가정할 때 사용자가 2페이지를 요청하면 1페이지에서 10개 스토리를 건너뛰어야함)
      .limit(limit) // 한 페이지에 몇 개의 스토리를 보여줄지
      .exec(); // 해당 쿼리 실행하고 프로미스 반환

    const count = await storyPost.countDocuments({ userInfo: userId }); // 전체 공개 스토리 수
    return { stories, count };
  }

  static async populateStoryPost(info, field) {
    const result = storyPost.populate(info, field);
    return result;
  }
}

export { storyPostModel };
