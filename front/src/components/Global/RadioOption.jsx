const RadioOption = ({ id, value, name, label, checked, onChange }) => {
	return (
		<li>
			<input
				type="radio"
				id={id}
				name={name}
				value={value}
				className="hidden peer"
				checked={checked}
				onChange={onChange}
				required
			/>
			{/* 이하 동일 */}
		</li>
	);
};

export default RadioOption;
