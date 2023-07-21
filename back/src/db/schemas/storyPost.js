import { Schema, model } from 'mongoose';

const StoryPostSchema = new Schema(
	{
		userInfo: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
		content: {
			type: String,
			required: true,
		},
		contentImg: [
			{
				type: String,
				required: false,
			},
		],
		storyImg: {
			type: String,
		},
		mood: {
			type: String,
			required: true,
		},
		isPublic: {
			type: Boolean,
			required: true,
		},
		music: {
			type: String,
		},
		commentList: [
			{
				type: Schema.Types.ObjectId,
				ref: 'StoryComment',
				required: false,
			},
		],
	},
	{
		timestamps: true,
	},
);

const StoryPost = model('StoryPost', StoryPostSchema);

export { StoryPost };
