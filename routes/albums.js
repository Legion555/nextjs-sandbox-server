const router = require('express').Router();
const User = require('../models/User');

//Get albums by email
router.get('/', (req, res) => {
    // User.find().then(items => res.json(items));
    User.find( {email: req.query.email}, { albums: 1 },
        function(err, result) {
            if (err) {
              res.send(err);
            } else {
              res.send(result[0].albums);
            }
          })
})

module.exports = router