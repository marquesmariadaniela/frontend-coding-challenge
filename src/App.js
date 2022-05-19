import React from 'react';
import { useEffect, useState } from 'react';
import { Service } from './Service';
import { Utils } from './Utils';

function App() {
  const [list, setList] = useState([]);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    Service.getTenants()
      .then((response) => {
        setStatus('success');
        setList(response);
      })
      .catch((error) => {
        setStatus('error');
        setError(error);
      });
  }, []);

  let content;
  if (status === 'success') {
    content = (list.map(item =>
      <tr>
        <td>{item.id}</td>
        <td>{item.name}</td>
        <td>{item.paymentStatus}</td>
        <td>{Utils.formatDate(item.leaseEndDate)}</td>
        <td>
          <button className="btn btn-danger">Delete</button>
        </td>
      </tr>
    ));
  } else if (status === 'error') {
    content = (<tr><td>{error}</td></tr>);
  } else {
    content = (<tr><td>Loading...</td></tr>);
  }

  return (
    <>
      <div className="container">
        <h1>Tenants</h1>
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <span className="nav-link active">All</span>
          </li>
          <li className="nav-item">
            <span className="nav-link">Payment is late</span>
          </li>
          <li className="nav-item">
            <span className="nav-link">Lease ends in less than a month</span>
          </li>
        </ul>
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Payment Status</th>
              <th>Lease End Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {content}
          </tbody>
        </table>
      </div>
      <div className="container">
        <button className="btn btn-secondary">Add Tenant</button>
      </div>
      <div className="container">
        <form>
          <div className="form-group">
            <label>Name</label>
            <input className="form-control" />
          </div>
          <div className="form-group">
            <label>Payment Status</label>
            <select className="form-control">
              <option>CURRENT</option>
              <option>LATE</option>
            </select>
          </div>
          <div className="form-group">
            <label>Lease End Date</label>
            <input className="form-control" />
          </div>
          <button className="btn btn-primary">Save</button>
          <button className="btn">Cancel</button>
        </form>
      </div>
    </>
  );
}

export default App;
