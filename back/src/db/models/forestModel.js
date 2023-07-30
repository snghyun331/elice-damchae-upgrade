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
    console.log('model까지', updatePost);
    if (!(updatePost.imageUrl == 'None')) {
      console.log(1);
      const updateForestPost = await ForestPost.updateOne(
        { userId: updatePost.userId, _id: updatePost._id },
        {
          title: updatePost.title,
          content: updatePost.content,
          imageUrl: updatePost.imageUrl,
        },
      );
      return updateForestPost;
    } else {
      console.log(2);
      const updateForestPost = await ForestPost.updateOne(
        { userId: updatePost.userId, _id: updatePost._id },
        { title: updatePost.title, content: updatePost.content },
      );
      return updateForestPost;
    }
  }

  static async deletePost({ deletePost }) {
    console.log('model까지', deletePost);
    if (!(deletePost.imageUrl == 'None')) {
      console.log(1);
      const deleteForestPost = await ForestPost.deleteOne(
        { userId: deletePost.userId, _id: deletePost._id },
        {
          title: deletePost.title,
          content: deletePost.content,
          imageUrl: deletePost.imageUrl,
        },
      );
      return deleteForestPost;
    } else {
      console.log(2);
      const deleteForestPost = await ForestPost.deleteOne(
        { userId: deletePost.userId, _id: deletePost._id },
        { title: deletePost.title, content: deletePost.content },
      );
      return deleteForestPost;
    }
  }

  static async findAndCountAll(skip, limit) {
    const stories = await ForestPost.find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .exec();

    const count = await ForestPost.countDocuments();
    return { stories, count };
  }

  static async populateForestPost(info, field) {
    const result = ForestPost.populate(info, field);
    return result;
  }
}

export { forestModel };
