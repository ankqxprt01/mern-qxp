const express = require('express');
const app = express();
require('dotenv').config()
const dbConfig = require('./config/db')
const cors = require('cors');


// const addTestUser = require('./utils/seedUsers');
app.use(express.json());

app.use(cors());

app.get('/', (req, res) => res.send('API Running'));

const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes); //

// static files
const path = require("path")
app.use(express.static(path.join(__dirname,'./client/build')))

// this is in old express
// app.get('*', function(req, res) {
//   res.sendFile(path.join(__dirname, './client/build/index.html'));
// });

// this only works in express 5
app.get(/.*/, function(req, res) {
  // res.sendFile(path.join(__dirname, './client/build/index.html'));
  console.log("Serving React frontend from:", path.join(__dirname, './client/build/index.html'));
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
