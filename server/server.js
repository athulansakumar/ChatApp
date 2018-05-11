const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');

const {User} = require('./model/user-model');

const port = process.env.PORT || '8080';

const app = express();

app.use('/',express.static(`${__dirname}/../dist/chat-app`));
app.use('/',express.static(`${__dirname}/../node_modules/bootstrap/dist`));
app.use(bodyParser.json());

app.post('/signin',(req,res) => {
    var userReq = User(_.pick(req.body,['email', 'password']));
    console.log(JSON.stringify(userReq,undefined,2));
    User.findOne({email:userReq.email}).then((user) => {
        return user.verifyPassword(userReq.password);
    }).then((user) => {
        return user.generateAuthToken();
    }).then((token) => {
        res.header('x-auth',token).send({status:'ok'});
    }).catch((e) => {
        res.status(400).send({status:'error'});
    });
});

app.post('/user',(req,res) => {
    var user = User(_.pick(req.body,['firstName','lastName', 'email', 'password']));
    user.save().then(() => res.status(200).send({status:'ok'})).catch(() => res.status(200).send({status:'error'}));
});

app.listen(port, () => {
  console.log('Application is up in port',port);
});

module.exports = app;
