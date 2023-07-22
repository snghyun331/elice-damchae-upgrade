import moment from 'moment';
import StoryEditor from './StoryTextEditor';
import PropTypes from 'prop-types';
import MusicVideo from './MusicVideo';
import useStoryStore from '../../store/useStoryStore';

const StoryCreateModal = () => {
	const currentDate = moment().format('YYYY년 M월 D일');

	const {
		title,
		content,
		thumbnail,
		isPublic,
		mood,
		music,
		phrase,
		setIsPublic,
		setThumbnail,
		storyModal,
		handleModalClose,
		postStory,
	} = useStoryStore();

	const modalStyle = storyModal ? '' : 'hidden';

	const handleThumbnailUpload = (e) => {
		setThumbnail(e.target.files[0]);
	};

	const post = { title, content, thumbnail, isPublic, mood, music };

	const formData = new FormData();
	for (const key in post) {
		formData.append(key, post[key]);
	}

	return (
		<div
			className={`overflow-y-auto max-h-100 fixed inset-0 flex justify-center z-50 backdrop-filter backdrop-blur ${modalStyle}`}
		>
			<div
				id="staticModal"
				data-modal-backdrop="static"
				tabIndex="-1"
				aria-hidden="true"
				className="relative w-full max-w-2xl p-4 overflow-x-hidden overflow-y-auto"
			>
				<div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
					<div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
						<h3 className="text-xl font-semibold text-gray-900 dark:text-white">
							{currentDate}의 스토리 작성하기
						</h3>
						<button
							type="button"
							onClick={handleModalClose}
							className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
							data-modal-hide="staticModal"
						>
							<svg
								className="w-3 h-3"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 14 14"
							>
								<path
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
								/>
							</svg>
							<span className="sr-only">Close modal</span>
						</button>
					</div>

					<div className="flex flex-col p-6 space-y-6">
						<div>
							<label
								className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								htmlFor="file_input"
							>
								썸네일 업로드
							</label>
							<input
								className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
								id="file_input"
								type="file"
								onChange={handleThumbnailUpload}
							/>
							{thumbnail && (
								<div className="mt-4">
									<p className="text-sm text-gray-500">선택된 이미지:</p>
									<img
										className="mt-2 max-w-xs"
										src={thumbnail}
										alt="Selected Thumbnail"
									/>
								</div>
							)}
						</div>
						<StoryEditor />

						<label className="self-end relative inline-flex items-center cursor-pointer">
							<input
								onChange={() => {
									setIsPublic(!isPublic);
									console.log(isPublic);
								}}
								type="checkbox"
								value={isPublic}
								className="sr-only peer"
							/>
							<div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
							<span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
								공개 스토리
							</span>
						</label>
					</div>

					{music && (
						<div className="p-6 border-t border-gray-200 dark:border-gray-600">
							<MusicVideo music={music} phrase={phrase} />
						</div>
					)}

					<div className="justify-end flex p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
						<button
							onClick={postStory(formData)}
							type="button"
							className="self-end text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
						>
							작성 완료
						</button>
						<button
							onClick={handleModalClose}
							data-modal-hide="staticModal"
							type="button"
							className="self-end text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-md border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
						>
							닫기
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

StoryCreateModal.propTypes = {
	showStoryCreateModal: PropTypes.bool.isRequired,
	handleModalClose: PropTypes.func.isRequired,
};

export default StoryCreateModal;
