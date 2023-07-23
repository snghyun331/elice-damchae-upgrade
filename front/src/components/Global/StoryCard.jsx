/* eslint-disable react/prop-types */
import { ChevronRightIcon } from '@heroicons/react/24/solid';
import { Link } from'react-router-dom';
const StoryCard = ({ storyData }) => {
	return (
		<>
			<div
				className={`border border-[0.1rem] border-solid rounded-2xl pt-5 pl-5 pr-5 my-4 ms-5 relative`}
			><Link to={`/stories/${storyData.id}`}>
				<div className="flex items-center justify-center">
					<figure className="max-w-lg w-[21rem] h-[12rem] overflow-hidden">
						<img
							className="w-full h-full object-cover object-center rounded-2xl"
							src={storyData.storyImg}
							alt="image description"
							onError={(e) => {
								e.target.src =
									'https://climate.onep.go.th/wp-content/uploads/2020/01/default-image.jpg';
							}}
						/>
					</figure>
					<span className="absolute top-36 right-2 text-8xl">
						{storyData.mood}
					</span>
				</div>
				<div className="px-4 py-8 flex flex-col justify-between">
					<div>
						<h5 className="mt-2 mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
							{storyData.title.length > 32
								? `${storyData.title.slice(0, 32)}...`
								: storyData.title}
						</h5>
						<div className="text-sm text-gray-500">{storyData.username}</div>
						<p className="text-sm mb-3 font-normal text-gray-700 dark:text-gray-400">
							{storyData.content.length > 90
								? `${storyData.content.slice(0, 90)}...`
								: storyData.content}
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
