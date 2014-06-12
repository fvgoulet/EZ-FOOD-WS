var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    var username = "";
    if((req.session.username) && (req.session.password)) {
        //res.write('Account: ' + req.session.account + '. ');
        console.log('Username: ' + req.session.username + '. ');
        console.log('Password: ' + req.session.password + '. ');
        username= req.session.username;
    }
    res.render('index', { title: 'EZ-Food', username :  username});
});

/* GET home page. */
router.get('/disconnect', function(req, res) {
    req.session.destroy();

    res.redirect('/' );
});

module.exports = router;
