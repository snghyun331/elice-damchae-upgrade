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
			return <div className='text-4xl'>{mood ? <span>{mood}</span> : <span>⚪</span>}</div>;
		} else {
			return null;
		}
	};

	return (
		<div>
			<Calendar
				className="hide-dates" // Add the custom CSS class to Calendar
				onChange={(newValue) => setValue(newValue)}
				value={value}
				tileContent={renderTileContent}
				formatDay={(locale, date) =>
					date.toLocaleString('en', { day: 'numeric' })
				}
			/>
		</div>
	);
}
MyCalendar.propTypes = {
	dateMoodData: PropTypes.array.isRequired,
};

export default MyCalendar;
