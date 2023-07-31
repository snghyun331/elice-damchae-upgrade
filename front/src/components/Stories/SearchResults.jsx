import { useEffect, useState } from 'react';
import { getApi } from '../../services/api';
import { useParams } from 'react-router-dom';
import Search from "../Global/Search"
const SearchResults = () => {
	const searchQuery = useParams();
	const [errorMessage, setErrorMessage] = useState('');

	const fetchData = async () => {
		console.log(searchQuery);
		try {
			const response = await getApi(
				`stories?option=title_content&searchword=${searchQuery.searchQuery}`,
			);
			console.log(response);
		} catch (err) {
			console.log(err.response.data.message);
			setErrorMessage(err.response.data.message);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div>
			<Search />
			<h1>{searchQuery.searchQuery} 에 대한 검색 결과</h1>
			{errorMessage && (
				<div
					className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
					role="alert"
				>
					<strong className="font-bold"></strong>
					<span className="block sm:inline"> {errorMessage}</span>
				</div>
			)}
			{/* 검색 결과를 여기에 출력하세요. */}
		</div>
	);
};

export default SearchResults;
