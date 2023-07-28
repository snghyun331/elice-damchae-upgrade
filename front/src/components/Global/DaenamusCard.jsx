import { Link } from 'react-router-dom';
import { ChevronRightIcon } from '@heroicons/react/24/solid';
import { truncateString } from '../Util/Util';
const DaenamusCard = ({ postId }) => {
	// 가상의 게시글 데이터를 대신하여 실제 데이터를 사용해야 합니다.
	const post = {
		id: postId,
		title: '게시글 제목',
		content:
			'제가 10년 넘게 아는친구가 구구절절 안녕하세요 정말 감동이지 않나요 그런데 내용은 이러이러하고 저러저러했는데 여러분 생각..제가 10년 넘게 아는친구가 구구절절 안녕하세요 정말 감동이지 않나요 그런데 내용은 이러이러하고 저러저러했는데 여러분 생각..제가 10년 넘게 아는친구가 구구절절 안녕하세요 정말 감동이지 않나요 그런데 내용은 이러이러하고 저러저러했는데 여러분 생각..제가 10년 넘게 아는친구가 구구절절 안녕하세요 정말 감동이지 않나요 그런데 내용은 이러이러하고 저러저러했는데 여러분 생각..제가 10년 넘게 아는친구가 구구절절 안녕하세요 정말 감동이지 않나요 그런데 내용은 이러이러하고 저러저러했는데 여러분 생각..',
		author: '작성자',
		views: 100,
		likes: 50,
		dislikes: 10,
	};

	return (
		<div className="rounded-xl h-full">
			{/* 클릭 시 해당 카드의 상세 페이지로 이동하는 Link 컴포넌트로 감싸기 */}
			<Link to={`/daenamus/${post.id}`}>
				<div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700">
					<span className="-ml-3 text-6xl">😊</span>
					<a href="#">
						<h5 className="mt-5 mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
							친구가 편지를 써줬어요{' '}
							<span className="text-base text-blue-600">(23)</span>
						</h5>
					</a>
					<p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
						{truncateString(post.content, 50)}
					</p>

					<div className="flex w-16 items-center text-xs font-medium text-center text-black focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-auto self-end pt-4">
						<ChevronRightIcon className="w-4 mt-1" />
						<span className="ml-1">더보기</span>
					</div>
				</div>
			</Link>
		</div>
	);
};

export default DaenamusCard;
