// import { useParams } from 'react-router-dom';
import { moodColors } from "../Util/Util";
import { Link } from "react-router-dom";

const StoryRead = () => {
	// console.log('스토리 리드 진입');
	// const { storyId } = useParams();
	// // //storyId를 통해 개별 게시물에 대한 조회 요청 로직 들어감.
	// console.log(storyId);
	const dummyData = {
		_id: 1,
		username: '대머리독수리',
		userMbti: 'INTJ',
		title: '커피가 있어 행복한 하루 ',
		content:
			'김건희 여사 일가 땅 특혜 논란을 빚고 있는 서울~양평고속도로의 타당성 조사 설계업체가 지난해 5월 국토부에 제출한 타당성조사 착수보고서에서 검토계획 대상으로 강상면 종점안을 제기한 것은 어떤 외압도 없었던 자체 판단에 따른 것이라고 밝혔다. 서울~양평고속도로 타당성 용역을 맡고 있는 동해종합기술공사는 13일 경기도 양평군 강하면 운심리 주민센터에서 기자간담회를 갖고 “지난 1년간 고속도로의 경제성, 주민 수용성, 환경적 요인 등을 따져본 결과 예비타당성(예타)의 종점이었던 양서면보다 강상면이 타당하다는 중간 결론이 도출된 상황에서 지금 사태가 벌어졌다”며 “그 과정에 어떠한 외압도 없었다”고 밝혔다.',
		mood: '😊',
		createdAt: '2023년 7월 18일 (화)',
		profileImg: 'https://picsum.photos/200/300',
	};



	const moodColor = moodColors[dummyData.mood];

	return (
		<div className={`w-4/5 max-w-2xl mx-auto dark:bg-gray-800`}>
			<button
				type="button"
				className="text-blue-500 hover:text-white border border-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-4 py-1 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
			>
				<Link to="/stories">목록으로</Link>
			</button>

			<div
				className={`w-full max-w-2xl border border-gray-200 rounded-lg shadow mx-auto bg-white dark:bg-gray-800`}
				style={{ backgroundColor: moodColor }}
			>
				<div className="relative h-52 overflow-hidden rounded-t-lg">
					<img
						className="w-full h-full object-cover"
						src="https://picsum.photos/200/300"
						alt=""
					/>
					<div className="absolute inset-0 bg-black opacity-60"></div>

					<div className="ms-4 mt-4 absolute top-1 left-1 p-4 z-10 max-w-md">
						<p className="text-white mb-1">{dummyData.createdAt}</p>
						<h5 className="leading-loose text-white text-2xl font-bold">
							{dummyData.title}
						</h5>
					</div>
					<div className="text-sm text-end absolute top-1 right-1 mt-4 me-4">
						<p className="text-white mb-1">조회 123</p>
						<button className="text-white underline underline-offset-2 text-red-400">
							삭제
						</button>
					</div>
				</div>

				<div>
					<div className="relative -top-20 left-6 max-w-md">
						<span className="text-9xl">{dummyData.mood}</span>
					</div>
					<div className="-mt-12 p-14 leading-relaxed text-gray-700 dark:text-gray-400">
						{dummyData.content}
					</div>

					<div>
						<div className="w-12 h-12 mx-auto mt-6 rounded-full overflow-hidden">
							<img
								className="w-full h-full object-cover"
								src={dummyData.profileImg}
								alt="작성자 프로필 이미지"
							/>
						</div>
						<h5 className="text-center text-gray-700 mx-auto mt-2">
							{dummyData.username}
						</h5>
						<p className="text-gray-400 text-xs text-center mt-1 mb-5">
							{dummyData.userMbti}
						</p>
					</div>
					<hr className="h-px my-8 ms-8 me-8 bg-gray-300 border-0 dark:bg-gray-700" />
					<div>댓글 컴포넌트 넣을 영역</div>
				</div>
			</div>
		</div>
	);
};

export default StoryRead;
