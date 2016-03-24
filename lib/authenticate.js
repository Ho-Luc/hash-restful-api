'use strict'

var jwt = require('jsonwebtoken');
var User = require(__dirname + '/../models/user_model');

module.exports = (req, res, next) => {
  var decoded;
  try {
    var token = req.headers.authorization.split(' ')[1];
    decoded = jwt.verify(token, process.env.SECRET || 'CHANGE ME')
  }
  catch (e) {
    return res.status(400).json({message: 'authentication error'})
  }
  User.findOne({_id: decoded._id})
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => {
      res.status(400).json({message: err})
    })
}
