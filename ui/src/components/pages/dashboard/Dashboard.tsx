import React from 'react';
import Graph from './Graph';
import "./Dashboard.css";

const Dashboard: React.FunctionComponent = () => {
  return (
    <>
    <h1 id="dashboard" >Dashboard</h1>
    <div className='dashboard'>
        <div className='row'>
          <div className='col-12'><Graph /></div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;