import { useState } from 'react';
import Calendar from 'react-calendar';
import PropTypes from 'prop-types';

function MyCalendar({ dateMoodData }) {
	const [value, setValue] = useState(new Date());

	const getMoodFromDate = (date) => {
		const dateString = date.toISOString().split('T')[0];
		const foundMood = dateMoodData.find((item) => item.date === dateString);
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
				className="mt-5" // Add the custom CSS class to Calendar
				onChange={(newValue) => setValue(newValue)}
				value={value}
				tileContent={renderTileContent}
				formatDay={(locale, date) =>
					date.toLocaleString('en', { day: 'numeric' })
				}
				formatShortWeekday={(
					locale,
					date, // Add this prop for customizing weekday names
				) => date.toLocaleString('en', { weekday: 'short' })}
			/>
		</div>
	);
}
MyCalendar.propTypes = {
	dateMoodData: PropTypes.array.isRequired,
};

export default MyCalendar;
