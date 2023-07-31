/* eslint-disable react/prop-types */
import { ChevronRightIcon } from '@heroicons/react/24/solid';
import {
	EyeIcon,
	ChatBubbleLeftEllipsisIcon,
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { truncateString, removeTag } from '../Util/Util';
import { textToIcon, formatRelativeTime } from '../Util/Util';

const SearchResultBox = ({
	data: {
		content,
		createdAt,
		mood,
		thumbnail,
		title,
		_id,
		userInfo,
		views,
		commentCount,
	},
}) => {
	const moodIcon = textToIcon[mood.toLowerCase()] || '❓'; // fallback to question mark for unknown text

	const imageSrc = thumbnail
		? `http://localhost:3000/uploads/${thumbnail.fileName}`
		: '';

	return (
		<>
			<p className="mb-3 text-lg text-gray-500 md:text-xl dark:text-gray-400">
				Deliver great service experiences fast - without the complexity of
				traditional ITSM solutions.Accelerate critical development work and
				deploy.
			</p>
			<p className="text-gray-500 dark:text-gray-400">
				Track work across the enterprise through an open, collaborative
				platform. Link issues across Jira and ingest data from other software
				development tools, so your IT support and operations teams have richer
				contextual information to rapidly respond to requests, incidents, and
				changes.
			</p>
		</>
	);
};

export default SearchResultBox;
