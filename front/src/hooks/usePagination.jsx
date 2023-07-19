// usePagination.js
import { useState } from 'react';

const usePagination = (data, itemsPerPage) => {
	const [currentPage, setCurrentPage] = useState(1);
	const totalPages = Math.ceil(data.length / itemsPerPage);
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = currentPage * itemsPerPage;
	const displayedData = data.slice(startIndex, endIndex);

	const handlePreviousClick = () => {
		if (currentPage > 1) setCurrentPage(currentPage - 1);
	};

	const handleNextClick = () => {
		if (currentPage < totalPages) setCurrentPage(currentPage + 1);
	};

	const handleClick = (pageNumber) => setCurrentPage(pageNumber);

	return {
		currentPage,
		totalPages,
		displayedData,
		handlePreviousClick,
		handleNextClick,
		handleClick,
	};
};

export default usePagination;
