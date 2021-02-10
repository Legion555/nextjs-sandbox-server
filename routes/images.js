const router = require('express').Router();
const User = require('../models/User');
const verify = require('./verifyToken');

//add images to album
router.put('/add', verify, async (req,res) => {
    User.updateOne(
        { _id: req.body.userId, 'albums._id': req.body.albumId },
        { $push: {
            'albums.$.images': {
                _id: req.body._id,
                name: req.body.name,
                url: req.body.url
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
//Delete image
router.put('/delete', verify, async (req,res) => {
    User.updateOne(
        { _id: req.body.userId, 'albums._id': req.body.albumId },
        { $pull: {
          'albums.$.images': { 
              _id: req.body.imageId}
            } 
        },
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