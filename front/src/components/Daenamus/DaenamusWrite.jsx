import { useMemo } from 'react';
import useStoryStore from '../../store/useStoryStore';
import DaenamuTextEditor from './DaenamuTextEditor';
import { postApi } from '../../services/api';

const DaenamusWrite = () => {
	const { title, content, mood } = useStoryStore();

	const isFormValid = useMemo(
		() => title && content && mood,
		[title, content, mood],
	);

	const postForest = async (e) => {
		e.preventDefault();

		try {
			const post = { title, content, mood };

			const response = await postApi('forest', post);
			console.log(response.data);
			setTimeout(() => {
				window.location.href = '/daenamus';
			}, 50);
		} catch (e) {
			console.error(e);
		}
	};
	return (
		<>
			<header>{/* 헤더 컴포넌트 */}</header>

			<div className="container mx-auto px-4">
				<h2 className="text-3xl font-bold mb-4">글쓰기</h2>

				<div className="mt-8">
					<DaenamuTextEditor />
					<div className="mt-3 justify-end flex flex-col">
						<button
							disabled={!isFormValid}
							onClick={postForest}
							type="button"
							className="w-40 self-end bg-blue-700 disabled:bg-neutral-300 text-white font-medium rounded-md text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
						>
							작성 완료
						</button>
						{!isFormValid && (
							<p className="self-end text-red-500 text-xs">
								빈 칸을 채워주세요.
							</p>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default DaenamusWrite;
