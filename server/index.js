// Import dependencies
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import socketIO from 'socket.io';
import cors from 'cors';

// Import config
import config from './config.json';

// Environment
const env = process.env.NODE_ENV || 'development';

// Create the Express application
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Set up MongoDB connection
const mongoURL = env === 'development' ? config.development.mongoURL : config.production.mongoURL;
mongoose.connect( mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
  });

// Define your routes and APIs here using app.get(), app.post(), etc.

// Start the server
const port = process.env.port || 3000;
const server = app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

// Set up Socket.IO connection
const io = socketIO(server);

// Define your Socket.IO events here
io.on('connection', (socket) => {
    console.log('A user connected');
    
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});