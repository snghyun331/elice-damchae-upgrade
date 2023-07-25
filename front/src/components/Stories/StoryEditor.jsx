import { useRef } from 'react';
import { Editor } from '@toast-ui/react-editor';
import useImageUpload from '../../hooks/useImageUpload';
import useStoryStore from '../../hooks/useStoryStore';

const StoryEditor = () => {
	const { title, setTitle, music, setMood, setMusic, setPhrase, setContent } =
		useStoryStore();

	const recommend = async () => {
		try {
			// const response = await postApi('stories/recommend', content);
			setMood('기쁨');
			setMusic('WVmu2vWFZ_U');
			setPhrase('기쁘시다니 저도 기뻐요');
		} catch (error) {
			console.log(error.response.data.errorMessage);
		}
	};

	const handleRecommend = () => {
		const body = editorRef.current?.getInstance().getHTML() || '';
		console.log(body);
		setContent(body);
		// recommend(content);
		recommend();
		console.log(music);
	};

	const editorRef = useRef();

	const { handleImageUpload, loading } = useImageUpload();

	return (
		<>
			<h3 className="font-semibold">제목</h3>
			<input
				className="border"
				onChange={(e) => {
					setTitle(e.target.value);
				}}
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
			<div className="flex flex-col justify-end space-y-2">
				<button
					onClick={handleRecommend}
					className="w-60 self-end text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
				>
					기분에 맞는 음악 추천받기
				</button>
			</div>

			{loading && <div>이미지 업로드 중...</div>}
		</>
	);
};

export default StoryEditor;
