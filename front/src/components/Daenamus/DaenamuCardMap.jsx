import { useState, useEffect } from 'react';
import usePagination from '../../hooks/usePagination';
import DaenamuCard from '../Global/DaenamuCard';
import Pagination from '../Global/Pagination';
import { getApi } from '../../services/api';

const DaenamuCardMap = () => {
	const [forests, setForests] = useState([]);
	const [isDataLoading, setIsDataLoading] = useState(false);
	const [totalPage, setTotalPage] = useState(0);

	const fetchData = async (page = 1) => {
		try {
			const response = await getApi(`forest?page=${page}`);
			console.log(response);

			setForests(response.data.forests);
			setTotalPage(response.data.totalPage);
			setIsDataLoading(true);
		} catch (error) {
			console.error('Failed to fetch data:', error);
		}
	};
	useEffect(() => {
		fetchData(currentPage);
	}, []);

	const { currentPage, prev, next, go } = usePagination(
		isDataLoading ? forests : [],
		totalPage,
		{ onChange: ({ targetPage }) => fetchData(targetPage) },
	);

	useEffect(() => {
		if (isDataLoading) {
			fetchData(currentPage);
		}
	}, [currentPage]);

	return (
		<>
			<div className="font-bold mb-8 md:p-10 block bg-white rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
				{isDataLoading ? (
					<>
						{forests && forests.length > 0 ? ( // Check if forests is not empty
							<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 text-base font-medium">
								{forests.map((forest) => (
									<div key={forest._id}>
										<DaenamuCard data={forest} />
									</div>
								))}
							</div>
						) : (
							<div>등록된 게시글이 없습니다.</div> // Display this message when stories is empty
						)}
					</>
				) : (
					<div>Loading...</div>
				)}
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
		</>
	);
};

export default DaenamuCardMap;
