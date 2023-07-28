// forestService.js
import { forestModel } from '../db/models/forestModel.js';

class ForestService {
  static async createPost({ title, content, imageUrl, userId }) {
    if (!title || !content) {
      const errorMessage = '제목과 내용은 필수 입력 사항입니다.';
      throw new Error(errorMessage);
    }

    const newForestPost = {
      title,
      content,
      imageUrl,
      userId,
    };

    const createdForestPost = await forestModel.create({ newForestPost });
    return createdForestPost;
  }

  async findAll({ getAlls }) {
    try {
      console.log(getAlls, getAlls.title);
      const posts = await forestModel.findAll({ getAlls });
      console.log(posts);
      return posts;
    } catch (error) {
      console.log(error);
      throw new Error('포스트 조회에 실패했습니다.');
    }
  }

  async findByPost({ _id }) {
    try {
      const post = await forestModel.findByPost({ _id });
      return post;
    } catch (error) {
      // console.log(_id);
      throw new Error('포스트 조회에 실패했습니다.');
    }
  }

  async updatePost(updatePost) {
    try {
      if (!updatePost.title || !updatePost.content) {
        const errorMessage = '제목과 내용은 필수 입력 사항입니다.';
        throw new Error(errorMessage);
      }

      const postId = updatePost._id;
      console.log(typeof postId);
      const post = await forestModel.findByPost({ _id: new Object(postId) });
      if (!post) {
        throw new Error('존재하지 않는 글입니다.');
      }

      if (post.userId.toString() !== updatePost.userId) {
        throw new Error('해당 글을 수정할 권한이 없습니다.');
      }
      const updateForestPost = await forestModel.updatePost({ updatePost });

      return updateForestPost;
    } catch (error) {
      console.log(error);
      throw new Error('포스트 업데이트에 실패했습니다.');
    }
  }

  async deletePost(deletePost) {
    try {
      const postId = deletePost._id;
      console.log(typeof postId);
      const post = await forestModel.findByPost({ _id: new Object(postId) });
      if (!post) {
        throw new Error('존재하지 않은 글입니다.');
      }

      if (post.userId.toString() !== deletePost.userId) {
        throw new Error('해당 글을 수정할 권한이 없습니다.');
      }

      const deleteForestPost = await forestModel.deletePost({ deletePost });

      return deleteForestPost;
    } catch (error) {
      console.log(error);
      throw new Error('포스트 삭제에 실패했습니다.');
    }
  }
}

export default ForestService;
