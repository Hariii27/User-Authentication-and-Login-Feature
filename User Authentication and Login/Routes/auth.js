const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../Models/User');
const auth = require('../Middleware/auth');

const router = express.Router();

const signToken = (id) => 
    jwt.sign({id} , process.env.JWT_SECRET, {
        expiresIN: process.env.JWT_EXPIRES_IN,
    });

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 

// POST  /api/auth/register
router.post('/register', async (req, res, next)=>{
    try{
        const{ name,email, password } = req.body;

        if(!name || !email || !password){
            return res.status(400).json({message:'All fields are required'});
        }
        if (!emailPattern.test(email) ){
            return res.status(400).json({message: 'Invalid email address'});
        }
        if (password.length < 8){
            return res
                .status(400)
                .json({message: 'Password must be at least 8 characters'})
        }

        const existing =  await User.findOne({ email: email.toLowerCase()});
        if(existing) {
            return res.status(409).json({ message: 'Email is already registered'});
        }

        const hashed = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashed});

        res.status(201).json({
            token: signToken(user._id),
            user: { id: user._id, name: user.name, email: user.email},
        });
    } catch (err) {
        next(err);
    }
});

// POST  /api/auth/login

router.post('/login', async (req, res, next) =>{
    try{
        const{ email , password } = req.body;

        if(!email || !password) {
            return res.status(400).json({ message: 'Email and password are required'});
        }

        const user = await User.findOne({ email: email.toLowerCase()}).select(
            '+password'
        );

        // Identical message for both failures prevents user enumeration
        const invaid = { message: 'Invaild email or password'};
        if (!user) return res.status(401).json(invalid);

        const match = await bcrypt.compare(password,user.password);
        if(!match) return res.status(401).json(invalid);

        res.json({
            token: signToken(user._id),
            user: { id: user._id, name: user.name,  email: user.email},
        });
    } catch (err) {
        next (err);
    }
});

// GET /api/auth/me (protected)

router.get('/me', auth, async (req,res,next) =>{
        try{
            const user = await User.findById(req.userId);
            if (!user) return res.status(404).json({message: 'User not Found'});
            res.json({user: {id: user._id, name: user.name, email: user.email}});
        } catch (err){
            next (err);
        }
    });

module.exports = router;    