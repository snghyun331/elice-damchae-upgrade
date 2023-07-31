/* eslint-disable react/prop-types */
import { ChevronRightIcon } from '@heroicons/react/24/solid';
import {
	EyeIcon,
	ChatBubbleLeftEllipsisIcon,
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { truncateString, removeTag } from '../Util/Util';
import { textToIcon, formatRelativeTime } from '../Util/Util';

const StoryCard = ({
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
			<div
				className={`border border-[0.1rem] border-solid rounded-2xl pt-5 pl-5 pr-5 my-4 ms-5 relative`}
			>
				<Link to={`/stories/${_id}`}>
					<div className="flex items-center justify-center">
						<figure className="max-w-lg w-[21rem] h-[12rem] overflow-hidden">
							<img
								className="w-full h-full object-cover object-center rounded-2xl"
								src={imageSrc}
								alt="스토리 이미지"
								onError={(e) => {
									e.target.src =
										'https://climate.onep.go.th/wp-content/uploads/2020/01/default-image.jpg';
								}}
							/>
						</figure>
						<span className="absolute top-36 right-2 text-8xl">{moodIcon}</span>
					</div>
					<div className="px-4 py-8 flex flex-col justify-between">
						<div>
							<h5 className="mt-2 mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
								{truncateString(title, 32)}
							</h5>
							<div className="text-sm text-gray-500">
								{userInfo ? userInfo.nickname : '알 수 없는 유저'}
								<span className="text-xs ml-2">
									{formatRelativeTime(createdAt)}
								</span>
							</div>
							<p className="text-sm mb-3 font-normal text-gray-700 dark:text-gray-400">
								{truncateString(removeTag(content), 100)}
							</p>
						</div>

						<div className="space-y-2">
							<div className="flex w-16 items-center text-sm font-medium text-center text-black focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 self-end">
								<ChevronRightIcon className="w-4 mt-1" />
								<span className="ml-1">더보기</span>
							</div>
							<div className="justify-end flex flex-row space-x-2">
								<div className="flex flex-row space-x-2">
									<EyeIcon className="w-4 mt-1" />
									<p>{views}</p>
								</div>

								<div className="justify-end flex flex-row space-x-2">
									<ChatBubbleLeftEllipsisIcon className="w-4 mt-1" />
									<p>{commentCount}</p>
								</div>
							</div>
						</div>
					</div>
				</Link>
			</div>
		</>
	);
};

export default StoryCard;
