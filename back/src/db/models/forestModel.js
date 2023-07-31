// // forestModel.js
import ForestPost from '../schemas/forestPost.js';

class forestModel {
  static async create({ newForestPost }) {
    const createdForest = await ForestPost.create(newForestPost);
    return createdForest;
  }

  static async findByForest({ getAlls }) {
    // console.log(getAlls);
    // console.log(getAlls.$or);
    // const getAll = getAlls.$or[0];
    // console.log(getAll);
    const findAllForest = await ForestPost.find(
      getAlls[0],
      // title: getAlls.$or[0].title,
      // content: getAlls.$or[0].content,
    );
    return findAllForest;
  }

  static async findById({ _id }) {
    const Forest = await ForestPost.findOne({ _id });
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
  //   } else {
  //     const updateForestPost = await ForestPost.updateOne(
  //       { userId: updatePost.userId, _id: updatePost._id },
  //       { title: updatePost.title, content: updatePost.content },
  //     );
  //     return updateForestPost;
  //   }
  // }

  static async deletePost({ deletePost }) {
    const { _id, userId, title, content, imageUrl } = deletePost;

    const forestDeletePost = await ForestPost.deleteOne(
      { userId, _id },
      { title, content, ...(imageUrl !== 'None' && { imageUrl }) },
    );
    return forestDeletePost;
    // } else {
    //   const deleteForestPost = await ForestPost.deleteOne(
    //     { userId: deletePost.userId, _id: deletePost._id },
    //     { title: deletePost.title, content: deletePost.content },
    //   );
    //   return deleteForestPost;
    // }
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
}

export { forestModel };
