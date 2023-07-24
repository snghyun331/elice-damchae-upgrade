import { Image } from '../schemas/image.js';

class ImageModel {
  static async create({ newImage }) {
    const createdImage = await Image.create(newImage);
    return createdImage;
  }
}

export { ImageModel };
