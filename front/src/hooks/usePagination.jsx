// usePagination.js
import { useState } from 'react';

const usePagination = (data, totalPages) => {
	const [currentPage, setCurrentPage] = useState(1);

	const displayedData = data;

	const prev = () => {
		if (currentPage > 1) setCurrentPage(currentPage - 1);
	};

	const next = () => {
		if (currentPage < totalPages) setCurrentPage(currentPage + 1);
	};

	const go = (pageNumber) => setCurrentPage(pageNumber);

	return {
		currentPage,
		totalPages,
		displayedData,
		prev,
		next,
		go,
	};
};

export default usePagination;
