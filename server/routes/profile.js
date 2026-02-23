const express = require('express');
const router = express.Router();
const User = require('../models/User');
const{protect} = require('../middleware/auth');


//GET profile
router.get('/', protect, async(req, res) =>{
    res.json({user: req.user});
});

//setup profile after registration
router.put('/setup', protect, async(req, res) =>{
    try{
        const{bio, games, playstyle, goals} = req.body;

        const user = await User.findByIdAndUpdate(
            req.user._id,
            {
                $set:{
                    bio,
                    games,
                    playstyle,
                    goals,
                    profileComplete: true
                }
            },
            {new: true}
        );

        res.json({message: 'Profile updated', user});
    } catch(eror){
        res.status(500).json({message:'Error updating profile'});
    }
});

module.exports = router;