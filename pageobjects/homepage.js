var page = require('./page');
var outPut = require('../util/output');

var pageTimeout = 30000;

var homePage = Object.create(page, {
	accountTab 				: 	{get : function(){return browser.element('.//*[@id="Account_Tab"]/a')}},
	newAccountButton		:	{get : function(){return browser.element('.//*[@id="hotlist"]/table/tbody/tr/td[2]/input')}},
	accountNameBox 			: 	{get : function(){return browser.element('//input[@id="acc2"]')}},
	saveButton 				: 	{get : function(){return browser.element('//input[@name="save"]')}},
	accountName 			: 	{get : function(){return browser.element('.topName')}},
	newContactButton 		: 	{get : function(){return browser.element('//input[@name="newContact"]')}},
	contactName 			: 	{get : function(){return browser.element('//input[@name="name_lastcon2"]')}},
	newOpportunityButton 	: 	{get : function(){return browser.element('//input[@name="newOpp"]')}},
	opportunityDropDown 	: 	{get : function(){return browser.element('#opp11')}},
	closeDate 				: 	{get : function(){return browser.element("//span[@class='dateFormat']/a")}},
	opportunityNameBox 		: 	{get : function(){return browser.element('//input[@id="opp3"]')}},
	userNameLink	 		: 	{get : function(){return browser.element('#userNavLabel')}},
	logoutLink 				:   {get : function(){return browser.element('//div[@id="userNav-menuItems"]/a[4]')}},

	createAccount: { value : function(accountName){
		this.accountTab.click();
		browser.waitForExist('.//*[@id="hotlist"]/table/tbody/tr/td[2]/input', pageTimeout);	
		this.newAccountButton.click();
		browser.waitForExist('//input[@id="acc2"]');
		this.accountNameBox.setValue(accountName);
		this.saveButton.click();
		browser.waitForExist('.topName', pageTimeout);
		return browser.getText('.topName');	
	}},

	createRandomContact : { value : function(name) {
		browser.waitForExist('//input[@name="newContact"]', pageTimeout);
		this.newContactButton.click();
		browser.waitForExist('//input[@name="name_lastcon2"]', pageTimeout);
		this.contactName.setValue(name);
		this.saveButton.click();
		browser.waitForExist('.topName', pageTimeout);
		return browser.getText('.topName');	 
	}},

	createRandomString : { value : function(length){
		var text = "";
    	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    	for( var i=0; i < length; i++ )
        	text += possible.charAt(Math.floor(Math.random() * possible.length));
    	return text;
	}},
//Closed Won
	createOpportunity : {value : function(name, state){
		browser.waitForExist('//input[@name="newOpp"]', pageTimeout);
		this.newOpportunityButton.click();
		browser.waitForExist('#opp11', pageTimeout);
		this.opportunityNameBox.setValue(name);
		browser.selectByValue('#opp11', state);
		this.closeDate.click();
		this.saveButton.click();
		browser.waitForExist('.pageDescription', pageTimeout);
		return browser.getText('.pageDescription');	
	}},

	logout : {value : function(){
		this.userNameLink.click();
		browser.waitForVisible('//div[@id="userNav-menuItems"]/a[4]', pageTimeout);
		this.logoutLink.click();
		try{
		browser.waitForExist('//input[@id="username"]', pageTimeout);
		return true;
	}catch(err){
		return false;
	}

	}}

});

module.exports = homePage;