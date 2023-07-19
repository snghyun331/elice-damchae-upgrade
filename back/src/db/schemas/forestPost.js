import mongoose from 'mongoose';

const { Schema } = mongoose;

const ForestPostSchema = new Schema(
	{
		postId: {
			type: Schema.Types.ObjectId,
			ref: 'Post',
			required: false,
		},
		imageUrl: {
			type: String,
			required: false, // 선택적 필드로 변경
		},
		title: {
			type: String,
			required: true,
		},
		content: {
			type: String,
			required: true,
		},
		postCount: {
			type: Number,
			required: false, // 선택적 필드로 변경
		},
		userCount: {
			type: Number,
			required: false, // 선택적 필드로 변경
		},
		createAt: {
			type: Date,
			default: Date.now,
		},
		deleteAt: {
			type: Date,
			default: null,
		},
	},
	{ timestamps: true },
);

const ForestPost = mongoose.model('ForestPost', ForestPostSchema);

export default ForestPost;
