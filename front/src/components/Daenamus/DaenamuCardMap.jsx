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
			<div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
				{isDataLoading &&
					forests.map((forest) => (
						<div key={forest._id}>
							<DaenamuCard data={forest} />
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
		</>
	);
};

export default DaenamuCardMap;
