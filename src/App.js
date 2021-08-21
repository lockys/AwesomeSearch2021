import React, { useState } from 'react';
import AwesomeSearch from './containers/AwesomeSearch/AwesomeSearch';
import { HashRouter } from 'react-router-dom';
import './App.css';

function App() {
  const [isDark, setIsDark] = useState(localStorage.getItem('isDark'));
  const theme = isDark ? 'dark' : '';

  return (
    <HashRouter>
      <div className={`hack ${theme}`}>
        <AwesomeSearch onThemeChange={setIsDark} />
      </div>
    </HashRouter>
  );
}
export default App;
