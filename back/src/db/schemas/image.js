import { Schema, model } from 'mongoose';

const imageSchema = new Schema(
  {
    fileName: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    // collection: 'images'
  },
);

const Image = model('Image', imageSchema);
export { Image };
