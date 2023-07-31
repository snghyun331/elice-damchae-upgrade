import { useEffect, useState } from 'react';
import { getApi } from '../../services/api';
import { useParams } from 'react-router-dom';
import Search from '../Global/Search';
import SearchResultBox from './SearchResultBox';
const SearchResults = () => {
	const searchQuery = useParams();
	const [errorMessage, setErrorMessage] = useState('');
	const [results, setResults] = useState([]);

	const fetchData = async (searchWord) => {
		try {
			const response = await getApi(
				`stories?option=title_content&searchword=${
					searchWord || searchQuery.searchQuery
				}`,
			);
			console.log(response.data);
			setResults(response.data);
		} catch (err) {
			console.log(err.response.data.message);
			setErrorMessage(err.response.data.message);
		}
	};

	useEffect(() => {
		fetchData();
	}, [searchQuery]);

	const handleSearch = (newSearchQuery) => {
		fetchData(newSearchQuery);
	};

	return (
		<div className="text-gray-500 dark:text-gray-400">
			<Search onSearch={handleSearch} />
			<h1 className="mt-10 mb-5 text-2xl">
				<span className="text-blue-600 font-semibold">
					{searchQuery.searchQuery}
				</span>{' '}
				에 대한 검색 결과{' '}
				<span className="text-lg">({results.totalStoriesCount}건)</span>
			</h1>
			{results.stories && results.stories.length > 0 ? (
				results.stories.map((result) => (
					<SearchResultBox key={result._id} data={result} />
				))
			) : (
				<div
					className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
					role="alert"
				>
					<strong className="font-bold"></strong>
					<span className="block sm:inline"> {errorMessage}</span>
				</div>
			)}
		</div>
	);
};

export default SearchResults;
