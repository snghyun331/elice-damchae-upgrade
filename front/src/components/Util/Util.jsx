export const textToColor = {
	insecure: '#F1E3FF',
	surprise: '#FFFBB8',
	happy: '#FFE3F0',
	sad: '#ECF1FF',
	angry: '#F9EBDE',
	neutral: '#E0E0E0',
};

// TODO : pleasure-기쁨, sad-슬픔, insecure(불안), anger(분노), neutral(중립), surprise(놀람) 으로 변경 예정.
export const textToIcon = {
	insecure: '😨',
	surprise: '😮',
	happy: '😊',
	sad: '😢',
	angry: '😡',
	neutral: '😐',
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

export const removeTag = (string) => {
	return string.replace(/<[^>]*>?/g, '');
};
