var nodemailer = require("nodemailer");


function MailSender()
{
    this.sendMail = function(client_name, client_email, subject, content)
    {
        var smtpTransport = nodemailer.createTransport("SMTP",{
            service: "Gmail",
            auth: {
                user: "ez.food.qc@gmail.com",
                pass: "ez-food-qc"
            }
        });

        smtpTransport.sendMail({  //email options
            from: "EZ-Food <ez.food.qc@gmail.com>",
            to: client_name + "<" + client_email + ">",
            subject: subject,
            text: content
        }, function(error, response){
            if(error){
                console.log(error);
            }else{
                console.log("Message sent: " + response.message);
            }

            smtpTransport.close(); // shut down the connection pool, no more messages.  Comment this line out to continue sending emails.
        });

    };
}

module.exports.MailSender = MailSender;