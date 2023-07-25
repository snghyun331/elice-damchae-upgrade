// // forestModel.js
import ForestPost from '../schemas/forestPost.js';
import UserModel from '../schemas/user.js';

class forestModel {
	static async findAll() {
		const Forest = await ForestPost.find();
		return Forest;
	}
	static async findByPost({ _id }) {
		const getForest = await ForestPost.findOne({ _id });
		return getForest;
	}

	// async findByMbti({ mbti }) {
	// 	const getForestMbti = await ForestPost.findOne(mbti);
	// 	return getForestMbti;
	// }

	static async createPost({ title, content, imageUrl, userId }) {
		const newForest = {
			title,
			content,
			imageUrl,
			userId,
		};
		const createdNewForestPost = await ForestPost.create(newForest);
		return createdNewForestPost;
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
	static async deletePost({ title, content, imageUrl, userId }) {
		const deleteForest = {
			title,
			content,
			imageUrl,
			userId,
		};
		const deleteForestPost = await ForestPost.deleteOne(deleteForest);
		return deleteForestPost;
	}
}

export { forestModel };
