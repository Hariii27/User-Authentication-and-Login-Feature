require('dotenv').config();
const express = require('express');
const mongoose =  require('mongoose');
const cors = require('cors');
const authRoutes = require('./Routes/auth');

const app =  express();

app.use(cors({origin:'http://localhost:5173'}))
app.use(express.jsom());

app.use('/api/auth', authRoutes);

app.use((err,req,res,next) => {
    console.error(err);
    res.status(500).json({message:'Internal server error'});
})

mongoose
    .connect(process.env.mongo_uri)
    .then(()=>{
        console.log('MongoDb connected');
        app.listen(process.env.PORT, ()=>
            console.log('Server running on port${process.env.PORT}')
        );
    })
    .catch((err)=>{
        console.error('Database connection failed:', err.message);
        process.exit(1);
    })