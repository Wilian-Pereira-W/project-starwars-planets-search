import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import getStarWarsApi from '../services/apiRequest';
import StarWarsContext from './StarWarsContext';

function StarWarsProvider({ children }) {
  const [planets, setPlanet] = useState([]);
  useEffect(() => {
    const getPlanets = async () => {
      const results = await getStarWarsApi();
      setPlanet(results);
    };
    getPlanets();
  }, []);
  return (
    <StarWarsContext.Provider value={ { planets } }>
      {children}
    </StarWarsContext.Provider>
  );
}

StarWarsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StarWarsProvider;
