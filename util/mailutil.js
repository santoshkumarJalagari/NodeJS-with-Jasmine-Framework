var MailListener = require('mail-listener2');
var fs = require('fs');
var outPut = require('../util/output');

/** The mail id from which we expect email **/
var expectedAddress = 'info@salesforcedevs.com';
/**total timeout waiting for email**/



var data = fs.readFileSync('config/mailconfig.json', 'utf8');
var mailListener = new MailListener(JSON.parse(data));

 


function start(){
  mailListener.start(); // start listening 
}

mailListener.on("server:connected", function(){
  outPut.log("Connected to the mail server to get the verification code");
});
 
mailListener.on("server:disconnected", function(){
  outPut.log("Disconnected from the mail server");
});
 
mailListener.on("error", function(err){
  outPut.log('An error occurred ' + err);
});
 


function listenForEmail(callback){
outPut.log('Waiting for verification email...');
mailListener.on("mail", function(mail, seqno, attributes){
  outPut.log('Got an incoming email');
  var from = mail.from[0].address;
  if(from.localeCompare(expectedAddress)==0){
    outPut.log('Got an email from the user ' + expectedAddress);
    var intermediateForm = mail.text.match(/Verification Code: ([^\^]+)/)[1]
    var verificationCode = /\d+/.exec(intermediateForm);
    callback(verificationCode);
  }
});
}

function stop(){
    outPut.log('disconnecting from the server');
    mailListener.stop();
}
 
 
exports.start = start;
exports.listenForEmail = listenForEmail;
exports.stop = stop;








