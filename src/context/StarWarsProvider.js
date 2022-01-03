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
    newValue: 0,
  }]);
  const [planetsFilter, setPlanetFilter] = useState([]);
  const [selectFilter, setSelectFilter] = useState(['population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water']);

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

  const notRepeatFilter = (colum) => {
    const newSelectFilter = selectFilter.filter((select) => select !== colum);
    setSelectFilter(newSelectFilter);
  };
  const handleClick = () => {
    if (filterByNumericValues.comparison === 'maior que') {
      setPlanetFilter(planets.filter(
        (planet) => Number(planet[filterByNumericValues.column])
       > Number(filterByNumericValues.value),
      ));
      notRepeatFilter(filterByNumericValues.column);
    } else if (filterByNumericValues.comparison === 'menor que') {
      setPlanetFilter(planets.filter(
        (planet) => Number(planet[filterByNumericValues.column])
       < Number(filterByNumericValues.value),
      ));
      notRepeatFilter(filterByNumericValues.column);
    } else {
      setPlanetFilter(planets.filter(
        (planet) => Number(planet[filterByNumericValues.column])
       === Number(filterByNumericValues.value),
      ));
      notRepeatFilter(filterByNumericValues.column);
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
        selectFilter,
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
