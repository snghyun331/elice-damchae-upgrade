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
      throw new Error('제목, 내용 모두 입력해주세요');
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

  static async setStory({ userInfo, storyId, toUpdate }) {
    let story = await StoryPostModel.findOneById({ storyId });

    if (!story) {
      throw new Error('해당 스토리를 찾을 수 없습니다. 다시 한번 확인해주세요');
    }

    if (toUpdate.title) {
      const fieldToUpdate = 'title';
      const newValue = toUpdate.title;
      story = await StoryPostModel.updateStory({
        storyId,
        fieldToUpdate,
        newValue,
      });
    }

    if (toUpdate.content) {
      const fieldToUpdate = 'content';
      const newValue = toUpdate.content;
      story = await StoryPostModel.updateStory({
        storyId,
        fieldToUpdate,
        newValue,
      });
    }

    if (toUpdate.isPublic) {
      const fieldToUpdate = 'isPublic';
      const newValue = toUpdate.isPublic;
      story = await StoryPostModel.updateStory({
        storyId,
        fieldToUpdate,
        newValue,
      });
    }

    if (toUpdate.thumbnail) {
      const fieldToUpdate = 'thumbnail';
      const newValue = toUpdate.thumbnail;
      story = await StoryPostModel.updateStory({
        storyId,
        fieldToUpdate,
        newValue,
      });
    }

    if (toUpdate.mood) {
      const fieldToUpdate = 'mood';
      const newValue = toUpdate.mood;
      story = await StoryPostModel.updateStory({
        storyId,
        fieldToUpdate,
        newValue,
      });
    }

    if (toUpdate.music) {
      const fieldToUpdate = 'music';
      const newValue = toUpdate.music;
      story = await StoryPostModel.updateStory({
        storyId,
        fieldToUpdate,
        newValue,
      });
    }
    return story;
  }

  static async deleteStory({ storyId }) {
    let isDeleted = await StoryPostModel.deleteOneByStoryId({ storyId });
    if (!isDeleted) {
      const errorMessage = '삭제할 게시글 정보가 없습니다';
      return { errorMessage };
    }
    return { result: 'Success' };
  }
}

export { StoryPostService };
