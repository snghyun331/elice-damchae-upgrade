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

  // static async findByForest({ getAlls }) {
  //   // console.log(getAlls);
  //   // console.log(getAlls.$or);
  //   // const getAll = getAlls.$or[0];
  //   // console.log(getAll);
  //   const findAllForest = await ForestPost.find(
  //     getAlls[0],
  //     // title: getAlls.$or[0].title,
  //     // content: getAlls.$or[0].content,
  //   );
  //   return findAllForest;
  // }

  static async findById({ forestId }) {
    const Forest = await ForestPost.findOne({ _id: forestId });
    return Forest;
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

  static async deletePost({ deletePost }) {
    const { _id, userId, title, content, imageUrl } = deletePost;

    const forestDeletePost = await ForestPost.deleteOne(
      { userId, _id },
      { title, content, ...(imageUrl !== 'None' && { imageUrl }) },
    );
    return forestDeletePost;
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

  static async findByMbti(skip, limit, getMbti) {
    console.log('findByMbti - getMbti:', getMbti);
    const forests = await ForestPost.find(getMbti)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .exec();

    const count = await ForestPost.countDocuments(forests);
    return { forests, count };
  }
}

export { forestModel };
