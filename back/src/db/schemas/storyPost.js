import { Schema, model } from 'mongoose';

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
    thumbnail: {
      type: Schema.Types.ObjectId,
      ref: 'Image',
      required: false,
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
      required: false,
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
    timestamps: true,
  },
);

const StoryPost = model('StoryPost', StoryPostSchema);

export { StoryPost };
