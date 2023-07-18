import { useState } from 'react';
import moment from 'moment';
import TextEditor from '../global/TextEditor';
import PropTypes from 'prop-types';

const StoryCreateModal = ({ showStoryCreateModal, handleModalClose }) => {
	const currentDate = moment().format('YYYY년 M월 D일');

	const modalStyle = showStoryCreateModal ? '' : 'hidden';

	const [selectedImage, setSelectedImage] = useState(null);

	const handleImageUpload = (event) => {
		const file = event.target.files[0];
		setSelectedImage(URL.createObjectURL(file));
	};

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
						<TextEditor />
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
								onChange={handleImageUpload}
							/>
							{selectedImage && (
								<div className="mt-4">
									<p className="text-sm text-gray-500">선택된 이미지:</p>
									<img
										className="mt-2 max-w-xs"
										src={selectedImage}
										alt="Selected Thumbnail"
									/>
								</div>
							)}
						</div>
						<label
							htmlFor="Toggle"
							className="self-end inline-flex items-center p-1 cursor-pointer dark:bg-gray-300 dark:text-gray-800"
						>
							<input id="Toggle" type="checkbox" className="hidden peer" />
							<span className="px-4 py-2 bg-red-300 peer-checked:bg-gray-300">
								비공개
							</span>
							<span className="px-4 py-2 bg-gray-300 peer-checked:bg-blue-400">
								공개
							</span>
						</label>
					</div>
					<div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
						<button
							data-modal-hide="staticModal"
							type="button"
							className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
						>
							작성 완료
						</button>
						<button
							onClick={handleModalClose}
							data-modal-hide="staticModal"
							type="button"
							className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-md border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
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
