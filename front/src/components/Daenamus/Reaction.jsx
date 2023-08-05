import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const ReactionChart = () => {
	const textToColor = {
		분노: '#E57373',
		불안: '#FFEE99',
		기쁨: '#FF99CC',
		슬픔: '#99CCFF',
		놀람: '#FFCC66',
		중립: '#E0E0E0',
	};
	const mbtiTypes = [
		'ISTJ',
		'ISFJ',
		'INFJ',
		'INTJ',
		'ISTP',
		'ISFP',
		'INFP',
		'INTP',
		'ESTP',
		'ESFP',
		'ENFP',
		'ENTP',
		'ESTJ',
		'ESFJ',
		'ENFJ',
		'ENTJ',
	];

	const getRandomNumber = (min, max) =>
		Math.floor(Math.random() * (max - min + 1)) + min;

	const [series, setSeries] = useState([
		{
			name: '분노',
			data: mbtiTypes.map((mbtiType) => ({
				x: mbtiType,
				y: getRandomNumber(1, 50),
				fillColor: textToColor['분노'],
			})),
		},
		{
			name: '불안',
			data: mbtiTypes.map((mbtiType) => ({
				x: mbtiType,
				y: getRandomNumber(1, 50),
				fillColor: textToColor['불안'],
			})),
		},
		{
			name: '기쁨',
			data: mbtiTypes.map((mbtiType) => ({
				x: mbtiType,
				y: getRandomNumber(1, 50),
				fillColor: textToColor['기쁨'],
			})),
		},
		{
			name: '슬픔',
			data: mbtiTypes.map((mbtiType) => ({
				x: mbtiType,
				y: getRandomNumber(1, 50),
				fillColor: textToColor['슬픔'],
			})),
		},
		{
			name: '놀람',
			data: mbtiTypes.map((mbtiType) => ({
				x: mbtiType,
				y: getRandomNumber(1, 50),
				fillColor: textToColor['놀람'],
			})),
		},
		{
			name: '중립',
			data: mbtiTypes.map((mbtiType) => ({
				x: mbtiType,
				y: getRandomNumber(1, 50),
				fillColor: textToColor['중립'],
			})),
		},
	]);

	const options = {
		legend: {
			show: true,
		},
		chart: {
			height: 350,
			type: 'treemap',
			toolbar: {
				tools: {
					download: false,
				},
			},
		},
		title: {
			text: 'MBTI 유형별 반응',
			align: 'center',
		},
		colors: Object.values(textToColor),
	};

	return (
		<div className="m-10">
			<div>
				<ReactApexChart
					options={options}
					series={series}
					type="treemap"
					height={350}
				/>
			</div>
		</div>
	);
};

export default ReactionChart;
