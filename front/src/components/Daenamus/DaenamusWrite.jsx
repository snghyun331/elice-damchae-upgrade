import DaenamuTextEditor from './DaenamuTextEditor';

const DaenamusWrite = () => {
	return (
		<>
			<header>{/* 헤더 컴포넌트 */}</header>

			<div className="container mx-auto px-4">
				<h2 className="text-3xl font-bold mb-4">글쓰기</h2>

				<div className="mt-8">
					<DaenamuTextEditor />
				</div>

				<div className="mt-8 flex justify-center">
					{/* 저장 버튼과 글쓰기 관련 요소들 */}
				</div>
			</div>
		</>
	);
};

export default DaenamusWrite;
