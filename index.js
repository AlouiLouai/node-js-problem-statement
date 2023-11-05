const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON request bodies
app.use(bodyParser.json());
// Middleware for logging
app.use(morgan('dev'));
// Import your routes
const taskRouter = require('./src/routes/task.routes');

// Use the routes
app.use('/api', taskRouter);

// Start the Express server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
