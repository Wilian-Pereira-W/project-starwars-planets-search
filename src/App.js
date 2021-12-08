import React from 'react';
import './App.css';
import Table from './components/Table';
import StarWarsProvider from './context/StarWarsProvider';

function App() {
  return (
    <StarWarsProvider>
      <div>
        <Table />
      </div>
    </StarWarsProvider>
  );
}

export default App;
