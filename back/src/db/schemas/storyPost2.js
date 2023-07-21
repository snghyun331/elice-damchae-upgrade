import { Schema, model } from 'mongoose';

const StoryPostSchema = new Schema(
	{
		userId: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		userName: {
			type: String,
			required: true,
		},
		userMbti: {
			type: String,
			required: true,
		},
		userProfileImg: {
			type: String,
		},
		title: {
			type: String,
			required: true,
		},
		content: {
			type: String,
			required: true,
		},
		contentImgList: {
			type: Array,
		},
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
	},
	{
		timestamps: true,
	},
);

const StoryPostModel = model('StoryPost', StoryPostSchema);

export { StoryPostModel };
