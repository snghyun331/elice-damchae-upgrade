import { useState } from 'react';
import Calendar from 'react-calendar';
import PropTypes from 'prop-types';
import { textToIcon } from '../Util/Util';

function MyCalendar({ posts }) {
	const [value, setValue] = useState(new Date());
	const simplePost = posts.map(({ koreaCreatedAt, mood, _id }) => ({
		date: new Date(koreaCreatedAt).toISOString().split('T')[0],
		mood: textToIcon[mood],
		_id,
	}));

	const getMoodFromDate = (date) => {
		const dateString = new Date(date)
			.toLocaleDateString('ko-KR', {
				year: 'numeric',
				month: '2-digit',
				day: '2-digit',
			})
			.replaceAll('.', '-')
			.slice(0, -1)
			.replaceAll(' ', '');
		const foundMood = simplePost.find((item) => item.date === dateString);
		return foundMood ? foundMood.mood : null;
	};

	const renderTileContent = ({ date, view }) => {
		const mood = getMoodFromDate(date);
		if (view === 'month') {
			return (
				<div className="tileContentWrapper">
					<span className="text-4xl">{mood ? mood : '⚪'}</span>
				</div>
			);
		} else {
			return null;
		}
	};

	return (
		<div>
			<Calendar
				className="mt-5 p-1.5" // Add the custom CSS class to Calendar
				onChange={(newValue) => setValue(newValue)}
				value={value}
				tileContent={renderTileContent}
				formatDay={(locale, date) =>
					date.toLocaleString('en', { day: 'numeric' })
				}
				formatShortWeekday={(locale, date) =>
					date.toLocaleString('en', { weekday: 'short' })
				}
			/>
		</div>
	);
}
MyCalendar.propTypes = {
	posts: PropTypes.array.isRequired,
};

export default MyCalendar;
