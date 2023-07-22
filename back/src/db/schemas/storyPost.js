import { Schema, model } from 'mongoose';

// 1. UTC를 한국 시간대로 변환하는 함수
const getKoreanTimestamp = () => {
	// 한국 시간대는 UTC+9
	const koreanTimezoneOffset = 9 * 60;
	const now = new Date();
	now.setMinutes(now.getMinutes() + koreanTimezoneOffset);
	return now;
};

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
		timestamps: {
			createdAt: 'createdAt', // 필드 이름을 createdAt으로 지정
			updatedAt: 'updatedAt', // 필드 이름을 updatedAt으로 지정
			currentTime: () => getKoreanTimestamp(), // 생성 시간과 업데이트 시간을 한국 시간대의 timestamp로 설정
		},
	},
);

const StoryPost = model('StoryPost', StoryPostSchema);

export { StoryPost };
