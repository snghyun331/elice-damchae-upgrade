import { InformationCircleIcon } from '@heroicons/react/24/outline';
import moment from'moment';

const MyMainMood = () => {
	const currentMonth = moment().format('M');
	return (
		<div className="relative block p-7 pb-10 bg-slate-50 border border-gray-200 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 flex flex-col items-center justify-center">
			<InformationCircleIcon className="absolute top-3 right-3 h-5 w-5 text-slate-400" />{' '}
			<h5 className="mb-5 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
			{currentMonth}월의 주요 감정
			</h5>
			<p className="text-9xl text-gray-700 dark:text-gray-400">😊</p>
		</div>
	);
};

export default MyMainMood;
