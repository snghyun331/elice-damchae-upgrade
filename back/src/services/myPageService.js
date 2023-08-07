import { myPageModel } from '../db/models/myPageModel.js';

class myPageService {
  static async readMyAllComments(limit, page, userId) {
    const skip = (page - 1) * limit;
    const { comments, count } = await myPageModel.findMyAllCommentAndCount(
      userId,
      skip,
      limit,
    );
    const totalPage = Math.ceil(count / limit);
    return { comments, totalPage, count };
  }
}

export { myPageService };
