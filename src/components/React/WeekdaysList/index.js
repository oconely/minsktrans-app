import React from 'react';
import './WeekDaysList.css';
import './Day.css';

const WeekDaysList = ({ weekdays, Day }) => (
    <ul className="ul-reset TransportRoute__weekdays WeekDaysList">
        {weekdays.map((d, i) => 
            <Day className={`Day ${i > 4 ? 'Day_weekend' : ''}`} key={i}>
                <span className="Day__name">{d}</span>
            </Day>
        )}
    </ul>
);

export default WeekDaysList;