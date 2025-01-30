import './App.css';
import React from 'react';
import {BrowserRouter, HashRouter, Route, Routes} from "react-router-dom";
import MainPage from './components/MainPage/Mainpage';

function App() {
  return (
    <HashRouter>
    <div className='App'>
      <Routes>
        <Route path= "/" element = {<MainPage />} />
      </Routes>
    </div>
    </HashRouter>
  );
}
export default App;
