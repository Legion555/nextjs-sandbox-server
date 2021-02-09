const router = require('express').Router();
const User = require('../models/User');

//create album
router.put('/create', async (req,res) => {
  User.updateOne(
      { _id: req.body.userId },
      { $push: {
          albums: {
              _id: req.body.albumId,
              name: req.body.albumName
              }
          }
      },
      (err, result) => {
          if (err) {
              res.send(err);
          } else {
              res.send(result);
          }
      }
  );
})

//read all albums
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

//Delete album
router.put('/delete', async (req,res) => {
  User.updateOne(
    { _id: req.body.userId },
    { $pull: { albums: {_id: req.body.albumId}}}, 
        {multi: true},
    function(err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
})


module.exports = router