const express = require('express');
const router = express.Router();
const { Favorite } = require("../models/Favorite");

const { auth } = require("../middleware/auth");

//=================================
//             Favorite
//=================================


router.post('/favoriteNumber', auth, (req, res) => {
    Favorite.find({ "movieId": req.body.movieId })
        .exec((err, favorite) => {
            if (err) return res.status(400).send(err)
            res.status(200).json({ success: true, favoriteNumber: favorite.length })

        })
});

router.post('/favorited', auth, (req, res) => {
    Favorite.find({ "movieId": req.body.movieId, "userFrom": req.body.userFrom })
        .exec((err, favorite) => {
            if (err) return res.status(400).send(err)
            let rest = false;
            if (favorite.length != 0) {
                rest = true
            }
            res.status(200).json({ success: true, favorited: rest })

        })
});

router.post('/addtoFavorite', auth, (req, res) => {
    const fav = new Favorite(req.body);
    fav.save((err, doc) => {
        if (err) return res.json({ success: false, err })
        return res.status(200).json({ success: true })

    })
});

router.post('/removeFromFavorite', auth, (req, res) => {
    Favorite.findOneAndDelete({ movieId: req.body.movieId, userFrom: req.body.userFrom })
        .exec((err, doc) => {
            if (err) return res.status(400).json({ success: false, err })
            res.status(200).json({ success: true, doc })
        })

});

router.post('/getFavoriteMovie', (req, res) => {
    Favorite.find({ "userFrom": req.body.userFrom })
        .exec((err, favorites) => {
            if (err) return res.status(400).send(err);
            return res.status(200).json({ success: true, favorites })
        })

});

module.exports = router;
