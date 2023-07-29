import moment from 'moment';

export const textToColor = {
	insecure: '#F1E3FF',
	surprise: '#FFFBB8',
	pleasure: '#FFE3F0',
	sad: '#ECF1FF',
	anger: '#F9EBDE',
	neutral: '#E0E0E0',
};

export const textToIcon = {
	insecure: '😨',
	surprise: '😮',
	pleasure: '😊',
	sad: '😢',
	anger: '😡',
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

export const formatDate = (string) => {
	const date = moment(string);
	const formattedDate = date.format('YYYY년 MM월 DD일');
	return formattedDate;
};

export const formatCreatedAt = (string) => {
	const formattedTime = moment(string).format('YYYY-MM-DD HH:mm');
	return formattedTime;
};

export const formatRelativeTime = (string) => {
	const now = moment();
	const date = moment(string);

	const duration = moment.duration(now.diff(date));
	const daysElapsed = duration.asDays();

	if (duration.asSeconds() < 60) {
		return '방금';
	} else if (duration.asMinutes() < 60) {
		return `${Math.floor(duration.asMinutes())}분 전`;
	} else if (duration.asHours() < 24) {
		return `${Math.floor(duration.asHours())}시간 전`;
	} else if (daysElapsed <= 3) {
		return `${Math.floor(daysElapsed)}일 전`;
	} else {
		return date.format('YYYY-MM-DD');
	}
};
