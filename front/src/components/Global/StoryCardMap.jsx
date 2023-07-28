import { useState, useEffect } from 'react';
import usePagination from '../../hooks/usePagination';
import StoryCard from './StoryCard';
import Pagination from './Pagination';
import { getApi } from '../../services/api';


const StoryCardMap = () => {
	const [stories, setStories] = useState([]);
	const [isDataLoaded, setIsDataLoaded] = useState(false);
	const [totalPage, setTotalPage] = useState(0);

	const fetchData = async (page = 1) => {
		try {
			const response = await getApi(`stories?page=${page}`);
			console.log(response.data);
			setStories(response.data.result);
			setTotalPage(response.data.totalPage);
			setIsDataLoaded(true);
		} catch (error) {
			console.error('Failed to fetch data:', error);
		}
	};
	console.log(stories)
	useEffect(() => {
		fetchData(currentPage);
	}, []);

	const { currentPage, prev, next, go } = usePagination(
		isDataLoaded ? stories : [], totalPage
	);

	useEffect(() => {
		if (isDataLoaded) {
			fetchData(currentPage);
		}
	}, [currentPage]);

	return (
		<>
			<div className="font-bold mb-8 md:p-10 block bg-white rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 text-base font-medium">
					{isDataLoaded &&
						stories.map((story) => (
							<div key={story._id}>
								<StoryCard data={story} />
							</div>
						))}
				</div>
				<div className="flex justify-center mt-10">
					<Pagination
						currentPage={currentPage}
						totalPages={totalPage}
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
