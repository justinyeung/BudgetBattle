const express = require('express');
const connectDB = require('./config/db');

const app = express();

connectDB();

app.use(express.json({ extended: false }));

// set express session
app.use(require("express-session")({
  secret: "Anything I want",
  resave: true,
  saveUninitialized: true
}));

// Define routes
app.use('/api/fbauth', require('./routes/facebookAuth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/competitions', require('./routes/competitions'));
app.use('/api/purchases', require('./routes/competitions'));
app.use('/api/middleware', require('./routes/middleware'));

const PORT = process.env.PORT || 5000;
app.listen(
    PORT, 
    () => console.log(`Server started on port ${PORT}`)
);