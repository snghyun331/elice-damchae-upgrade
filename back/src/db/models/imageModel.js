import { Image } from '../schemas/image.js';

class ImageModel {
  static async create({ newImage }) {
    const createdImage = await Image.create(newImage);
    return createdImage;
  }

  static async findOneByImageId({ imageId }) {
    const image = await Image.findOne({ _id: imageId });
    return image;
  }
}

export { ImageModel };
