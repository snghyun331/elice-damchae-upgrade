import { Schema, model } from 'mongoose';

const hateSchema = new Schema(
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
  { timestamps: true, collection: 'hates' },
);

const hate = model('Hate', hateSchema);

export { hate };
