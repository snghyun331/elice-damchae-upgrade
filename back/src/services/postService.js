import PostBoard from '../db/models/post.js';

class PostService {
	async createPost(data) {
		try {
			const { title, content } = data;
			if (!title || !content) {
				throw new Error(
					'제목, 내용, 알림 토큰, 작성자는 필수 입력 사항입니다.',
				);
			}

			const post = new PostBoard(data);
			const doc = await post.save();
			return { success: true, doc };
		} catch (error) {
			// throw new Error('글 생성에 실패했습니다.');
			// 오류에 대한 추가 정보를 포함한 커스텀 오류 객체 생성
			console.log(error);
		}
	}

	async removePost(postId, writer) {
		try {
			const doc = await PostBoard.findOneAndDelete({ postId, writer });
			return { success: true, doc };
		} catch (error) {
			throw error;
		}
	}

	async updatePost(postId, data) {
		try {
			const doc = await PostBoard.updateOne({ postId }, { $set: data });
			return { success: true, doc };
		} catch (error) {
			throw error;
		}
	}

	async getPostDetail(postId) {
		try {
			const post = await PostBoard.find({ postId });
			return { success: true, post };
		} catch (error) {
			throw error;
		}
	}

	async getAllPosts() {
		try {
			const posts = await PostBoard.find({}).sort({ createdAt: -1 });
			return { success: true, posts };
		} catch (error) {
			throw error;
		}
	}
}

export default PostService;
