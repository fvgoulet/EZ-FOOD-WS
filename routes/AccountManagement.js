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
    var actual_account;
    var accountCategory = req.session.account.category;

    if((req.session.account)){
        actual_account = JSON.parse(req.session.account).account;
    }
    //if(accountCategory == 0)
    //{
        res.render('accountManagement', {account: actual_account, title: 'Account Management' });
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