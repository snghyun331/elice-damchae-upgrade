import PropTypes from 'prop-types';
import { ChevronRightIcon } from '@heroicons/react/24/solid';

const MyDaenamuCard = ({ data }) => {
	return (
		<a
			href="#"
			className="block max-w-sm p-6 bg-white border border-gray-200 rounded-2xl hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
		>
			<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
				{data.title}
			</h5>
			<p className="font-normal text-gray-700 dark:text-gray-400">
				{data.content}
			</p>
			<div className="flex w-16 items-center text-sm font-medium text-center text-black focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 self-end">
				<ChevronRightIcon className="w-4 mt-1" />
				<span className="ml-1">더보기</span>
			</div>
		</a>
	);
};

MyDaenamuCard.propTypes = {
	data: PropTypes.object.isRequired
}

export default MyDaenamuCard;
