import { Schema, model } from 'mongoose';

// 1. UTC를 한국 시간대로 변환하는 함수
const getKoreanTimestamp = () => {
	// 한국 시간대는 UTC+9
	const koreanTimezoneOffset = 9 * 60;
	const now = new Date();
	now.setMinutes(now.getMinutes() + koreanTimezoneOffset);
	return now;
};

const UserSchema = new Schema(
	{
		email: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		mbti: {
			type: String,
			required: true,
		},
		nickname: {
			type: String,
			required: true,
			unique: true,
		},
		isOut: {
			type: Boolean,
			required: true,
			default: false,
		},
	},
	{
		timestamps: {
			createdAt: 'createdAt', // 필드 이름을 createdAt으로 지정
			updatedAt: 'updatedAt', // 필드 이름을 updatedAt으로 지정
			currentTime: () => getKoreanTimestamp(), // 생성 시간과 업데이트 시간을 한국 시간대의 timestamp로 설정
		},
	},
);

const UserModel = model('User', UserSchema);

export default UserModel;
