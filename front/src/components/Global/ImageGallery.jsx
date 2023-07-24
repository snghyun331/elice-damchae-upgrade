import { useRef } from 'react';
import useImageUpload from '../../hooks/useImageUpload';

const ImageGallery = () => {
	const iframeRef = useRef(null);

	const { handleImageUpload, loading } = useImageUpload();

	const handleButtonClick = () => {
		// iframe의 Document 객체에 접근
		const iframeDocument = iframeRef.current.contentDocument;
		if (!iframeDocument) console.log('문서 없음'); // iframe이 로드되지 않았을 경우 빠르게 반환

		// iframe 내의 원하는 요소를 선택
		const galleryItemButtons = iframeDocument.querySelectorAll(
			'.gallery-item button',
		);

		// 선택된 요소들에 이벤트 핸들러 연결
		galleryItemButtons.forEach((button) => {
			button.addEventListener('click', () => {
				// 여기서 해당 버튼 아래에 있는 이미지 태그의 base64 데이터를 가져와서 처리
				const image = button.querySelector('img');
				const imageDataURI = image.src;
				console.log(image.src);
				const base64Data = imageDataURI.split(',')[1];
				handleImageUpload(base64Data, (imageUrl, altText) => {
					// 이미지를 업로드하고 콜백으로 받은 imageUrl과 altText를 활용하여 작업을 수행
					console.log('Uploaded Image URL:', imageUrl);
					console.log('Alt Text:', altText);
				});
			});
		});
	};

	return (
		<div>
			<iframe
				ref={iframeRef}
				title="Huggingface"
				src="https://stabilityai-stable-diffusion.hf.space"
				width="560"
				height="450"
			></iframe>
			<button onClick={() => handleButtonClick()}>Iframe 내 요소 접근</button>
			{loading && <div>이미지 업로드 중...</div>}
		</div>
	);
};

export default ImageGallery;
