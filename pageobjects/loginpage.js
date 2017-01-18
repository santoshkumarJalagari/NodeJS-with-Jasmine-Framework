var page = require('./page');
var mailListener = require('../util/mailutil');
var outPut = require('../util/output');
var timeout = 30000;

var loginPage = Object.create(page, {
	userNameBox 			: 	{get : function(){return browser.element('//input[@id="username"]')}},
	passwordBox				:	{get : function(){return browser.element('//input[@id="password"]')}},
	loginButton 			: 	{get : function(){return browser.element('//input[@id="Login"]')}},
	verficationCodeBox		:	{get : function(){return browser.element('.//*[@id="emc"]')}},
	verifyButton			: 	{get : function(){return browser.element('//input[@id="save"]')}},

	open: { value : function(){
		page.open.call(this, 'https://login.salesforce.com');
	}},



	login : { value : function(username, password){
		browser.waitForExist('//input[@id="username"]', timeout);	
		this.userNameBox.setValue(username);
		this.passwordBox.setValue(password);
		this.loginButton.click();

		// Login to the page , If the email verification page is displayed then get it from mail server
		try{
			browser.waitForExist('.//*[@id="emc"]', timeout);
			outPut.log('verification code box displayed , Attempting to get the verification code from email');
			var verificationCode = this.getVerificationCode();
			outPut.log('obtained the verification code ' + verificationCode);
			this.verficationCodeBox.setValue(verificationCode);
			this.verifyButton.click();
		}catch(err){
			/*Gulp this exception, If the element did not exist , Then it means that the login proceeded witout the verification code 
			*/
		}
		try{
			browser.waitForExist('.//*[@id="Account_Tab"]/a', timeout);		
			return true;
		}catch(err){
			return false;
		}
		//return true;//remove this line when u uncomment above code
	}},

/**
	Get the verification code from the email server , Here we use the pause function to synchronise the callback completion 
	and browser execution
*/
	getVerificationCode : {value : function(){
		outPut.log('getting verification code...');
		mailListener.start();
		var emailCode;
		mailListener.listenForEmail(function(data){
			mailListener.stop();
			emailCode = data;		
		});	
		browser.pause(15000);
		return emailCode;
	}}

});

module.exports = loginPage;