import path from 'path';
import fs from 'fs';
import { UPLOAD_PATH } from '../utills/path.js';
import { imageModel } from '../db/models/imageModel.js';

class imageService {
  static async generateUniqueFileName(file) {
    const uniqueSuffix = `${Date.now()}`;
    const extension = file.originalname.split('.').pop(); // 확장자 추출
    const fileName = `formData-${uniqueSuffix}.${extension}`;
    return fileName;
  }

  static async uploadImage({ file }) {
    if (!file) {
      throw new Error('No image file uploaded.');
    }
    const fileName = file.filename;
    const filePath = `${UPLOAD_PATH}/${fileName}`;

    const newImage = { fileName: fileName, path: filePath };
    const createImage = await imageModel.create({ newImage });
    return createImage;
  }

  static async uploadStableImage(imageData) {
    const uniqueSuffix = `${Date.now()}`;
    const fileName = `stable-${uniqueSuffix}.png`;
    const filePath = `uploads/${fileName}`;
    fs.writeFileSync(filePath, imageData);
    const fullFilePath = path.resolve(filePath);
    const newImage = {
      fileName: fileName,
      path: fullFilePath,
    };
    const createImage = await imageModel.create({ newImage });
    return createImage;
  }
}

export { imageService };
