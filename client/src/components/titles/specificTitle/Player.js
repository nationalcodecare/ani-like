import React from 'react';

export const Player = () => {
  return (
    <section className="player">
      <div className="player__play">
        <video
          id="my-video"
          className="video-js"
          controls
          preload="auto"
          data-setup="{}"
          style={{ width: '100%', height: '100%' }}
        >
          <source
            src={require('../../../styles/img/book-read.mp4')}
            type="video/mp4"
          />
          <p className="vjs-no-js">
            To view this video please enable JavaScript, and consider upgrading
            to a web browser that
          </p>
        </video>
      </div>
      <div className="advertisement">
        <p className="advertisement__content">Advertisement</p>
      </div>
    </section>
  );
};

export default Player;
