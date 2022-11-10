import React from 'react';
import logo from './logo.svg';
import './App.css';
import Users from './components/dashboard/Users';
import Topbar from './components/reusable/Topbar/Topbar';

function App() {
  return (
    <div className="App">
      <Topbar />
      <h1>All Users</h1>
      <Users />

    </div>
  );
}

export default App;
