import React from 'react';
import {Link} from 'react-router-dom';

const Genres = () => {
  return (
    <div className="genres">
    <div className="genre">
      <ul className="genre__list">
        <Link to="/" className="genre__link">Isekai</Link>
        <Link to="/" className="genre__link">Mecha</Link>
        <Link to="/" className="genre__link">Slice of Life</Link>
        <Link to="/" className="genre__link">Iyashikei</Link>
        <Link to="/" className="genre__link">Comedy</Link>
        <Link to="/" className="genre__link">Fantazy</Link>
        <Link to="/" className="genre__link">Sci-Fi</Link>
        <Link to="/" className="genre__link">History</Link>
        <Link to="/" className="genre__link">Shonen</Link>
        <Link to="/" className="genre__link">Seinen</Link>
        <Link to="/" className="genre__link">Ecchi</Link>
        <Link to="/" className="genre__link">Action</Link>
        <Link to="/" className="genre__link">Military</Link>
        <Link to="/" className="genre__link">Magic</Link>
        <Link to="/" className="genre__link">Romance</Link>
        <Link to="/" className="genre__link">Supernatural</Link>
      </ul>
    </div>
    <div className="genres__image">
      &nbsp;
    </div>
  </div>
  )
}

export default React.memo(Genres);