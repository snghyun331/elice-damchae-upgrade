// usePagination.js
import { useState } from 'react';

const usePagination = (data, itemsPerPage) => {
	const [currentPage, setCurrentPage] = useState(1);
	const totalPages = Math.ceil(data.length / itemsPerPage);
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = currentPage * itemsPerPage;
	const displayedData = data.slice(startIndex, endIndex);

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
