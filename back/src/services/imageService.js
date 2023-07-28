import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { ImageModel } from '../db/models/imageModel.js';

class imageService {
  static async generateUniqueFileName(file) {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const extension = file.originalname.split('.').pop(); // 확장자 추출
    const fileName = `${file.fieldname}-${uniqueSuffix}.${extension}`;
    return fileName;
  }

  static async uploadImage({ file }) {
    if (!file) {
      throw new Error('No image file uploaded.');
    }
    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/bmp',
      'image/gif',
      'image/jpg',
    ];
    if (!allowedTypes.includes(file.mimetype)) {
      throw new Error('Invalid file type');
    }

    const __filename = fileURLToPath(import.meta.url); // 현재 모듈의 URL을 가져오기
    const __dirname = path.dirname(__filename); // 디렉토리 경로를 추출

    // 파일명 생성  ex: image-1686418086297-173678905.png
    const fileName = await imageService.generateUniqueFileName(file);

    const uploadsPath = path.resolve(__dirname, '..', '..', 'uploads');
    const ImagePath = path.join(uploadsPath, fileName);

    const resizedImageBuffer = await sharp(file.path).toBuffer();
    await sharp(resizedImageBuffer).toFile(ImagePath);

    // 원본 이미지 삭제
    fs.unlinkSync(file.path); // 이미지 리사이징 완료되면 원본은 삭제

    const newImage = { fileName: fileName, path: file.path };

    // 리사이징된 이미지 경로 저장
    newImage.path = ImagePath;
    const createImage = await ImageModel.create({ newImage });
    return createImage;
  }
}

export { imageService };
