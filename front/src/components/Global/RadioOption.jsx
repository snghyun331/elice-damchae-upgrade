import useStoryStore from '../../store/useStoryStore';

const RadioOption = ({
	id,
	value,
	name,
	label,
	selectedOption,
	setSelectedOption,
}) => {
	const { setThumbnail, localThumbnail, stableThumbnail } = useStoryStore();

	const handleOptionChange = () => {
		setSelectedOption(value);

		// 선택된 값을 기준으로 setThumbnail 함수 호출
		if (value === 'local-thumbnail') {
			setThumbnail(localThumbnail);
		} else if (value === 'stable-thumbnail') {
			setThumbnail(stableThumbnail);
		}
	};

	return (
		<div className="mb-10 flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
			<input
				id={id}
				value={value}
				name={name}
				onChange={handleOptionChange}
				type="radio"
				className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
			/>
			<label
				htmlFor="bordered-radio-1"
				className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
			>
				{label}
			</label>
		</div>
	);
};

export default RadioOption;
