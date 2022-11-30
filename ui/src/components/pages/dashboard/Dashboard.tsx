import React from 'react';
import Graph from './Graph';

const Dashboard: React.FunctionComponent = () => {
  return (
    <div className='dashboard'>
      <div className='row'>
        <div className='col-12'><Graph /></div>
      </div>
    </div>
  );
};

export default Dashboard;