import React from 'react';
import AwesomeSearch from './containers/AwesomeSearch/AwesomeSearch';
import { HashRouter } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <HashRouter>
      <div className="hack">
        <AwesomeSearch />
      </div>
    </HashRouter>
  );
}
export default App;
