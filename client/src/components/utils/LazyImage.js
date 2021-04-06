import React, { useState, useEffect } from 'react';

const LazyImage = ({ unloadedSrc, src }) => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setLoaded(true);
    };
    img.src = src;
  }, [src]);

  if (loaded) {
    console.log('Image was loaded! Returning Actual src');
    return <img src={unloadedSrc} alt="alt tag yeah" className="show__img" />;
  }
  console.log('PROCESSIN image');
  return (
    <img
      src={require('../../styles/img/ambrella-man-2.jpg')}
      alt="alr tag yeah"
      className="show__img"
    />
  );
};

export default LazyImage;
