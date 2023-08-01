import { storyPostModel } from '../db/models/storyPostModel.js';
import { imageModel } from '../db/models/imageModel.js';
import { storyCommentModel } from '../db/models/storyCommentModel.js';
import fs from 'fs';

class storyPostService {
  static async createStoryPost({
    userInfo,
    title,
    content,
    thumbnail,
    isPublic,
    mood,
    music,
    views,
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
      views,
    };
    const createdNewStoryPost = await storyPostModel.createStoryPost({
      newStoryPost,
    });
    return createdNewStoryPost;
  }

  // static async updateStory({ storyId, toUpdate }) {
  //   let story = await storyPostModel.findOneByStoryId({ storyId });

  //   if (!story) {
  //     throw new Error('해당 스토리를 찾을 수 없습니다. 다시 한번 확인해주세요');
  //   }

  //   if (toUpdate.title) {
  //     const fieldToUpdate = 'title';
  //     const newValue = toUpdate.title;
  //     story = await storyPostModel.updateStory({
  //       storyId,
  //       fieldToUpdate,
  //       newValue,
  //     });
  //   }

  //   if (toUpdate.content) {
  //     const fieldToUpdate = 'content';
  //     const newValue = toUpdate.content;
  //     story = await storyPostModel.updateStory({
  //       storyId,
  //       fieldToUpdate,
  //       newValue,
  //     });
  //   }

  //   if (toUpdate.isPublic) {
  //     const fieldToUpdate = 'isPublic';
  //     const newValue = toUpdate.isPublic;
  //     story = await storyPostModel.updateStory({
  //       storyId,
  //       fieldToUpdate,
  //       newValue,
  //     });
  //   }

  //   if (toUpdate.thumbnail) {
  //     // create Image
  //     const fieldToUpdate = 'thumbnail';
  //     const newValue = toUpdate.thumbnail;
  //     story = await storyPostModel.updateStory({
  //       storyId,
  //       fieldToUpdate,
  //       newValue,
  //     });
  //   }

  //   if (toUpdate.mood) {
  //     const fieldToUpdate = 'mood';
  //     const newValue = toUpdate.mood;
  //     story = await storyPostModel.updateStory({
  //       storyId,
  //       fieldToUpdate,
  //       newValue,
  //     });
  //   }

  //   if (toUpdate.music) {
  //     const fieldToUpdate = 'music';
  //     const newValue = toUpdate.music;
  //     story = await storyPostModel.updateStory({
  //       storyId,
  //       fieldToUpdate,
  //       newValue,
  //     });
  //   }
  //   return story;
  // }

  static async deleteStory({ storyId }) {
    let isDeleted = await storyPostModel.deleteOneByStoryId({ storyId });
    if (!isDeleted) {
      throw new Error('삭제할 게시글 정보가 없습니다.');
    }
    return { result: 'Success' };
  }

  static async readStoryDetail({ storyId }) {
    const story = await storyPostModel.findAndIncreaseView({ storyId });
    const allComments = await storyCommentModel.findAllByStoryId({ storyId });

    if (!story) {
      throw new Error('해당 스토리가 존재하지 않습니다.');
    }

    const storyInfo = {
      ...story._doc, // document를 자바스크립트 객체로 변환하기 위해 사용되는 속성
      // commentCount: allComments.length,
      commentList: allComments,
    };
    return storyInfo;
  }

  static async readPosts(limit, page) {
    const skip = (page - 1) * limit; // 해당 페이지에서 스킵할 스토리 수

    const { stories, count } = await storyPostModel.findAndCountAll(
      skip,
      limit,
    );
    const totalPage = Math.ceil(count / limit);
    return { stories, totalPage, count }; // 해당 페이지에 해당하는 스토리들, 총 페이지 수, 스토리 총 수
  }

  static async readSeachQueryPosts(limit, page, searchQuery) {
    const skip = (page - 1) * limit; // 해당 페이지에서 스킵할 스토리 수

    const { stories, count } = await storyPostModel.findSearchQueryAndCountAll(
      skip,
      limit,
      searchQuery,
    );
    const totalPage = Math.ceil(count / limit);
    return { stories, totalPage, count }; // 해당 페이지에 해당하는 스토리들, 총 페이지 수, 스토리 총 수
  }

  static async populateStoryPost(info, path) {
    const field = { path: path };
    const result = storyPostModel.populateStoryPost(info, field);
    return result;
  }

  static async isSameUser(loginUserId, storyId) {
    const stories = await storyPostModel.findOneByStoryId({ storyId });
    const storyUserId = stories.userInfo;
    if (loginUserId == storyUserId) {
      return true;
    } else {
      return false;
    }
  }

  static async deleteUploadImage({ storyId }) {
    const story = await storyPostModel.findOneByStoryId({ storyId });
    const uploadImage = await imageModel.findOneByImageId({
      imageId: story.thumbnail,
    });
    const uploadImagePath = uploadImage.path;
    if (fs.existsSync(uploadImagePath)) {
      fs.unlinkSync(uploadImagePath);
    } else {
      console.log('File does not exist, so not deleting.');
    }
  }
}

export { storyPostService };
