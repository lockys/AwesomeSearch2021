import React from 'react';
import AwesomeSearch from './containers/AwesomeSearch/AwesomeSearch';
import { BrowserRouter } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="hack">
        <AwesomeSearch />
      </div>
    </BrowserRouter>
  );
}
export default App;
