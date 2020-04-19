const express = require('express');
const connectDB = require('./config/db');

const app = express();

connectDB();

app.use(express.json({ extended: false }));

// Define routes
app.use('/api/users', require('./routes/users'));
app.use('/api/competitions', require('./routes/competitions'));
app.use('/api/purchases', require('./routes/competitions'));

const PORT = process.env.PORT || 5000;
app.listen(
    PORT, 
    () => console.log(`Server started on port ${PORT}`)
);