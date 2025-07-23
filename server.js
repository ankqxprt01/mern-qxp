const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
dotenv.config();
const PORT = process.env.PORT;
const path = require("path")

// const addTestUser = require('./utils/seedUsers');
app.use(express.json());


connectDB();

app.use(cors());

app.get('/', (req, res) => res.send('API Running'));

const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes); //

// static files
app.use(express.static(path.join(__dirname,'./frontend/build')))

app.get("*",function(req,res){
    res.sendFile(path.join(__dirname,'./frontend/build/index.html'))
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
