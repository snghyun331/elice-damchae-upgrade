import { useState, useRef } from 'react';
import { Editor } from '@toast-ui/react-editor';
import axios from 'axios';

const TextEditor = () => {
	const [title, setTitle] = useState('');

	const editorRef = useRef();

	const handleSubmit = () => {
		const content = editorRef.current?.getInstance().getHTML() || '';
		console.log(content);
	};
	const handleImageUpload = async (blob, callback) => {
		try {
			const formData = new FormData();
			formData.append('image', blob);

			const response = await axios.post('/writeTest.do', formData, {
				headers: { 'Content-Type': 'multipart/form-data' },
			});

			const imageUrl = `/images/${response.data.filename}`;

			// callback : 에디터(마크다운 편집기)에 표시할 텍스트, 뷰어에는 imageUrl 주소에 저장된 사진으로 나옴
			// 형식 : ![대체 텍스트](주소)
			callback(imageUrl, '사진 대체 텍스트 입력');
		} catch (error) {
			console.error('이미지 업로드 실패');
			console.error(error);

			callback('image_load_fail', '사진 대체 텍스트 입력');
		}
	};

	return (
		<>
			<h3 className="font-semibold">제목</h3>
			<input
				className="border"
				onChange={(e) => setTitle(e.target.value)}
				type="text"
				id="title"
				value={title}
			/>
			<h3 className="font-semibold">본문</h3>
			<div className="mt-5">
				<Editor
					ref={editorRef}
					initialValue="내용을 입력하세요"
					previewStyle="vertical"
					previewHighlight={false}
					height="300px"
					initialEditType="wysiwyg"
					language="ko-KR"
					toolbarItems={[
						// 툴바 옵션 설정
						['bold', 'italic', 'strike'],
						['hr', 'quote'],
						['ul', 'ol', 'task', 'indent', 'outdent'],
						['table', 'image', 'link'],
					]}
					hooks={{
						addImageBlobHook: handleImageUpload,
					}}
				/>
			</div>
			<button onClick={handleSubmit}>등록</button>
		</>
	);
};

export default TextEditor;
