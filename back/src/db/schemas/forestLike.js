import { Schema, model } from 'mongoose';

const forestLikeSchema = new Schema(
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
  { timestamps: true, collection: 'forestLikes' },
);

const forestLike = model('ForestLike', forestLikeSchema);

export { forestLike };
