// import { useParams } from 'react-router-dom';

const StoryRead = () => {
	// console.log('스토리 리드 진입');
	// const { storyId } = useParams();
	// // //storyId를 통해 개별 게시물에 대한 조회 요청 로직 들어감.
	// console.log(storyId);
	const dummyData = {
		_id: 1,
		userId: '일순이',
		userMbti: 'INTJ',
		title: '커피가 있어 행복한 하루 ',
		content: 'Story Description 1',
		mood: '😊',
		createdAt: '2023년 7월 18일 (화)',
	};

	return (
		<div className="flex justify-center">
			<div className="w-4/5 max-w-2xl bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mx-auto">
				<div className="relative h-48 overflow-hidden rounded-t-lg">
					<img
						className="w-full h-full object-cover"
						src="https://picsum.photos/200/300"
						alt=""
					/>
					<div className="absolute inset-0 bg-black opacity-60"></div>

					<div className="absolute top-1 left-1 p-4 z-10 max-w-md">
						<p className="text-white mb-1">{dummyData.createdAt}</p>
						<h5 className="leading-loose text-white text-2xl font-bold">
							{dummyData.title}
						</h5>
					</div>
					<div className="text-sm text-end absolute top-1 right-1 m-4">
						<p className="text-white mb-1">조회 123</p>
						<button className="text-white underline underline-offset-2 text-red-400">
							삭제
						</button>
					</div>
				</div>

				<div>
					<div className="relative -top-20 left-1 p-4 max-w-md">
						<span className="text-9xl">😃</span>
					</div>
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
