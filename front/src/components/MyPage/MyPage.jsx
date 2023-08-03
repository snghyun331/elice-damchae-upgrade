import MyComments from './MyComments';
import MyCalendar from './MyCalendar';
import MyMainMood from './MyMainMood';
import MyMoodStat from './MyMoodStat';
import MyDaenamus from './MyDaenamus';
import MyLikedDaenamus from './MyLikedDaenamus';
import { Link } from 'react-router-dom';
import { ChevronRightIcon } from '@heroicons/react/24/solid';

const MyPage = () => {
	const dummyData = [
		{ date: '2023-07-18', mood: '😊' },
		{ date: '2023-07-19', mood: '😢' },
	];

	const myDaenamu = [
		{
			mood: '😨',
			title: '어떻게 생각하세요',
			content:
				'G AI 연구원은 전문 특허데이터 4천500만건, 이미지 텍스트 데이터 3억5천만장 등 고품질 학습데이터를 확보했다. 이 밖에도 한국어 데이터 한계 극복을 위해 한국어와 영어를 동시에 이해하고 생성할 수 있는 이중언어 모델로 개발했으며, 학습 데이터량을 이전 모델 대비 4배 이상 증가했다고 밝혔다.',
		},
		{
			mood: '😮',
			title: '쫀득쫀득 고구마말랭이',
			content:
				'원장은 "챗 GPT는 상식이나 일반적 상황을 다루지만, 는 전문지식을 생산하고 소비하는 프로슈머에 특화돼 신뢰성 있는 인사이트를 제공한다"며 "유창하게 말하는 것을 넘어서 사실적 근거를 기반으로 답변을 생산한다"고 강조했다. 또 "자사및 학계 연구원 대상 유니버스 전체 플랫폼 조사 결과 전문성과 신뢰성이 타사 서비스 대비 모두 높은 것으로 나타났다"며 "이달 중 학계와 그룹 내 AI 전문가와 연구자를 대상으로 클로즈드 베타 서비스를 오픈하고, 평가 결과를 오픈할 계획이다"고 밝혔다. ',
		},
		{
			mood: '😊',
			title: '마법의 소라고둥님',
			content:
				'G AI 연구원은 전문 특허데이터 4천500만건, 이미지 텍스트 데이터 3억5천만장 등 고품질 학습데이터를 확보했다. 이 밖에도 한국어 데이터 한계 극복을 위해 한국어와 영어를 동시에 이해하고 생성할 수 있는 이중언어 모델로 개발했으며, 학습 데이터량을 이전 모델 대비 4배 이상 증가했다고 밝혔다.',
		},
	];

	return (
		<div className="2xl:px-52">
			<h3 className="text-3xl text-gray-700 font-semibold">나의 활동</h3>
			<br />
			<hr className="my-8" />

			<div>
				<h3 className="text-2xl text-gray-700 font-semibold">내가 쓴 스토리</h3>
				<div className="text-base mt-4 mb-4 text-gray-700">
					<ChevronRightIcon className="w-4 inline mb-1" />
					<span className="inline">
						<Link to="/stories">&nbsp;전체보기</Link>
					</span>
				</div>
			</div>

			<div className="flex justify-center flex-wrap">
				<div className="flex flex-col md:flex-row">
					<div className="md:w-1/2 lg:w-1/2 px-3">
						<MyCalendar dateMoodData={dummyData} />
					</div>
					<div className="md:w-1/2 lg:w-1/2 px-3">
						<div className="md:flex md:flex-col md:h-full">
							<div className="pt-5">
								<MyMainMood />
							</div>
							<div className="pt-7">
								<MyMoodStat />
							</div>
						</div>
					</div>
				</div>
			</div>

			<hr className="my-8" />

			{/* 내가 쓴 대숲 데이터, 내가 좋아한 대숲 데이터는 3개만 가져오거나 3개로 slice 해서 아래에 넣을 것. */}
			<MyDaenamus myDaenamu={myDaenamu} />

			<hr className="my-8" />
			<MyLikedDaenamus myDaenamu={myDaenamu} />

			<hr className="my-8" />
			<MyComments />
		</div>
	);
};

export default MyPage;
