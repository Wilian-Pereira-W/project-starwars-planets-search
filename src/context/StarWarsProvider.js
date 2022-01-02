import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import getStarWarsApi from '../services/apiRequest';
import StarWarsContext from './StarWarsContext';

function StarWarsProvider({ children }) {
  const [planets, setPlanet] = useState([]);
  const [newName, setNewName] = useState('');
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [newValue, setValue] = useState(0);
  const [filterByNumericValues, setfilterByNumericValues] = useState([{
    column: 'population',
    comparison: 'maior que',
    value: '100000',
  }]);
  const [planetsFilter, setPlanetFilter] = useState([]);

  useEffect(() => {
    const getPlanets = async () => {
      const results = await getStarWarsApi();
      setPlanet(results);
    };
    getPlanets();
  }, []);

  useEffect(() => {
    setfilterByNumericValues({ column, comparison, value: newValue });
    setPlanetFilter(planets.filter((nome) => nome.name.toLowerCase().includes(newName)));
  }, [column, comparison, newName, newValue, planets]);

  const handleChange = ({ target }) => {
    setNewName(target.value);
  };
  const handleClick = () => {
    if (filterByNumericValues.comparison === 'maior que') {
      setPlanetFilter(planets.filter(
        (planet) => Number(planet[filterByNumericValues.column])
       > Number(filterByNumericValues.value),
      ));
    } else if (filterByNumericValues.comparison === 'menor que') {
      setPlanetFilter(planets.filter(
        (planet) => Number(planet[filterByNumericValues.column])
       < Number(filterByNumericValues.value),
      ));
    } else {
      setPlanetFilter(planets.filter(
        (planet) => Number(planet[filterByNumericValues.column])
       === Number(filterByNumericValues.value),
      ));
    }
  };
  return (
    <StarWarsContext.Provider
      value={ { planets,
        newName,
        handleChange,
        setColumn,
        setComparison,
        setValue,
        filterByNumericValues,
        handleClick,
        planetsFilter,
        newValue,
      } }
    >
      {children}
    </StarWarsContext.Provider>
  );
}

StarWarsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StarWarsProvider;
