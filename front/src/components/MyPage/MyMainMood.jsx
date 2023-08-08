import { InformationCircleIcon } from '@heroicons/react/24/outline';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { textToIcon } from '../Util/Util';
import PropTypes from 'prop-types';

const MyMainMood = ({ posts }) => {
	const [mainMood, setMainMood] = useState('');
	useEffect(() => {
		const moodFrequency = {};

		posts?.forEach((post) => {
			if (post.mood in moodFrequency) {
				moodFrequency[post.mood] += 1;
			} else {
				moodFrequency[post.mood] = 1;
			}
		});

		const mostFrequentMood = Object.keys(moodFrequency).reduce(
			(a, b) => (moodFrequency[a] > moodFrequency[b] ? a : b),
			'',
		);

		setMainMood(mostFrequentMood);
	}, [posts]);

	const currentMonth = moment().format('M');
	return (
		<div className="relative block p-4 pb-5 bg-slate-50 border border-gray-200 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 flex flex-col items-center justify-center">
			<InformationCircleIcon
				data-tooltip-id="tooltip"
				data-tooltip-content="이번 달에 가장 많이 느낀 감정이에요."
				className="absolute top-3 right-3 h-5 w-5 text-slate-400"
			/>{' '}
			<h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
				{currentMonth}월의 주요 감정
			</h5>
			<p className="text-7xl text-gray-700 dark:text-gray-400">
				{textToIcon[mainMood]}
			</p>
		</div>
	);
};

MyMainMood.propTypes = {
	posts: PropTypes.array.isRequired,
};

export default MyMainMood;
