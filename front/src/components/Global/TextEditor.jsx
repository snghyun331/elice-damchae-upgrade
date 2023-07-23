import { useState, useRef } from 'react';
import { Editor } from '@toast-ui/react-editor';
import useImageUpload from '../../hooks/useImageUpload';

const TextEditor = () => {
	const [title, setTitle] = useState('');

	const editorRef = useRef();

	const handleSubmit = () => {
		const content = editorRef.current?.getInstance().getHTML() || '';
		console.log(content);
	};
	const { handleImageUpload, loading } = useImageUpload();

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
			{loading && <div>이미지 업로드 중...</div>}
		</>
	);
};

export default TextEditor;
