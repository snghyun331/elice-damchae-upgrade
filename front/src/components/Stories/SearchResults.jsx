import { useEffect, useState } from 'react';
import { getApi } from '../../services/api';
import { useParams } from 'react-router-dom';
import Search from '../Global/Search';
import SearchResultBox from './SearchResultBox';
import Pagination from '../Global/Pagination';
import usePagination from '../../hooks/usePagination';

const SearchResults = () => {
	const searchQuery = useParams();
	const [errorMessage, setErrorMessage] = useState('');
	const [results, setResults] = useState([]);
	const [isDataLoading, setIsDataLoading] = useState(false);
	const [totalPage, setTotalPage] = useState(0);

	const fetchData = async (searchWord, page = 1) => {
		try {
			const response = await getApi(
				`stories?option=title_content&searchword=${
					searchWord || searchQuery.searchQuery
				}&page=${page}`,
			);
			setResults(response.data);
			setTotalPage(response.data.totalPage);
			setErrorMessage('');
			setIsDataLoading(true);
		} catch (err) {
			setErrorMessage(err.response.data.message);
			setResults([]);
		}
	};

	const { currentPage, prev, next, go } = usePagination(
		isDataLoading ? results : [],
		totalPage,
		{
			onChange: ({ targetPage }) =>
				fetchData(searchQuery.searchQuery, targetPage),
		},
	);

	useEffect(() => {
		fetchData(searchQuery.searchQuery, currentPage);
	}, [searchQuery, currentPage]);

	const handleSearch = (newSearchQuery) => {
		fetchData(newSearchQuery, 1);
	};

	return (
		<div className="text-gray-500 dark:text-gray-400">
			<Search onSearch={handleSearch} />
			<h1 className="mt-10 mb-12 text-2xl">
				<span className="text-blue-600 font-semibold">
					{searchQuery.searchQuery}
				</span>{' '}
				에 대한 검색 결과{' '}
				<span className="text-lg">
					({results.totalStoriesCount ? results.totalStoriesCount : '0'}건)
				</span>
			</h1>
			{results.stories && results.stories.length > 0 ? (
				results.stories.map((result) => (
					<SearchResultBox key={result._id} data={result} />
				))
			) : (
				<div
					className="p-4 mb-4 text-md text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 font-medium"
					role="alert"
				>
					검색 결과가 없습니다.
				</div>
			)}
			<div className="flex justify-center mt-10">
				{errorMessage === '' && (
					<Pagination
						currentPage={currentPage}
						totalPages={totalPage}
						prev={prev}
						next={next}
						go={go}
					/>
				)}
			</div>
		</div>
	);
};

export default SearchResults;
