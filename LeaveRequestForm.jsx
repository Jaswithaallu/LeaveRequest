import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function LeaveRequestForm() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [leaveType, setLeaveType] = useState('');
  const [approvedBy, setApprovedBy] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch('http://localhost:8080/leave_request', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        startdate: startDate,
        enddate: endDate,
        typeofleave: leaveType,
        approvedby: approvedBy
      }),
    });

    if (response.ok) {
      console.log('Request sent successfully');
      navigate('/viewrequests');
    } else {
      console.error('Error sending request');
    }
  };

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="bg-white p-5">
        <div className="d-flex justify-content-between align-items-center gap-3">
          <h3 className="me-3">LEAVE REQUEST FORM</h3>
          <Link to="/viewrequests" className="btn btn-primary">View Requests</Link>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="startDate" className="form-label"><h6>Start:</h6></label>
            <input
              type="date"
              className="form-control"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
            <label htmlFor="endDate" className="form-label"><h6>End:</h6></label>
            <input
              type="date"
              className="form-control"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="leaveType" className="form-label"><h6>Type of Leave:</h6></label>
            <select
              className="form-control"
              id="leaveType"
              value={leaveType}
              onChange={(e) => setLeaveType(e.target.value)}
              required
            >
              <option value="">Select Leave Type</option>
              <option value="sick">Sick Leave</option>
              <option value="planned">Planned Leave</option>
              <option value="unplanned">Unplanned Leave</option>
            </select>
          </div>
          <div className="form-group mb-3">
            <label htmlFor="approvedBy" className="form-label"><h6>Approved By:</h6></label>
            <select
              className="form-control"
              id="approvedBy"
              value={approvedBy}
              onChange={(e) => setApprovedBy(e.target.value)}
              required
            >
              <option value="">Select Approver</option>
              <option value="Jhansi">Jhansi</option>
              <option value="Praveen">Praveen</option>
              <option value="Uday Kiran">Uday Kiran</option>
            </select>
          </div>
          <div className="mt-3 d-flex justify-content-center align-items-center">
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LeaveRequestForm;
