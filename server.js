const express = require('express');
const app = express();
require('dotenv').config()
const dbConfig = require('./config/db')
const PORT = process.env.PORT || 5000;
const cors = require('cors');


// const addTestUser = require('./utils/seedUsers');
app.use(express.json());

app.use(cors());

app.get('/', (req, res) => res.send('API Running'));

const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes); //

// static files
const path = require("path")
app.use(express.static(path.join(__dirname,'./frontend/build')))

// this is in old express
// app.get('*', function(req, res) {
//   res.sendFile(path.join(__dirname, './frontend/build/index.html'));
// });

// this only works in express 5
app.get(/.*/, function(req, res) {
  res.sendFile(path.join(__dirname, './frontend/build/index.html'));
});



app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
