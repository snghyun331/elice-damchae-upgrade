import Pagination from '../Global/Pagination';
import usePagination from '../../hooks/usePagination';

const MyComments = () => {
	const dummyData = [
		{
			comment: '응원합니다 1',
			createdAt: '2023-07-18',
			originTitle: '제 말 좀 들어보세요.',
		},
		{
			comment: '응원합니다 2',
			createdAt: '2023-07-18',
			originTitle: '제 말 좀 들어보세요.',
		},
		{
			comment:
				'작년 한해 각종 사이트에서 햄버거 메뉴(drawer button)에 관해 여러 논란이 있었습니다. 그 중 대부분은 햄버거 메뉴에 대한 부정적인 의견들이 많았는데요! ',
			createdAt: '2023-07-18',
			originTitle: '제 말 좀 들어보세요.',
		},
		{
			comment: '응원합니다 3',
			createdAt: '2023-07-18',
			originTitle: '제 말 좀 들어보세요.',
		},
		{
			comment: '응원합니다 4',
			createdAt: '2023-07-18',
			originTitle: '제 말 좀 들어보세요.',
		},
		{
			comment: '정말 공감되네요. 우리 어쩌구저쩌구도 웅냥냥',
			createdAt: '2023-07-18',
			originTitle: '제 말 좀 들어보세요.',
		},
	];

	const itemsPerPage = 5;
	const {
		currentPage,
		totalPages,
		prev,
		next,
		go,
	} = usePagination(dummyData, itemsPerPage);

	return (
		<div>
			<h3 className="text-2xl text-gray-700 font-semibold">내가 쓴 댓글</h3>
			<div className="text-base mt-4 mb-4 text-gray-700">
				스토리와 대나무숲에 단 댓글 모두를 확인할 수 있어요.
			</div>

			<div className="flex justify-center mt-10">
				<ul className="w-full max-w-6xl text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
					{dummyData.map((comment) => (
						<li
							key={comment._id}
							className="text-gray-700 w-full px-6 py-3 border-b border-gray-200 dark:border-gray-600 bg-slate-100"
						>
							<span className="font-bold text-gray-900">댓글</span>{' '}
							{comment.comment}{' '}
							<span className="text-xs text-gray-400">{comment.createdAt}</span>
							<div className="mt-2" />
							<span className="font-bold text-gray-900">본문</span>{' '}
							<a
								href="/"
								className="underline underline-offset-2 text-blue-900"
							>
								{comment.originTitle}
							</a>
						</li>
					))}
				</ul>
			</div>
			<div className="flex justify-center mt-10">
			<Pagination
						currentPage={currentPage}
						totalPages={totalPages}
						prev={prev}
						next={next}
						go={go}
					/>
			</div>
		</div>
	);
};

export default MyComments;
