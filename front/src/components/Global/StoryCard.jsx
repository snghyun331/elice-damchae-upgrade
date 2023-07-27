/* eslint-disable react/prop-types */
import { ChevronRightIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';
import { truncateString } from '../Util/Util';
import { textToMood } from '../Util/Util';

const StoryCard = ({
	data: { id, username, title, content, storyImg, mood },
}) => {
	const moodIcon = textToMood[mood.toLowerCase()] || '❓'; // fallback to question mark for unknown text

	return (
		<>
			<div
				className={`border border-[0.1rem] border-solid rounded-2xl pt-5 pl-5 pr-5 my-4 ms-5 relative`}
			>
				<Link to={`/stories/${id}`}>
					<div className="flex items-center justify-center">
						<figure className="max-w-lg w-[21rem] h-[12rem] overflow-hidden">
							<img
								className="w-full h-full object-cover object-center rounded-2xl"
								src={storyImg}
								alt="image description"
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
							<div className="text-sm text-gray-500">{username}</div>
							<p className="text-sm mb-3 font-normal text-gray-700 dark:text-gray-400">
								{truncateString(content, 100)}
							</p>
						</div>
						<div className="flex w-16 items-center text-sm font-medium text-center text-black focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 self-end">
							<ChevronRightIcon className="w-4 mt-1" />
							<span className="ml-1">더보기</span>
						</div>
					</div>
				</Link>
			</div>
		</>
	);
};

export default StoryCard;
