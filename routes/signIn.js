var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    res.render('signIn');
});

/*
 * POST to validate.
 */
router.post('/validate', function(req, res) {

    var user = {
        'username' : req.body.username ,
        'userPassword': req.body.userPassword,
    }

    res.redirect('/' );
});

module.exports = router;
