import { storyComment } from '../schemas/storyComment.js';
import { forestComment } from '../schemas/forestComment.js';

class myPageModel {
  static async findMyAllCommentAndCount(userId, skip, limit) {
    const allStoryComments = await storyComment.find({ writerId: userId });
    const allForestComments = await forestComment.find({ writerId: userId });
    const mergedComments = [...allStoryComments, ...allForestComments];
    // 모든 댓글을 createdAt을 기준으로 최신순으로 정렬
    mergedComments.sort((a, b) => b.createdAt - a.createdAt);
    // 페이지네이션을 적용하여 원하는 범위의 댓글을 가져옵니다.
    const paginatedComments = mergedComments.slice(skip, skip + limit);
    const count = mergedComments.length;
    return { comments: paginatedComments, count };
  }
}

export { myPageModel };
