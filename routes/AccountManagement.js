/**
 * Created by Félix on 2014-06-25.
 */
var express = require('express');
var router = express.Router();
var Account = require('../public/Utilities/Account');
/*
 * GET .
 */
router.get('/', function(req, res)
{
    var accountCategory = req.session.account.category;
    //if(accountCategory == 0)
    //{
        res.render('accountManagement', { title: 'Account Management' });
    //}
    //else
    //{
        //res.render('inaccessiblePage', { title: 'Inaccessible Page' });
    //}
});

router.post('/getAccounts', function(req,res) {
    Account.getAllAccounts(function (err, accounts) {
        if (err)
        {
            console.log(err);
        }
        else
        {
            res.send(accounts);
        }
    });
});

module.exports = router;