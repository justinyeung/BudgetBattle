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

// TEST ROUTE
// get current user
app.get('/id', (req, res) => {
  res.send(req.session.user);
})

// Define routes
app.use('/api/fbauth', require('./routes/facebookAuth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/competitions', require('./routes/competitions'));
app.use('/api/purchases', require('./routes/competitions'));
app.use('/api/middleware', require('./routes/middleware'));

// home
// app.get('/', (req, res) => {
//     res.send("Success");
//   });

const PORT = process.env.PORT || 5000;
app.listen(
    PORT, 
    () => console.log(`Server started on port ${PORT}`)
);