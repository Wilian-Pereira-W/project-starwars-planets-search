import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function Table() {
  const {
    newName,
    handleChange,
    setColumn,
    setComparison,
    setValue,
    handleClick,
    newValue,
    planetsFilter,
    selectFilter,
  } = useContext(StarWarsContext);
  return (
    <div>
      <form>
        <label htmlFor="name">
          <input
            type="text"
            id="name"
            data-testid="name-filter"
            value={ newName }
            onChange={ handleChange }
          />
        </label>
      </form>
      <form>

        <label htmlFor="column-filter">
          <select
            data-testid="column-filter"
            id="column-filter"
            onChange={ (event) => setColumn(event.target.value) }
          >
            { selectFilter.map((option) => (
              <option key={ option } value={ option }>{option}</option>
            ))}
          </select>

        </label>
        <label htmlFor="comparison-filter">
          <select
            data-testid="comparison-filter"
            id="comparison-filter"
            onChange={ (event) => setComparison(event.target.value) }
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </label>
        <label htmlFor="value-filter">
          <input
            data-testid="value-filter"
            type="number"
            id="value-filter"
            value={ newValue }
            onChange={ (event) => setValue(event.target.value) }
          />
        </label>
        <button
          type="button"
          data-testid="button-filter"
          onClick={ handleClick }
        >
          Filtrar

        </button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>

          {planetsFilter.map((planet) => (
            <tr key={ planet.name }>
              <td>{ planet.name }</td>
              <td>{ planet.rotation_period}</td>
              <td>{ planet.orbital_period }</td>
              <td>{ planet.diameter }</td>
              <td>{ planet.climate}</td>
              <td>{ planet.gravity }</td>
              <td>{ planet.terrain }</td>
              <td>{ planet.surface_water}</td>
              <td>{ planet.population }</td>
              <td>{ planet.films }</td>
              <td>{ planet.created }</td>
              <td>{ planet.edited }</td>
              <td>{ planet.url }</td>
            </tr>))}
        </tbody>
      </table>
    </div>);
}

export default Table;
