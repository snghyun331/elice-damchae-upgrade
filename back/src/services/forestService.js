// forestService.js
import { forestModel } from '../db/models/forestModel.js';

class ForestService {
	async findAll() {
		try {
			const posts = await forestModel.findAll();
			return posts;
		} catch (error) {
			console.log(error);
			throw new Error('포스트 조회에 실패했습니다.');
		}
	}

	async findByPost({ userId }) {
		try {
			const post = await forestModel.findByPost(userId);
			return post;
		} catch (error) {
			throw new Error('포스트 조회에 실패했습니다.');
		}
	}

	// async findByMbti() {}
	static async createPost({ title, content, imageUrl, userId }) {
		if (!title || !content) {
			const errorMessage = '제목과 내용은 필수 입력 사항입니다.';
			throw new Error(errorMessage);
		}
		const newForestPost = {
			title,
			content,
			imageUrl,
			userId,
		};
		const createdForestPost = await forestModel.createPost(newForestPost);
		return createdForestPost;
	}

	async updatePost(updatePost) {
		try {
			if (!updatePost.title || !updatePost.content) {
				const errorMessage = '제목과 내용은 필수 입력 사항입니다.';
				throw new Error(errorMessage);
			}

			const postId = updatePost._id;
			console.log(typeof postId);
			const post = await forestModel.findByPost({ _id: new Object(postId) });
			if (!post) {
				throw new Error('존재하지 않는 글입니다.');
			}

			if (post.userId.toString() !== updatePost.userId) {
				throw new Error('해당 글을 수정할 권한이 없습니다.');
			}
			const updateForestPost = await forestModel.updatePost({ updatePost });

			return updateForestPost;
		} catch (error) {
			console.log(error);
			throw new Error('포스트 업데이트에 실패했습니다.');
		}
	}

	async deletePost({ title, content, imageUrl, userId }) {
		try {
			if (!title || !content) {
				const errorMessage = '제목과 내용은 필수 입력 사항입니다.';
				throw new Error(errorMessage);
			}

			const deleteForest = {
				title,
				content,
				imageUrl,
				userId,
			};

			const deleteForestPost = await forestModel.deletePost(deleteForest);
			return deleteForestPost;
		} catch (error) {
			console.log(error);
			throw new Error('포스트 삭제에 실패했습니다.');
		}
	}
}
export default ForestService;
