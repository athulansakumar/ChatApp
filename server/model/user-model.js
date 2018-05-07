const mongoose = require('../db/mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

var userSchema = new mongoose.Schema({
    email: {
        required : true,
        unique: true,
        type: 'string',
        validate : {
            validator : validator.isEmail,
            message : '{VALUE} is not a valid email'
        }
    },
    firstName : {
        type: 'string',
        required : true
    },
    lastName: {
        type: 'string',
        required : true
    },
    password : {
        type: 'string',
        required : true
    },
    tokens : [{
        type :{
            type: 'string'
        },
        token:{
            type: 'string'
        }
    }]
});

userSchema.pre('save', function(next) {
  if(this.isModified('password')){
      bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(this.password, salt, (err, hash) => {
              this.password = hash;
              next();
          });
      });
  }
});

var User = mongoose.model('User',userSchema);

module.exports = {
    User
}
