// // forestModel.js
import ForestPost from '../schemas/forestPost.js';
import UserModel from '../schemas/user.js';
class forestModel {
  static async create({ newForestPost }) {
    const createdForest = await ForestPost.create(newForestPost);
    return createdForest;
  }

  static async findByForest(skip, limit, getAlls) {
    const forests = await ForestPost.find(getAlls)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .exec();
    const count = await ForestPost.countDocuments(forests);
    return { forests, count };
  }

  static async findOneAndDelete({ forestId }) {
    const deletedPost = await ForestPost.deleteOne({ _id: forestId });
    return deletedPost;
  }

  static async readOneById({ forestId }) {
    console.log('forestId모델 in readOneById:', forestId); // forestId 확인용 로그
    const forest = await ForestPost.findOne({ _id: forestId });
    console.log('forestId모델 in readOneById:', forest); // 조회 결과 확인용 로그
    return forest;
  }

  static async updatePost({ updatePost }) {
    const { _id, userId, title, content, imageUrl } = updatePost;

    const updateForestPost = await ForestPost.updateOne(
      { userId, _id },
      {
        title,
        content,
        ...(imageUrl !== 'None' && { imageUrl }),
      },
    );
    return updateForestPost;
  }

  // static async deletePost({ deletePost }) {
  //   const { _id, userId, title, content, imageUrl } = deletePost;

  //   const forestDeletePost = await ForestPost.deleteOne(
  //     { userId, _id },
  //     { title, content, ...(imageUrl !== 'None' && { imageUrl }) },
  //   );
  //   return forestDeletePost;
  // }

  static async findAndCountAll(skip, limit) {
    const forest = await ForestPost.find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .exec();

    const count = await ForestPost.countDocuments();
    return { forest, count };
  }

  static async populateForestPost(info, field) {
    const forest = ForestPost.populate(info, field);
    return forest;
  }

  static async readPostsByAuthors(userIds) {
    try {
      const posts = await ForestPost.find({ author: { $in: userIds } });
      return posts;
    } catch (error) {
      throw new Error(`Error reading posts by authors: ${error.message}`);
    }
  }
  // static async findByForestMbti(mbti) {
  //   try {
  //     // 작성자 MBTI가 'ISTJ'인 사용자들을 찾습니다.
  //     const usersWithMBTI = await UserModel.find({ mbti: mbti });
  //     // 찾은 사용자들의 _id 목록을 추출합니다.
  //     const userIds = usersWithMBTI.map((user) => user._id);
  //     // 작성자가 ISTJ인 블로그 포스트들을 찾습니다.
  //     const posts = await ForestPost.find({ author: { $in: userIds } });
  //     return posts;
  //   } catch (error) {
  //     throw new Error(`Error finding
  // blog posts by author's MBTI: ${error.message}`);
  //   }
  // }

  // static async findByMbti(skip, limit, getMbti) {
  //   console.log('findByMbti - getMbti:', getMbti);

  //   const forests = await ForestPost.find(getMbti)
  //     .sort({ createdAt: -1 })
  //     .skip(skip)
  //     .limit(limit)
  //     .exec();

  //   const count = await ForestPost.countDocuments(forests);
  //   return { forests, count };
  // }
}

export { forestModel };
