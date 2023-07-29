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
    imageUrl: {
      type: String,
      required: false, // 선택적 필드로 변경
    },
    thumbnail: {
      type: Schema.Types.ObjectId,
      ref: 'Image',
      required: false,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    mbti: {
      type: String,
      required: false,
    },
    mood: {
      type: Number,
      default: 0,
    },
    like: {
      type: Number,
      default: 0,
    },
    dislike: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true, collection: 'forestPosts' },
);

const ForestPost = model('ForestPost', ForestPostSchema);

export default ForestPost;
