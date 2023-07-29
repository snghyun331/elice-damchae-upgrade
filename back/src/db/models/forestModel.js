// // forestModel.js
import ForestPost from '../schemas/forestPost.js';
import UserModel from '../schemas/user.js';

class forestModel {
  static async create({ newForestPost }) {
    const createdForest = await ForestPost.create(newForestPost);
    return createdForest;
  }

  static async findAll({ getAlls }) {
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

  static async findByPost({ _id }) {
    const getForest = await ForestPost.findOne({ _id });
    return getForest;
  }

  static async updatePost({ updatePost }) {
    console.log('model까지', updatePost);
    if (!(updatePost.imageUrl = 'None')) {
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
    if (!(deletePost.imageUrl = 'None')) {
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
}

export { forestModel };
