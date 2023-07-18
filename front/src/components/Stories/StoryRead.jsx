// import { useParams } from 'react-router-dom';

const StoryRead = () => {
	console.log('스토리 리드 진입');
	// const { storyId } = useParams();
	// //storyId를 통해 개별 게시물에 대한 조회 요청 로직 들어감.
	// console.log(storyId);
	// const dummyData = [
	// 	{
	// 		_id: 1,
	// 		userId: '일순이',
	// 		userMbti: 'INTJ',
	// 		title: 'Story Title 1',
	// 		content: 'Story Description 1',
	// 		mood: '😊',
	// 		createdAt: '2023-07-18',
	// 	},
	// 	{
	// 		_id: 2,
	// 		userId: '일순이',
	// 		userMbti: 'INTJ',
	// 		title: 'Story Title 2',
	// 		content: 'Story Description 2',
	// 		mood: '😊',
	// 		createdAt: '2023-07-18',
	// 	},
	// ];

	return (
		<div className="flex justify-center">
			<div className="w-3/5 max-w-lg bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mx-auto">
				<a href="#">
					<div className="relative h-32 overflow-hidden rounded-t-lg">
						<img
							className="absolute inset-0 w-full h-full object-cover"
							src="https://picsum.photos/200/300"
							alt=""
						/>
						<div className="absolute inset-0 bg-black opacity-70"></div>
					</div>
				</a>
				<div className="p-5">
					<div className="absolute top-0 left-0 m-4">
						<p className="text-white mb-1">2023-04-01</p>
						<h5 className="text-white text-lg font-bold">
							Noteworthy technology acquisitions 2021
						</h5>
					</div>
					<div className="absolute top-0 right-0 m-4">
						<p className="text-white mb-1">조회수: 123</p>
						<button className="text-white">삭제</button>
					</div>
					<div className="flex items-center justify-center h-16">
						<span className="text-6xl">😊</span>
					</div>
					<a href="#">
						<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
							Noteworthy technology acquisitions 2021
						</h5>
					</a>
					<p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
						Here are the biggest enterprise technology acquisitions of 2021 so
						far, in reverse chronological order.
					</p>
					<a
						href="#"
						className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
					>
						Read more
						<svg
							className="w-3.5 h-3.5 ml-2"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 14 10"
						>
							<path
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M1 5h12m0 0L9 1m4 4L9 9"
							/>
						</svg>
					</a>
				</div>
			</div>
		</div>
	);
};

export default StoryRead;
