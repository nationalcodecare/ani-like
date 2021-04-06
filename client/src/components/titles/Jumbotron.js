import React from 'react';
import PropTypes from 'prop-types';
// Components
import ScheduleList from '../layout/schedule/ScheduleList';

const Jumbotron = ({ titles, titleLoading }) => {
  return (
    <div className="jumbotron">
      <div className="anilike">
        <div className="bg-video bg-video--back">
          <video className="bg-video__content" autoPlay muted loop>
            <source
              src={require('../../styles/img/Japan - 41957.mp4')}
              type="video/mp4"
            />
            Your browser does nor support this video format
          </video>
        </div>
        <div className="anilike__text">
          <div className="anilike__header">aniLike</div>
          <div className="anilike__par">Place, where you can take a rest.</div>
        </div>
      </div>
      <ScheduleList titles={titles} titleLoading={titleLoading} />
    </div>
  );
};

Jumbotron.propTypes = {
  titles: PropTypes.array.isRequired,
  titleLoading: PropTypes.bool.isRequired,
};

export default Jumbotron;
