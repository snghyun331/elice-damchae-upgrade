import { useState } from 'react';

import StoryCard from './StoryCard';
import Pagination from './Pagination';

const StoryCardMap = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const dummyStories = [
		{
			username: 'Mike',
			title:
				'가장많이 글씨를 쓰면 몇자까지 쓸 수 있을까요 그리고 몇자까지 미리보여줄 수 있을까요 가장',
			content:
				'가장많이 글씨를 쓰면 몇자까지 쓸 수 있을까요 그리고 몇자까지 미리보여줄 수 있을까요 가장많이 글씨를 쓰면 몇자까지 쓸 수 있을까요 그리고 몇자까지 미리보여줄 수 있을까요',
			storyImg: 'https://picsum.photos/200/300',
			mood: '😊',
		},
		{
			username: 'Mike',
			title: 'Story 2',
			content:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incid',
			storyImg: 'https://picsum.photos/200/300',
			mood: '😡',
		},
		{
			username: 'Mike',
			title: 'Story 3',
			content:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incid',
			storyImg: 'https://picsum.photos/200/300',
			mood: '😨',
		},
		{
			username: 'Mike',
			title: 'Story 4',
			content:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incid',
			storyImg: 'https://picsum.photos/200/300',
			mood: '😊',
		},
		{
			username: 'Mike',
			title: 'Story 5',
			content:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incid',
			storyImg: 'https://picsum.photos/200/300',
			mood: '😊',
		},
		{
			username: 'Mike',
			title: 'Story 6',
			content:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incid',
			storyImg: 'https://picsum.photos/200/300',
			mood: '😊',
		},
		{
			username: 'Mike',
			title: 'Story 7',
			content:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incid',
			storyImg: 'https://picsum.photos/200/300',
			mood: '😊',
		},
		{
			username: 'Mike',
			title: 'Story 8',
			content:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incid',
			storyImg: 'https://picsum.photos/200/300',
			mood: '😊',
		},
		{
			username: 'Mike',
			title: 'Story 9',
			content:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incid',
			storyImg: 'https://picsum.photos/200/300',
			mood: '😊',
		},
	];

	const itemsPerPage = 8;
	const totalPages = Math.ceil(dummyStories.length / itemsPerPage);
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = currentPage * itemsPerPage;
	const displayedStories = dummyStories.slice(startIndex, endIndex);

	const handlePreviousClick = () => {
		if (currentPage > 1) setCurrentPage(currentPage - 1);
	};

	const handleNextClick = () => {
		if (currentPage < totalPages) setCurrentPage(currentPage + 1);
	};

	const handleClick = (pageNumber) => setCurrentPage(pageNumber);

	return (
		<>
			<div className="font-bold mb-8 md:p-10 block bg-white rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-lg font-medium">
					{displayedStories.map((storyData) => (
						<div key={storyData.title}>
							<StoryCard storyData={storyData} />
						</div>
					))}
				</div>
				<div className="flex justify-center mt-10">
					<Pagination
						totalPages={totalPages}
						currentPage={currentPage}
						handlePreviousClick={handlePreviousClick}
						handleNextClick={handleNextClick}
						handleClick={handleClick}
					/>
				</div>
			</div>
		</>
	);
};

export default StoryCardMap;
