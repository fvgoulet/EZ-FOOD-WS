var nodemailer = require("nodemailer");

function MailSender()
{
    /*this.smtpTransport = nodemailer.createTransport(
        {
            host : "smtp.googlemail.com",              // smtp server hostname
            port : "587",                     // smtp server port
            ssl: true,
            domain : "localhost",            // domain used by client to identify itself to server
            to : "alex-reid@live.ca",
            from : 'ez.food.qc@gmail.com',
            subject : 'My Subject',
            body: 'Blah\nBlah\nBlah.',
            authentication : "login",        // auth login is supported; anything else is no auth
            username : 'ez.food.qc@gmail.com',
            password : 'ez-food-qc'
    });*/

    this.smtpTransport = nodemailer.createTransport("SMTP",{
        service: "Gmail",
        auth: {
            user: "ez.food.qc@gmail.com",
            pass: "ez-food-qc"
        }
    });
    this.sendMail2 = function(client_name, client_email, subject, content)
    {
/*        var pony = require('pony');

        var mail = pony({
            host : 'smtp.gmail.com',
            port : 465,
            from : 'ez.food.qc@gmail.com',
            to : 'alex-reid@live.ca'
        });
        mail.setHeader('content-type', 'text/plain');
        mail.setHeader('subject', 'greetings');
        mail.end('oh hello');

*/
        var mailOptions = {
            from: "Fred Foo :heavy_check_mark: <foo@blurdybloop.com>", // sender address
            to: "alex-reid@live.ca", // list of receivers
            subject: "Hello :heavy_check_mark:", // Subject line
            text: "Hello world :heavy_check_mark:", // plaintext body
            html: "<b>Hello world :heavy_check_mark:</b>" // html body
        }
        this.smtpTransport.sendMail(mailOptions, function(error, response){
            if(error){
                console.log(error);
            }else{
                console.log("Message sent: " + response.message);
            }

            // if you don't want to use this transport object anymore, uncomment following line
            //smtpTransport.close(); // shut down the connection pool, no more messages
        });
        /*this.smtpTransport.sendMail(
            {
            from: "EZ-Food <ez.food.qc@gmail.com>",
            to: "Alex Reid <alex-reid@live.ca>",
            subject: "sub",
            text: "content"
        }, function(error, response)
            {
            if(error)
            {
                console.log(error);
            }else{
                console.log("Message sent: " + response.message);
            }
        });*/

    };
}

module.exports.MailSender = MailSender;