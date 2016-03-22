'use strict'
let jwt = require('jsonwebtoken');
let User = require(__dirname + '/../models/users_model');

module.exports = (router) => {
  router.post('/login', (req, res) => {
    let authorizationArray = req.headers.authorization.split(' ');
    let method = authorizationArray[0];
    let base64ed = authorizationArray[1];
    let authArray = new Buffer(base64ed, 'base64').toString().split(':');
    let name = authArray[0];
    let password = authArray[1];

    User.find({name: name}, (err, user) => {
      let valid = user[0].compareHash(password);
      if(!valid) {
        return res.json({status: 'failure'})
      }

      res.json({
        status: 200,
        token: user[0].generateToken()
      })
      res.end();
    })
  })
}
