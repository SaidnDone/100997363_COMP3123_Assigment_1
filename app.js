const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// Replace your MongoDB Atlas connection string here
const mongoUri = 'mongodb+srv://warstander45:comp3123@cluster0.djpgvtv.mongodb.net/comp3123_assignment1?retryWrites=true&w=majority';

// Connect to your MongoDB Atlas database
mongoose
  .connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB Atlas: ', error);
  });

// Middleware to parse JSON data
app.use(bodyParser.json());

// Include your API routes
const userRoutes = require('./routes/userRoutes');
const employeeRoutes = require('./routes/employeeRoutes');

// Use the API routes
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/emp', employeeRoutes);

// Add a test route to check the database connection
app.get('/test-db-connection', async (req, res) => {
  try {
    // Simple database query to check the connection
    const result = await mongoose.connection.db.admin().ping();
    if (result) {
      res.status(200).json({ message: 'Connected to MongoDB Atlas' });
    } else {
      res.status(500).json({ message: 'Error connecting to MongoDB Atlas' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error connecting to MongoDB Atlas' });
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }
  res.status(error.status || 500).json({ message: error.message || 'Internal server error' });
});

// Start the Express server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
