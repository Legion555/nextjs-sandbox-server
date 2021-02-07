const router = require('express').Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { loginValidation } = require('./userValidation');

//Get user by email
router.get('/', (req, res) => {
    // User.find().then(items => res.json(items));
    User.find( {email: req.query.email},
        function(err, result) {
            if (err) {
              res.send(err);
            } else {
              res.send(result[0]);
            }
          })
})

//Login user
router.post('/login', async (req,res) => {

    //Validate form
    const {error} = loginValidation(req.body);
    if(error) return res.send(error.details[0].message);

    //Check if email exists
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.send('"email" not found');

    //Validate password
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.send('"password" is invalid');

    //Create and assigning token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send('success');
})

module.exports = router