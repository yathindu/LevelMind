const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

//Register
const register = async(req, res) => {
    try{
        const{username,email,password} = req.body;

        // check all fields
        if(!username || !email || !password ){
            return res.status(400).json({message:'All fields are required'});
        }

        //Check if user already exists
        const existingUser = await User.findOne({
            $or: [{email},{username}]
        });

        if (existingUser) {
            const field = existingUser.email === email ? 'Email':'Username';
            return res.status(400).json({message: `${field} already in use`});
        }

        //create the user
        const user = await User.create({username,email,password});

        res.status(201).json({
            message: 'Account created Successfully',
            user: user.toJSON(),
            token: generateToken(user._id)
        });
    } catch (error){
        console.error('Register error:', error);
        res.status(500).json({message:'server error during registration' })
    }
};

//Login
const login = async (req, res) =>{
    try{
        const{email, password} = req.body;

        if (!email||!password){
            return res.status(400).json({message:'Email and password are required'});
        }

        //Find user by email
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({message:'Invalid email or password'})
        }

        //check password
        const isMatch = await user.matchPassword(password);
        if(!isMatch){
            return res.status(401).json({message: 'Invalid email or password'});
        }

        res.json({
            message: 'Login Successful',
            user: user.toJSON(),
            token: generateToken(user._id)
        });

    } catch (error){
        console.error('Login error:', error);
        res.status(500).json({message: 'Server error during Login'});
    }

};

//Get current user
const getMe = async (req, res) =>{
    res.json({user: req.user});
};

module.exports = {register, login, getMe};
