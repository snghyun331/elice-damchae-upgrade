import { Schema, model } from 'mongoose';
import mongoose from 'mongoose';

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
		timestamps: true,
	},
);

const UserModel = model('User', UserSchema);

export default UserModel;
