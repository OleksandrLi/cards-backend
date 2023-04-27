const express = require('express');
const router = express.Router();

/* GET games. */
router.get('/', function(req, res, next) {
    res.send("games route nodemon")
});

module.exports = router;
