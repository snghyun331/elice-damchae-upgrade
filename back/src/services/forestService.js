import ForestPost from '../db/schemas/forestPost.js';

// 글 관련 서비스
const forestService = {
	getAllPosts: async () => {
		try {
			const posts = await ForestPost.find().populate('postId', 'imageUrl');
			return posts;
		} catch (error) {
			console.error(error);
			throw new Error('글 조회에 실패했습니다.');
		}
	},

	getPostById: async (postId) => {
		try {
			const post = await ForestPost.findById(postId).populate(
				'postId',
				'imageUrl',
			);
			if (!post) {
				throw new Error('존재하지 않는 글입니다.');
			}
			return post;
		} catch (error) {
			console.error(error);
			throw new Error('글 조회에 실패했습니다.');
		}
	},

	createPost: async (title, content) => {
		try {
			if (!title || !content) {
				throw new Error('Title, content는 필수 입력 사항입니다.');
			}
			const post = new ForestPost({ title, content });
			await post.save();
			return { message: '글을 등록했습니다.' };
		} catch (error) {
			console.error(error);
			throw new Error('글 등록에 실패했습니다.');
		}
	},

	updatePost: async (postId, title, content) => {
		try {
			if (!title || !content) {
				throw new Error('Title, content는 필수 입력 사항입니다.');
			}
			const post = await ForestPost.findById(postId);
			if (!post) {
				throw new Error('존재하지 않는 글입니다.');
			}
			post.title = title;
			post.content = content;
			await post.save();
			return { message: '글을 수정했습니다.' };
		} catch (error) {
			console.error(error);
			throw new Error('글 수정에 실패했습니다.');
		}
	},

	deletePost: async (postId) => {
		try {
			const post = await ForestPost.findById(postId);
			if (!post) {
				throw new Error('존재하지 않는 글입니다.');
			}
			await post.deleteOne();
			return { message: '글을 삭제했습니다.' };
		} catch (error) {
			console.error(error);
			throw new Error('글 삭제에 실패했습니다.');
		}
	},
};

export { forestService };

// import ForestPost from '../db/schemas/forestPost.js';

// // 글 관련 서비스
// const forestService = {
// 	getAllPosts: async () => {
// 		try {
// 			const posts = await ForestPost.find().populate('postId', 'imageUrl');
// 			return posts;
// 		} catch (error) {
// 			console.error(error);
// 			throw new Error('글 조회에 실패했습니다.');
// 		}
// 	},

// 	getPostById: async (postId) => {
// 		try {
// 			const post = await ForestPost.findById(postId).populate(
// 				'postId',
// 				'imageUrl',
// 			);
// 			if (!post) {
// 				throw new Error('존재하지 않는 글입니다.');
// 			}
// 			return post;
// 		} catch (error) {
// 			console.error(error);
// 			throw new Error('글 조회에 실패했습니다.');
// 		}
// 	},

// 	createPost: async (title, content) => {
// 		try {
// 			if (!title || !content) {
// 				throw new Error('Title, content는 필수 입력 사항입니다.');
// 			}
// 			const post = new ForestPost({ title, content });
// 			await post.save();
// 			return { message: '글을 등록했습니다.' };
// 		} catch (error) {
// 			console.error(error);
// 			throw new Error('글 등록에 실패했습니다.');
// 		}
// 	},

// 	updatePost: async (postId, title, content) => {
// 		try {
// 			if (!title || !content) {
// 				throw new Error('Title, content는 필수 입력 사항입니다.');
// 			}
// 			const post = await ForestPost.findById(postId);
// 			if (!post) {
// 				throw new Error('존재하지 않는 글입니다.');
// 			}
// 			post.title = title;
// 			post.content = content;
// 			await post.save();
// 			return { message: '글을 수정했습니다.' };
// 		} catch (error) {
// 			console.error(error);
// 			throw new Error('글 수정에 실패했습니다.');
// 		}
// 	},

// 	deletePost: async (postId) => {
// 		try {
// 			const post = await ForestPost.findById(postId);
// 			if (!post) {
// 				throw new Error('존재하지 않는 글입니다.');
// 			}
// 			await post.deleteOne();
// 			return { message: '글을 삭제했습니다.' };
// 		} catch (error) {
// 			console.error(error);
// 			throw new Error('글 삭제에 실패했습니다.');
// 		}
// 	},
// };

// export { forestService };
