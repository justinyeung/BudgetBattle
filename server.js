const express = require('express');
const connectDB = require('./config/db');
// const path = require('path');

const app = express();

connectDB();

app.use(express.json({ extended: false }));

// Define routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/competitions', require('./routes/competitions'));
app.use('/api/purchases', require('./routes/competitions'));

// temp home
// app.get('/', (req, res) => {
//     res.send("home");
// })

const PORT = process.env.PORT || 5000;
app.listen(
    PORT, 
    () => console.log(`Server started on port ${PORT}`)
);