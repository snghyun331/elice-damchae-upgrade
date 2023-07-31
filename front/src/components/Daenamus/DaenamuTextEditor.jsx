import { useRef, useMemo } from 'react';
import { Editor } from '@toast-ui/react-editor';
import { postApi } from '../../services/api';
import useImageUpload from '../../hooks/useImageUpload';
import useStoryStore from '../../store/useStoryStore';
import { textToIcon, textToKorean } from '../Util/Util';

const DaenamuTextEditor = () => {
	const {
		title,
		content,
		mood,

		setTitle,
		setMood,

		setContent,
	} = useStoryStore();

	const isFormValid = useMemo(
		() => title && content && mood,
		[title, content, mood],
	);

	const handleSubmit = async () => {
		try {
			const response = await postApi('forest/senti-predict', { content });

			console.log(response);
			setMood(response.data.mood);
		} catch (error) {
			console.log(error.response.data.errorMessage);
		}
	};

	const editorRef = useRef();

	const onChange = () => {
		const body = editorRef.current.getInstance().getHTML();
		setContent(body);
	};

	const { handleImageUpload, loading } = useImageUpload();

	const postForest = async (e) => {
		e.preventDefault();

		try {
			const post = { title, content, mood };

			const response = await postApi('forest', post);
			console.log(response.data);
			setTimeout(() => {
				window.location.href = '/daenamus';
			}, 100);
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<>
			<h3 className="font-semibold">제목</h3>
			<input
				className="my-5 w-1/2 border"
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
					initialValue=" "
					placeholder="내용을 입력하세요."
					previewStyle="vertical"
					previewHighlight={false}
					height="400px"
					initialEditType="wysiwyg"
					language="ko-KR"
					toolbarItems={[
						// 툴바 옵션 설정
						['bold', 'italic', 'strike'],
						['hr', 'quote'],
						['ul', 'ol', 'task', 'indent', 'outdent'],
						['table', 'image', 'link'],
					]}
					ref={editorRef}
					onChange={onChange}
					hooks={{
						addImageBlobHook: handleImageUpload,
					}}
				/>
				{content?.length <= 16 && (
					<p className="text-right text-red-400">10자 이상 입력해주세요.</p>
				)}
			</div>

			{loading && <div>이미지 업로드 중...</div>}
			<div className="flex flex-col space-y-2">
				<div className="justify-end flex flex-row space-x-2">
					{mood && (
						<div className="text-lg">
							게시글 분석 결과 : {textToKorean[mood]}
							{textToIcon[mood]}
						</div>
					)}
					<button
						onClick={handleSubmit}
						disabled={content?.length <= 16}
						className="w-40 h-8 bg-blue-700 disabled:bg-neutral-300 text-white font-medium rounded-md text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
					>
						감정 분석하기
					</button>
				</div>

				<div className="justify-end flex flex-col">
					<button
						disabled={!isFormValid}
						onClick={postForest}
						type="button"
						className="w-40 self-end bg-blue-700 disabled:bg-neutral-300 text-white font-medium rounded-md text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
					>
						작성 완료
					</button>
					{!isFormValid && (
						<p className="self-end text-red-500 text-xs">빈 칸을 채워주세요.</p>
					)}
				</div>
			</div>
		</>
	);
};

export default DaenamuTextEditor;
