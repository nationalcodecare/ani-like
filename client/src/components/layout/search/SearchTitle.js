import React, { useState } from 'react';
import { connect } from 'react-redux';
import { fetchTitles } from '../../../actions/fetchTitles';

const SearchTitle = ({ fetchTitles, setSearched }) => {
  const [term, setTerm] = useState('');

  const onSearchSubmit = async (e) => {
    e.preventDefault();
    await fetchTitles(term);
    setTerm('');
    setSearched(true);
  };

  return (
    <form onSubmit={onSearchSubmit} className="search navbar__search">
      <input
        onChange={(e) => setTerm(e.target.value)}
        value={term}
        type="text"
        className="search__input"
        placeholder="Search"
      />
      <button className="search__button">
        <svg className="search__icon">
          <use
            xlinkHref={`${require('../../../styles/img/sprite.svg')}#icon-magnifying-glass`}
          ></use>
        </svg>
      </button>
    </form>
  );
};

export default connect(null, { fetchTitles })(SearchTitle);
