import StoryCard from '../Global/StoryCard';
import Pagination from '../global/Pagination';
const OurStories = () => {
	const currentPage = 1;
	const totalPages = 3;

	return (
		<>
			<div className="font-bold mb-8 md:p-10 block p-6 bg-white rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
				<div className="mb-10 text-3xl font-semibold">우리들의 스토리</div>
				<div className="mb-10"></div>
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

				<Pagination totalPages={totalPages} currentPage={currentPage} />
			</div>
		</>
	);
};

export default OurStories;
