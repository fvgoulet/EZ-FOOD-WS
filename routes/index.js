var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    var account;

    if((req.session.account)){
        account = JSON.parse(req.session.account).account;
    }
    console.log("Connected Account :");
    console.log(account);

    res.render('index', {account: account});
});

/* GET home page. */
router.get('/disconnect', function(req, res) {
    req.session.destroy();
    res.redirect('/' );
});

module.exports = router;
