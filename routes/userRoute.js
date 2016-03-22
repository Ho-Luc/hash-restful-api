'use strict'
let User = require(__dirname + '/../models/users_model');

module.exports = (apiRouter) => {
  apiRouter.route('/createUser')
    .post((req, res) => {
      req.on('data', (data) => {
        req.body = JSON.parse(data);
        let newUser = new User(req.body);
        newUser.save((err, user) => {
          res.json({
            status: 200,
            data: user
          })
          res.end();
        })
      })
    })
}
