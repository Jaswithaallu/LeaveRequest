import mysql from 'mysql';
import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: 'password',
  database: 'leave_request'
});

// GET method to fetch leave request
app.get('/leave_request', (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error getting database connection:', err);
      return res.status(500).json({ error: err });
    }

    const sql = 'SELECT * FROM leave_request';
    connection.query(sql, (queryError, data) => {
      connection.release();
      if (queryError) {
        console.error('Error executing SQL query:', queryError);
        return res.status(500).json({ error: 'Internal server error' });
      }
      return res.json(data);
    });
  });
});

// POST method to create a new leave request
app.post('/leave_request', (req, res) => {
  const { startdate, enddate, typeofleave, approvedby } = req.body;
  console.log('Request body:', req.body);

  const sql = 'INSERT INTO leave_request (startdate, enddate, typeofleave, approvedby) VALUES (?, ?, ?, ?)';
  pool.query(sql, [startdate, enddate, typeofleave, approvedby], (err, result) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    return res.status(201).json({ message: 'Leave request submitted successfully' });
  });
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
