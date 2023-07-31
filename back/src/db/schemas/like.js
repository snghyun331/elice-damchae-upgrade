import { Schema, model } from 'mongoose';

const likeSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    postId: {
      type: Schema.Types.ObjectId,
      ref: 'ForestPost',
      required: false,
    },
  },
  { timestamps: true, collection: 'likes' },
);

const like = model('Like', likeSchema);

export { like };
