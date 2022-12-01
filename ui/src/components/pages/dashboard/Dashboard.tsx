import Graph from './Graph';

function Dashboard() {
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