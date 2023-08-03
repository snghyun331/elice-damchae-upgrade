// // forestService.js

// import { forestCommentModel } from '../db/models/forestCommentModel.js';
import { forestModel } from '../db/models/forestModel.js';
import User from '../db/models/userModel.js';
import UserModel from '../db/schemas/user.js';
class ForestService {
  static async createPost({ userInfo, title, content, mood }) {
    if (!title || !content) {
      const errorMessage = '제목과 내용은 필수 입력 사항입니다.';
      throw new Error(errorMessage);
    }

    const newForestPost = {
      userInfo,
      title,
      content,
      mood,
    };

    const createdForestPost = await forestModel.create({ newForestPost });
    return createdForestPost;
  }

  static async findByForest(limit, page, getAlls) {
    const skip = (page - 1) * limit;
    // console.log(getAlls, getAlls.content);

    const { forests, count } = await forestModel.findByForest(
      skip,
      limit,
      getAlls,
    );
    const totalPage = Math.ceil(count / limit);

    return { forests, totalPage, count };
  }

  static async updatePost(updatePost) {
    try {
      if (!updatePost.title || !updatePost.content) {
        const errorMessage = '제목과 내용은 필수 입력 사항입니다.';
        throw new Error(errorMessage);
      }

      const forestId = updatePost._id;
      console.log(typeof forestId);
      const post = await forestModel.findAndCountAll({
        _id: new Object(forestId),
      });
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

  static async deletePost({ forestId }) {
    const deletedPost = await forestModel.findOneAndDelete({ forestId });
    if (!deletedPost) {
      throw new Error('삭제할 게시글 정보가 없습니다.');
    }
    return deletedPost;
  }

  static async readOneById({ forestId }) {
    try {
      const forest = await forestModel.readOneById({ forestId });

      if (!forest) {
        throw new Error('존재하지 않는 글입니다.');
      }
      return forest;
    } catch (error) {
      throw new Error('글 조회에 실패했습니다.');
    }
  }

  static async readForestDetail({ forestId }) {
    const forest = await forestModel.readOneById({ forestId });
    // const comment = await forestCommentModel.findAllByForestId({ forestId });
    if (!forest) {
      throw new Error('해당 게시물이 존재하지 않습니다.');
    }
    const forestInfo = {
      ...forest._doc,
      // commentList: comment,
    };
    return forestInfo;
  }

  static async readPosts(limit, page) {
    const skip = (page - 1) * limit; // 해당 페이지에서 스킵할 스토리 수

    const { forest, count } = await forestModel.findAndCountAll(skip, limit);
    const totalPage = Math.ceil(count / limit);
    return { forest, totalPage, count }; // 해당 페이지에 해당하는 스토리들, 총 페이지 수, 스토리 총 수
  }

  static async populateForestPost(info, path) {
    const field = { path: path };
    const forest = forestModel.populateForestPost(info, field);
    return forest;
  }
  static async findById(forestId) {
    try {
      return await forestModel.readOneById(forestId);
    } catch (error) {
      throw new Error('An error occurred while fetching the forest.');
    }
  }

  static async findByForestMbti(mbti) {
    try {
      // 작성자 MBTI가 'ISTJ'인 사용자들을 찾습니다.
      const usersWithMBTI = await UserModel.find({ mbti: mbti });
      // 찾은 사용자들의 _id 목록을 추출합니다.
      const userIds = usersWithMBTI.map((user) => user._id);
      // 작성자가 ISTJ인 블로그 포스트들을 찾습니다.
      const posts = await forestModel.readPostsByAuthors({
        author: { $in: userIds },
      });
      return posts;
    } catch (error) {
      throw new Error(`Error finding
  blog posts by author's MBTI: ${error.message}`);
    }
  }
}
//   static async findByUserMbti(limit, page, getMbti) {
//     const skip = (page - 1) * limit;
//     // console.log(getAlls, getAlls.content);

//     const { forests, count } = await forestModel.findByMbti(
//       skip,
//       limit,
//       getMbti,
//     );
//     // console.log('findByUserMbti 함수에서 조회한 결과:');
//     // console.log('findByUserMbti - getMbti:', getMbti);

//     // console.log('forests:', forests);
//     // console.log('count:', count);
//     const totalPage = Math.ceil(count / limit);

//     return { forests, totalPage, count };
//   }
// }
export default ForestService;
