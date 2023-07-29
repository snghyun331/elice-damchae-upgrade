// forestPost.js
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const ForestPostSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    image: {
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
    // mbti: {
    // 	type: String,
    // 	required: true,
    // },
    views: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

const ForestPost = model('ForestPost', ForestPostSchema);

export default ForestPost;
