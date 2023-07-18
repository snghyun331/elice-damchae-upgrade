import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function MyCalendar({ dateMoodData }) {
  const [value, setValue] = useState(new Date());

  const getMoodFromDate = (date) => {
    const dateString = date.toISOString().split('T')[0];
    const foundMood = dateMoodData.find((item) => item.date === dateString);
    return foundMood ? foundMood.mood : null;
  };

  const renderTileContent = ({ date }) => {
    const mood = getMoodFromDate(date);
    if (mood) {
      return <span>{mood}</span>;
    } else {
      return <span>{date.getDate()}</span>;
    }
  };

  const formatShortWeekday = (locale, date) => '';

  return (
    <div>
      <Calendar
        onChange={(newValue) => setValue(newValue)}
        value={value}
        tileContent={renderTileContent}
        formatShortWeekday={formatShortWeekday}
      />
    </div>
  );
}

export default MyCalendar;
