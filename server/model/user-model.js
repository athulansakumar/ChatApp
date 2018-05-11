const mongoose = require('../db/mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
  }else{
      next();
  }
});

userSchema.methods.verifyPassword = function(password){
    return new Promise((resolve,reject) => {
        bcrypt.compare(password, this.password, (err) => {
            if(err) return reject();
            resolve(this);
        })
    });
};

userSchema.methods.generateAuthToken = function(){
    var user  = this;
    user.tokens = user.tokens.reduce((t,v)=>{
        if(v.type!='auth')
            return t.concat([v]);
        return t;
    },[]);
    var token = jwt.sign({_id:user._id.toHexString()},'MYFCKINGSECRET').toString();
    user.tokens = user.tokens.concat([{type:'auth',token}]);
    return user.save().then(() => {
        return Promise.resolve(token);
    });
}

var User = mongoose.model('User',userSchema);

module.exports = {
    User
}
