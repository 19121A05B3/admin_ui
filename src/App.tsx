import React from 'react';
import './App.scss';
import AppHeader from './app-components/header';
import 'antd/dist/antd.css';
import MainDashboard from './main-dashboard';

function App() {
  return (
    <div className="App">
      <AppHeader />
      <div className='app-content'>
        <MainDashboard />
      </div>
    </div>
  );
}

export default App;
