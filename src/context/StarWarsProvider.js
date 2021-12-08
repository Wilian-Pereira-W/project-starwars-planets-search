import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import getStarWarsApi from '../services/apiRequest';
import StarWarsContext from './StarWarsContext';

function StarWarsProvider({ children }) {
  const [planets, setPlanet] = useState([]);
  const [newName, setNewName] = useState('');

  useEffect(() => {
    const getPlanets = async () => {
      const results = await getStarWarsApi();
      setPlanet(results);
    };
    getPlanets();
  }, []);

  const handleChange = ({ target }) => {
    setNewName(target.value);
  };

  return (
    <StarWarsContext.Provider value={ { planets, newName, handleChange } }>
      {children}
    </StarWarsContext.Provider>
  );
}

StarWarsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StarWarsProvider;
