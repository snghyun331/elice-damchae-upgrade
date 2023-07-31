import { Schema, model } from 'mongoose';

const forestDislikeSchema = new Schema(
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
  { timestamps: true, collection: 'forestDislikes' },
);

const forestDislike = model('ForestDislike', forestDislikeSchema);

export { forestDislike };
