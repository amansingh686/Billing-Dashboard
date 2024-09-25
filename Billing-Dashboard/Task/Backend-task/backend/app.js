const express = require('express');
const app = express();
const errorMiddleware = require('./middleware/error');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.static('./backend/public'));

// Route Imports
const userRoute = require('./routes/userRoute');
const itemsRoute = require('./routes/itemsRoute');
const customersRoute = require('./routes/customersRoute');

app.use('/api/v1/users', userRoute);
app.use('/api/v1/items', itemsRoute);
app.use('/api/v1/customers', customersRoute);

// Middleware for Error
app.use(errorMiddleware);

module.exports = app;