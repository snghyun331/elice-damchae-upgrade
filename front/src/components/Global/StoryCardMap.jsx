import usePagination from '../../hooks/usePagination';
import StoryCard from './StoryCard';
import Pagination from './Pagination';

const StoryCardMap = () => {
	const dummyData = [
		{
			id: 1,
			username: 'Mike',
			title:
				'가장많이 글씨를 쓰면 몇자까지 쓸 수 있을까요 그리고 몇자까지 미리보여줄 수 있을까요 가장',
			content:
				'가장많이 글씨를 쓰면 몇자까지 쓸 수 있을까요 그리고 몇자까지 미리보여줄 수 있을까요 가장많이 글씨를 쓰면 몇자까지 쓸 수 있을까요 그리고 몇자까지 미리보여줄 수 있을까요',
			storyImg: 'https://picsum.photos/200/300',
			mood: '😊',
		},
		{
			id: 2,
			username: 'Mike',
			title: 'Story 2',
			content:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incid',
			storyImg: 'https://picsum.photos/200/300',
			mood: '😡',
		},
		{
			id: 3,
			username: 'Mike',
			title: 'Story 3',
			content:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incid',
			storyImg: 'https://picsum.photos/200/300',
			mood: '😨',
		},
		{
			id: 4,
			username: 'Mike',
			title: 'Story 4',
			content:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incid',
			storyImg: 'https://picsum.photos/200/300',
			mood: '😊',
		},
	];

	const itemsPerPage = 8;
	const {
		currentPage,
		totalPages,
		displayedData,
		prev,
		next,
		go,
	} = usePagination(dummyData, itemsPerPage);

	return (
		<>
			<div className="font-bold mb-8 md:p-10 block bg-white rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 text-base font-medium">
					{displayedData.map((storyData) => (
						<div key={storyData.title}>
							<StoryCard data={storyData} />
						</div>
					))}
				</div>
				<div className="flex justify-center mt-10">
					<Pagination
						currentPage={currentPage}
						totalPages={totalPages}
						prev={prev}
						next={next}
						go={go}
					/>
				</div>
			</div>
		</>
	);
};

export default StoryCardMap;
