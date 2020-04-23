const express = require('express');
const connectDB = require('./config/db');


const app = express();

connectDB();

app.use(express.json({ extended: false }));



// Define routes
app.use('/api/auth', require('./routes/facebookAuth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/competitions', require('./routes/competitions'));
app.use('/api/purchases', require('./routes/competitions'));

// home
app.get('/', (req, res) => {
    res.send("Success");
  })

const PORT = process.env.PORT || 5000;
app.listen(
    PORT, 
    () => console.log(`Server started on port ${PORT}`)
);