import React from 'react';
import './App.css';
import Table from './components/Table';
import MyContext from './components/MyContext';

function App() {
  return (
    <MyContext.Provider>
      <div>
        <span>Hello, App!!</span>
        <Table />
      </div>
    </MyContext.Provider>
  );
}

export default App;
