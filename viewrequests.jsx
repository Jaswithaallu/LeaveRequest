import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// Function to format date to 'YYYY-MM-DD'
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

function ViewRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch('http://localhost:8080/leave_request');
        if (!response.ok) {
          throw new Error('Failed to fetch leave request');
        }
        const data = await response.json();
        setRequests(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="bg-white p-5">
        <div className="d-flex justify-content-between align-items-center gap-3 mb-4">
          <h3 className="me-3">Leave Requests</h3>
          <Link to="/" className="btn btn-primary">Back</Link>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Type of Leave</th>
              <th>Approved By</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request.id}>
                <td>{request.id}</td>
                <td>{formatDate(request.startdate)}</td>
                <td>{formatDate(request.enddate)}</td>
                <td>{request.typeofleave}</td>
                <td>{request.approvedby}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewRequests;
