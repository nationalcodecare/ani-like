import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import SubItem from './SubItem';

const ScheduleItem = ({ day, titles, titleLoading }) => {
  const onItemClick = (e) => {
    e.target.classList.toggle('active');
    const accordionItemContent = e.target.nextElementSibling;
    if (e.target.classList.contains('active')) {
      accordionItemContent.style.maxHeight =
        accordionItemContent.scrollHeight + 'px';
    } else {
      accordionItemContent.style.maxHeight = 0;
    }
  };

  const renderList = () => {
    if (titleLoading) {
      return (
        <Link to="#" className="schedule__titles-item">
          <figure className="schedule__shape sceletion">&nbsp;</figure>
          <div className="sceletion sceletion__line">&nbsp;</div>
        </Link>
      );
    }

    if (titles.length === 0) {
      return <div>No titles</div>;
    }
    return titles.map((title) => <SubItem key={title._id} title={title} />);
  };

  return (
    <li className="accordion-item">
      <div onClick={onItemClick} className="accordion-item__header">
        {day}
      </div>
      <div className="accordion-item__content">
        <ul className="schedule__titles">{renderList()}</ul>
      </div>
    </li>
  );
};

ScheduleItem.propTypes = {
  day: PropTypes.string.isRequired,
  titles: PropTypes.array.isRequired,
};

export default ScheduleItem;
