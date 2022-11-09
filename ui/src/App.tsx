import React from 'react';
import logo from './logo.svg';
import './App.css';
import Users from './components/dashboard/Users';

function App() {
  return (
    <div className="App">
      <h1>All Users</h1>
      <Users />
    </div>
  );
}

export default App;
