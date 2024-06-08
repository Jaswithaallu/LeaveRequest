import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import LeaveRequestForm from './LeaveRequestForm';
import ViewRequests from './viewrequests';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LeaveRequestForm />} />
          <Route path="/viewrequests" element={<ViewRequests />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
