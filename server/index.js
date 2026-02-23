const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');

const app = express();

//middleware
app.use(cors({origin: 'http://localhost:3000', credentials: true}));
app.use(express.json());

//Routes 
app.use('/api/auth',authRoutes);
app.use('/api/profile',profileRoutes);

//Health check
app.get('/api/health', (req, res) => {
  res.json({ message: 'LevelMind API is running 🎮' });
});

//connect to mongodb then start server
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log('MongoDB connected');
    app.listen(PORT, () =>{
        console.log(`Server running on port ${PORT}`)
    });
})
.catch((err) => {
    console.error('MongoDB connection failed:', err.message);
});
