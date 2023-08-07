// // forestModel.js
import ForestPost from '../schemas/forestPost.js';

class forestModel {
  static async create({ newForestPost }) {
    const createdForest = await ForestPost.create(newForestPost);
    return createdForest;
  }

  static async findOneAndUpdate({ forestId, title, content }) {
    const updatedPost = await ForestPost.updateOne(
      { _id: forestId }, // 업데이트할 문서의 조건
      { title, content }, // 업데이트할 필드 및 값);
    );
    return updatedPost;
  }

  static async findOneAndDelete({ forestId }) {
    const deletedPost = await ForestPost.deleteOne({ _id: forestId });
    return deletedPost;
  }

  static async findByForest(skip, limit, getAlls) {
    const forestUpdate = { ...getAlls };
    const forests = await ForestPost.find(forestUpdate)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .exec();
    const count = await ForestPost.countDocuments(forestUpdate);
    return { forests, count };
  }

  static async readOneById({ forestId }) {
    const forest = await ForestPost.findOne({ _id: forestId });
    return forest;
  }

  // 조회수 1증가
  static async findAndIncreaseView({ forestId }) {
    await ForestPost.updateOne({ _id: forestId }, { $inc: { views: 1 } });
    const forest = await ForestPost.findOne({ _id: forestId }).lean();
    return forest;
  }

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

  static async findAndIncreaseCommentCount({ forestId }) {
    await ForestPost.updateOne(
      { _id: forestId },
      { $inc: { commentCount: 1 } },
    );
  }

  static async findAndDecreaseCommentCount({ forestId }) {
    await ForestPost.updateOne(
      { _id: forestId, commentCount: { $gt: 0 } },
      { $inc: { commentCount: -1 } },
    );
  }

  static async findByForestMbti({ mbtiList, skip, limit }) {
    try {
      console.log('모델 mbtilist :', mbtiList);
      // // 작성자 MBTI가 'ISTJ'인 사용자들을 찾습니다.
      // const usersWithMBTI = await UserModel.find({ mbti: mbti });
      // // 찾은 사용자들의 _id 목록을 추출합니다.
      // const userIds = usersWithMBTI.map((user) => user._id);
      // // 작성자가 ISTJ인 블로그 포스트들을 찾습니다.
      // const posts = await ForestPost.find({ author: { $in: userIds } });

      const posts = await ForestPost.aggregate([
        {
          $lookup: {
            from: 'users',
            localField: 'userInfo',
            foreignField: '_id',
            as: 'user',
          },
        },
        {
          $unwind: '$user',
        },
        {
          $match: {
            'user.mbti': {
              $in: mbtiList,
            },
          },
        },
        {
          $skip: skip,
        },
        {
          $limit: limit,
        },
      ]);

      console.log('Posts다다닫 :', posts);

      return posts;
    } catch (error) {
      throw new Error(
        `Error finding blog posts by author's MBTI: ${error.message}`,
      );
    }
  }
}

export { forestModel };
