import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StoryCreateModal from "./StoryCreateModal"
import BannerCarousel from './BannerCarousel';
import Search from '../Global/Search';
import StoryCardMap from '../Global/StoryCardMap';

const Home = () => {
	const navigate = useNavigate();
	const [showStoryCreateModal, setShowStoryCreateModal] = useState(false);

	const handleButtonClick = () => {
		setShowStoryCreateModal(true);
	};

	const handleModalClose = () => {
		setShowStoryCreateModal(false);
	};

	return (
		<div>
			<BannerCarousel />
			<br />
			<div className="mt-16 mb-16 flex justify-center items-center flex-col">
				<span className="text-2xl">대머리독수리 님, 행복한 하루 보내세요.</span>
				<br />
				<div className="mb-10">
					<button
						onClick={() => navigate('/stories')}
						type="button"
						className="w-36 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-sm text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
					>
						내 스토리
					</button>
					<button
						onClick={handleButtonClick}
						type="button"
						className="w-36 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-sm text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
					>
						스토리 쓰기
					</button>
				</div>
			</div>
			<div className="items-center">
				<Search />
			</div>
			<hr className='mt-20'/>
			<div>
				<div className="mt-10 text-3xl font-semibold">우리들의 스토리</div>
				<StoryCardMap />
			</div>
			{/* 모달 렌더링 */}
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
		</div>
	);
};

export default Home;
