// useImageUpload.js

import { useState } from 'react';
import { postApi } from '../services/api';

const useImageUpload = () => {
	const [loading, setLoading] = useState(false);

	const handleImageUpload = async (blob, callback) => {
		setLoading(true);

		try {
			const formData = new FormData();
			formData.append('image', blob);
			console.log(blob);

			const response = await postApi('image/upload', formData);

			const imageUrl = `http://localhost:3000/uploads/${response.data.fileName}`;
			console.log(imageUrl);
			//TODO:나중에 경로 제대로 설정

			callback(imageUrl, '사진 대체 텍스트 입력');
		} catch (error) {
			console.error('이미지 업로드 실패');
			console.error(error);

			callback('image_load_fail', '사진 대체 텍스트 입력');
		} finally {
			setLoading(false);
		}
	};

	return { handleImageUpload, loading };
};

export default useImageUpload;
