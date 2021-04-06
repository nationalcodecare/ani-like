import React from 'react';
import PropTypes from 'prop-types';
// Components
import ScheduleItem from './ScheduleItem';

const ScheduleList = ({ titles, titleLoading }) => {
  const renderItems = () => {
    const onGoings = titles.filter((el) => el.onGoing.emitting);
    const days = [
      { giveMe: 'monday', titles: [] },
      { giveMe: 'tuesday', titles: [] },
      { giveMe: 'wednesday', titles: [] },
      { giveMe: 'thursday', titles: [] },
      { giveMe: 'friday', titles: [] },
      { giveMe: 'saturday', titles: [] },
      { giveMe: 'sunday', titles: [] },
    ];

    const result = days.map((day) => {
      onGoings.forEach((title) => {
        if (day.giveMe.toLowerCase() === title.onGoing.day.toLowerCase()) {
          day.titles.push(title);
        }
      });
      return day;
    });

    return result.map((el) => (
      <ScheduleItem key={el.giveMe} day={el.giveMe} titles={el.titles} titleLoading={titleLoading} />
    ));
  };

  return (
    <div className="schedule">
      <h2 className="schedule__header">Schedule</h2>
      <ul data-testid="accordion" className="accordion">{renderItems()}</ul>
    </div>
  );
};

ScheduleList.propTypes = {
  titles: PropTypes.array.isRequired
}

export default ScheduleList;
