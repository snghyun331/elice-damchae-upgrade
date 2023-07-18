import { useEffect, useRef } from 'react';
import {
	Chart,
	DoughnutController,
	ArcElement,
	Tooltip,
	Legend,
} from 'chart.js';

const MyMoodStat = () => {
	const chartRef = useRef(null);

	const dummyData = {
		분노: 21,
		당황: 7,
		기쁨: 44,
		슬픔: 19,
		중립: 12,
	};

	useEffect(() => {
		Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

		const chart = new Chart(chartRef.current, {
			type: 'doughnut',
			data: {
				labels: Object.keys(dummyData),
				datasets: [
					{
						data: Object.values(dummyData),
						backgroundColor: [
							'#FF6B6B',
							'#FDB922',
							'#45CE30',
							'#1DACFF',
							'#868E96',
						],
						hoverOffset: 4,
					},
				],
			},
			options: {
				responsive: true,
				plugins: {
					legend: {
						position: 'bottom',
					},
				},
			},
		});

		return () => {
			chart.destroy();
		};
	}, []);

	return (
		<div className="block w-56 p-7 pb-10 bg-slate-50 border border-gray-200 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 flex flex-col items-center justify-center">
			<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
				나의 감정 통계
			</h5>
			<div>
				<canvas ref={chartRef} width="250" height="250"></canvas>
			</div>
		</div>
	);
};

export default MyMoodStat;
