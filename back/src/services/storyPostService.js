import { StoryPostModel } from '../db/models/storyPostModel.js';

class StoryPostService {
  static async addStoryPost({
    userInfo,
    title,
    content,
    thumbnail,
    isPublic,
    mood,
    music,
  }) {
    if (!title || !content) {
      const errorMessage = '제목, 내용 모두 입력해주세요';
      return { errorMessage };
    }
    const newStoryPost = {
      userInfo,
      title,
      content,
      thumbnail,
      isPublic,
      mood,
      music,
    };
    const createdNewStoryPost = await StoryPostModel.createStoryPost({
      newStoryPost,
    });
    return createdNewStoryPost;
  }

  static async getRandomPhrase() {}
}

export { StoryPostService };
