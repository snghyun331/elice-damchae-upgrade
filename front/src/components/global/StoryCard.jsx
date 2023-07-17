import { ChevronRightIcon } from '@heroicons/react/24/solid';

const StoryCard = () => {
	return (
		<>
			<div
				className={`border border-[0.1rem] border-solid rounded-2xl pt-5 pr-5 pl-5 my-4 ms-5 relative`}
			>
				<div className="flex items-center justify-center">
					<figure className="max-w-lg w-[21rem] h-[16rem] overflow-hidden">
						<img
							className="w-full h-full object-cover object-center rounded-2xl"
							src="https://i.insider.com/60638bd66183e1001981966a?width=1136&format=jpeg"
							alt="image description"
							onError={(e) => {
								e.target.src =
									'https://climate.onep.go.th/wp-content/uploads/2020/01/default-image.jpg';
							}}
						/>
					</figure>
          <span className="absolute top-48 right-0 text-8xl">😊</span>
				</div>
				<div className="px-4 py-8 flex flex-col justify-between">
					<div>
						<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
							오늘은 매우 기쁜 하루였어요
						</h5>
						<div className="text-sm text-gray-500">
							대머리독수리
						</div>
						<p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
							그는 일각에서 제기되는 총선 출마설을 의식한 듯 저의 미래에 대하여
							근거 없는 상상과 추측으로 소설을 쓰는 분들이 많다며.
						</p>
					</div>
					<div className="flex w-16 items-center text-sm font-medium text-center text-black focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 self-end">
						<ChevronRightIcon className="w-4 mt-1" />
						<span className="ml-1">더보기</span>
					</div>
				</div>
			</div>
		</>
	);
};

export default StoryCard;
