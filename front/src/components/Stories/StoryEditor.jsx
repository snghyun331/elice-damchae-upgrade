import { useRef, useState } from 'react';
import { Editor } from '@toast-ui/react-editor';
import useStoryStore from '../../store/useStoryStore';
import { postApi } from '../../services/api';
import RadioOption from '../Global/RadioOption';
import useImageUpload from '../../hooks/useImageUpload';

const StoryEditor = () => {
	const {
		title,
		content,
		stableThumbnail,

		setTitle,
		setMood,
		setMusic,
		setPhrase,
		setContent,
		setThumbnail,
		setLocalThumbnail,
		setStableThumbnail,
	} = useStoryStore();

	const [preview, setPreview] = useState('');
	const [selectedOption, setSelectedOption] = useState('');

	const handleThumbnailUpload = async (e) => {
		e.preventDefault();
		const file = e.target.files[0];
		setLocalThumbnail(file);
		setPreview(URL.createObjectURL(file));
	};

	const recommend = async () => {
		try {
			const response = await postApi('stories/recommend', { content });

			console.log(response);
			setMood(response.data.mood);
			setMusic(response.data.music);
			setPhrase(response.data.phrase);
		} catch (error) {
			console.log(error.response.data.errorMessage);
		}
	};

	const generateImage = async () => {
		const body = editorRef.current?.getInstance().getHTML() || '';
		setContent(body);
		try {
			const response = await postApi('image/stable', { content });
			setStableThumbnail(response.data.fileName);
		} catch (error) {
			console.log(error);
		}
	};

	//TODO: 로딩중 걸기

	const editorRef = useRef();
	const fileRef = useRef();

	const onChange = () => {
		const body = editorRef.current.getInstance().getHTML();
		setContent(body);
	};

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
			<div className="flex flex-col space-y-2">
				<div className="flex flex-row space-x-2 mb-5">
					<div className="w-1/2">
						<div className="h-1/5 items-end">
							<input
								className="rounded-lg block w-full text-sm text-gray-900 border border-gray-300 cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
								id="file_input"
								type="file"
								ref={fileRef}
								onChange={handleThumbnailUpload}
							/>
						</div>
						{preview && (
							<div>
								<div>
									<div className="flex flex-row justify-between">
										<p className="text-sm text-gray-500">선택된 이미지:</p>
										<button
											onClick={() => {
												setPreview('');
												setLocalThumbnail('');
												setThumbnail('');
												fileRef.current.value = '';
											}}
										>
											X
										</button>
									</div>
									<img
										className="h-40"
										src={preview}
										alt="Selected Thumbnail"
									/>
								</div>
								<RadioOption
									id="local-thumbnail"
									value="local-thumbnail"
									name="hosting"
									label="로컬 이미지 선택"
									selectedOption={selectedOption}
									setSelectedOption={setSelectedOption}
								/>
							</div>
						)}
					</div>
					<div className="w-1/2 ">
						<div className="h-1/5 flex">
							<button
								onClick={generateImage}
								disabled={content?.length <= 16}
								className="w-full h-8 bg-blue-700 disabled:bg-neutral-300 text-white font-medium rounded-md text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
							>
								썸네일 이미지 생성하기
							</button>
						</div>
						{stableThumbnail && (
							<div>
								<div>
									<div className="flex flex-row justify-between">
										<p className="text-sm text-gray-500">선택된 이미지:</p>
										<button
											onClick={() => {
												setStableThumbnail('');
												setThumbnail('');
											}}
										>
											X
										</button>
									</div>

									<img
										className="h-full"
										src={`http://localhost:3000/uploads/${stableThumbnail}`}
										alt="Thumbnail"
									/>
								</div>
								<RadioOption
									id="stable-thumbnail"
									value="stable-thumbnail"
									name="hosting"
									label="AI로 생성된 이미지 선택"
									selectedOption={selectedOption}
									setSelectedOption={setSelectedOption}
								/>
							</div>
						)}
					</div>
				</div>
				{loading && <div>이미지 업로드 중...</div>}

				<div className="w-full">
					<button
						onClick={recommend}
						disabled={content?.length <= 16}
						className="w-full h-8 bg-blue-700 disabled:bg-neutral-300 text-white font-medium rounded-md text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
					>
						기분에 맞는 음악 추천받기
					</button>
				</div>
			</div>
		</>
	);
};

export default StoryEditor;
