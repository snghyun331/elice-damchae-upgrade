import { myPageService } from '../services/myPageService.js';

class myPageController {
  static async readMyStoryAndForestComments(req, res, next) {
    try {
      const userId = req.currentUserId;
      const page = parseInt(req.query.page || 1);
      const limit = 3;
      const { comments, totalPage, count } =
        await myPageService.readMyAllComments(limit, page, userId);
      const result = {
        currentPage: page,
        totalPage: totalPage,
        totalCommentsCount: count,
        myComments: comments,
      };
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

export { myPageController };
