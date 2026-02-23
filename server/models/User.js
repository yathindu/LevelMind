const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 20
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true  
    },
    password:{
        type: String,
        required: true,
        minlength: 6
    },


    //gamer profile
    bio:{
        type: String,
        default: ''
    },

    games:[{
        name: String,
        rank: {type: String, default: 'unranked'},
        hoursplayed: {type: Number, default: 0}
    }
    ],
    playstyle:{
        type: String,
        enum: ['Aggressive','Defensive','Support','Balanced','Strategic'],
        default:'Balanced'

    },
    goals: [String],
        profileComplete:{
            type: Boolean,
            default: false
        }
    }, { timestamps:true});

//hash pasword before saving
UserSchema.pre('save', async function() {
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//Method to check password on login
UserSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

//remove password from any JSON response
UserSchema.methods.toJSON = function() {
    const obj = this.toObject();
    delete obj.password;
    return obj;
};

module.exports = mongoose.model('User', UserSchema);