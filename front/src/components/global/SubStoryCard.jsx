const StoryCard1 = () => {
	return (
		<>
			<a
				target="_blank"
				rel="noopener noreferrer"
				className="my-5 flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row  hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
			>
				<img
					className="object-cover w-full h-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
					src={
						'https://climate.onep.go.th/wp-content/uploads/2020/01/default-image.jpg'
					}
					alt=""
				/>
				<div className="flex flex-col justify-between p-4 leading-normal">
					<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
						제목
					</h5>
					<p className="mb-3 font-normal text-xl text-gray-700 dark:text-gray-400">
						안녕하세요. 토리입니다. 오늘은 아메리칸 항공 마일리지, A어드벤티지
						(AAdvantage)에 대해 알아보겠습니다. 특히 원월드를 비롯한 아메리칸
						항공과 제휴한 항공사가 많으니 대한항공과 아시아나와 다른 항공사 탑승
						기회와 다양한 여행지...
					</p>
				</div>
			</a>
		</>
	);
};

export default StoryCard1;
