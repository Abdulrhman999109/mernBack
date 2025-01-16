// Load environment variables from .env file
require('dotenv').config();

// Import required modules
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const workoutsRouter = require('./routes/workouts');

// Initialize the Express application
const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());

// Log incoming requests
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    next();
});

// Route setup
app.use('/api/workouts', workoutsRouter);

// Get the PORT from environment variables or use default
const PORT = process.env.PORT || 4000;

// Connect to MongoDB and start the server
mongoose.connect(process.env.MONG_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Successfully connected to the database');
        app.listen(PORT, () => {
            console.log(`Server is running and listening on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Database connection failed:', error.message);
        process.exit(1); // Exit the process with failure
    });


module.exports = app;