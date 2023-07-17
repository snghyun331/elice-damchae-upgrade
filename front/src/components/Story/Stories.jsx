import { useState } from 'react';
import Search from '../Global/Search';
import StoryCard from '../Global/StoryCard';
import StoryCreateModal from '../home/StoryCreateModal';
const Stories = () => {
	const [showStoryCreateModal, setShowStoryCreateModal] = useState(false);

	const handleButtonClick = () => {
		setShowStoryCreateModal(true);
	};

	const handleModalClose = () => {
		setShowStoryCreateModal(false);
	};
	return (
		<>
			<div className="font-bold mb-8 md:p-10 block p-6 bg-white rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
				<div className="mb-10 text-3xl font-semibold">내 스토리</div>
				<button
					onClick={handleButtonClick}
					type="button"
					className="w-36 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-md text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
				>
					스토리 쓰기
				</button>
				{showStoryCreateModal && (
					<>
						<StoryCreateModal
							showStoryCreateModal={showStoryCreateModal}
							handleModalClose={handleModalClose}
						/>
						<button
							type="button"
							onClick={handleModalClose}
							className="fixed inset-0 w-full h-full bg-black opacity-60 cursor-default"
							aria-hidden="true"
						/>
					</>
				)}
				<div className="mb-10">
					<Search />
				</div>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-lg font-medium">
					<div>
						<StoryCard />
					</div>
					<div>
						<StoryCard />
					</div>
					<div>
						<StoryCard />
					</div>
					<div>
						<StoryCard />
					</div>
				</div>
			</div>
		</>
	);
};

export default Stories;
