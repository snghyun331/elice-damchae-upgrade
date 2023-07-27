export const moodColors = {
	'😨': '#F1E3FF',
	'😮': '#FFFBB8',
	'😊': '#FFE3F0',
	'😢': '#ECF1FF',
	'😡': '#F9EBDE',
	'😐': '#E0E0E0',
};

export const mbtiList = [
	{ value: 'ISTJ', label: 'ISTJ' },
	{ value: 'ISFJ', label: 'ISFJ' },
	{ value: 'INFJ', label: 'INFJ' },
	{ value: 'INTJ', label: 'INTJ' },
	{ value: 'ISTP', label: 'ISTP' },
	{ value: 'ISFP', label: 'ISFP' },
	{ value: 'INFP', label: 'INFP' },
	{ value: 'INTP', label: 'INTP' },
	{ value: 'ESTP', label: 'ESTP' },
	{ value: 'ESFP', label: 'ESFP' },
	{ value: 'ENFP', label: 'ENFP' },
	{ value: 'ENTP', label: 'ENTP' },
	{ value: 'ESTJ', label: 'ESTJ' },
	{ value: 'ESFJ', label: 'ESFJ' },
	{ value: 'ENFJ', label: 'ENFJ' },
	{ value: 'ENTJ', label: 'ENTJ' },
	{ value: '미설정', label: '미설정' },
];

export const truncateString = (string, length) => {
	return string.length > length ? `${string.slice(0, length)}...` : string;
};
