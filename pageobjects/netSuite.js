var page = require('./page');
var outPut = require('../util/output');

var netSuiteAuto = Object.create(page, {

/** The Login Page elements **/
loginField                       		 : {get : function(){ return browser.element('.//*[@id="userName"]')}},
passwordField                     		 : {get : function(){ return browser.element('//input[contains(@name,"password")]')}},
loginButtonField                 		 : {get : function(){ return browser.element('//input[contains(@value,"Login")]')}},

/** The Additional Authentication Page elements **/
questionField 					 		 : {get : function(){ return browser.element('//td[contains(text(),"Question")]/following-sibling::td')}},
questionPasswordField           		 : {get : function(){ return browser.element('.//*[@id="null"]')}},
submitButtonField                		 : {get : function(){ return browser.element('//input[@type="submit"]')}},

/** The Home Page elements **/
listsField                       		 : {get : function(){ return browser.element('//span[contains(text(),"Lists")]')}},
relationshipsField               		 : {get : function(){ return browser.element('//div[text()="Relationships"]/img')}},
customerField                   		 : {get : function(){ return browser.element('//a[text()="Customers"]')}},
newCustomerField                     	 : {get : function(){ return browser.element('//*[contains(@value,"New Customer")]')}},

/** The Create customer Page elements **/
companyNameField                  		 : {get : function(){ return browser.element('.//*[@id="companyname"]')}},
imgsubsidiaryInAccPageField       		 : {get : function(){ return browser.element('.//*[@id="inpt_subsidiary4"]/following-sibling::span/img')}},
firstOptionInSubsidiarAccField   		 : {get : function(){ return browser.element('.//*[@id="nl3"]')}},
contactIDField                   		 : {get : function(){ return browser.element('//div[@class="listheader"][text()="Contact"]/ancestor::tbody//*[@id="entityid"]')}},
emailFieldBeforeFocus                    : {get : function(){ return browser.element('.//*[@id="contact_splits"]/tbody/tr[2]/td[3]/div')}},
emailField                      		 : {get : function(){ return browser.element('//div[@class="listheader"][text()="Contact"]/ancestor::tbody//span[contains(@id,"contact_email")]//input[@id="email"][@name="email"]')}},
subsidiaryInContactsbeforeFocusField     : {get : function(){ return browser.element('.//*[@id="contact_splits"]/tbody/tr[2]/td[5]')}},
subsidiaryInContactsField        		 : {get : function(){ return browser.element('.//input[contains(@id,"inpt_subsidiary13")]')}},
submitOrSaveButtonField          		 : {get : function(){ return browser.element('.//*[@id="btn_secondarymultibutton_submitter"]')}},
firstOptionInSubsidiaryInContactsField   : {get : function(){ return browser.element('.//*[@id="nl8"]')}},
customerNameFieldOnViewCustomerPage      : {get : function(){ return browser.element('//*[@class="uir-record-name"]')}},

/** The Opportunity Page elements **/
opportunityField   						 : {get : function(){ return browser.element('.//*[@id="nl10"]/a/span[contains(text(),"Opportunity")]')}},
newOpportunityField   					 : {get : function(){ return browser.element('.//*[@id="opprtnty"]')}},
opportunityHeader   					 : {get : function(){ return browser.element('.//*[@id="tranid_fs_lbl"]/a')}},
checkIfTransactionSucessfull   			 : {get : function(){ return browser.element('//div[contains(text(),"Confirmation")]/following-sibling::*[contains(text(),"Transaction successfully Saved")]')}},
getOpportunityNumberField   			 : {get : function(){ return browser.element('//div[@class="uir-record-id"]')}},
editOpportunityField   					 : {get : function(){ return browser.element('.//*[@id="edit"]')}},
opportunityStatusField					 : {get : function(){ return browser.element('.//*[@id="inpt_entitystatus6"]')}},
closewoneOptionInStatus					 : {get : function(){ return browser.element('.//*[@id="nl9"]')}},
menuField					 			 : {get : function(){ return browser.element('.//*[@id="spn_CREATENEW_d1"]//a[contains(@class,"menu")]/div')}},
userHeader					 			 : {get : function(){ return browser.element('.//*[@id="spn_cRR_d1"]/a/div[1]')}},
signOut					 			 	 : {get : function(){ return browser.element('//span[contains(text(),"Sign Out")]')}},




/** Open the NetSuite Login Page **/
open: { value : function(baseURL){
	outPut.log('Navigating to URL '+baseURL);
	page.open.call(this, baseURL);
	this.loginField.waitForExist(15000);
	browser.windowHandleMaximize();
}},

/**Login into NetSuite**/
loginToNetSuite : { value : function(userNameValue,passwordValue){
	this.loginField.setValue(userNameValue);
	this.passwordField.setValue(passwordValue);
	this.loginButtonField.click();
	this.questionField.waitForExist(25000);
	outPut.log('Logged into NetSute using User ID: '+userNameValue);
	return this.questionField.isVisible();
}},

/**Login into NetSuite**/
loginToNetSuiteNegativeCase : { value : function(userNameValue,passwordValue){
	this.loginField.setValue(userNameValue);
	this.passwordField.setValue(passwordValue);
	this.loginButtonField.click();
	browser.pause(2000);
	return false;
}},

/**Enter sendory password and login**/
enterAuthentication : { value : function(){
	var actualQuestion=this.questionField.getText();
	if(actualQuestion=='What was your childhood nickname?'){
		this.questionPasswordField.setValue("chinna");
	}else if(actualQuestion=='What is the middle name of your oldest child?'){
		this.questionPasswordField.setValue("harish");
	}if(actualQuestion=='In what city or town was your first job?'){
		this.questionPasswordField.setValue("bangalore");
	}
	browser.pause(2000);
	this.submitButtonField.click();
	outPut.log('Entered the secondary Password to login into NetSute');
	this.listsField.waitForExist(230000);
	return this.listsField.isVisible();
}},

/**Create new Customer**/
createNewCustomer : { value : function(){

	var customerName = 'NewTestCustomer'+this.generateUniqueString();
	outPut.log('Going to create New Customer with Name: '+customerName);
	this.listsField.click();
	this.relationshipsField.waitForExist(35000);
	if(!this.customerField.isVisible()){
		this.relationshipsField.click();
	}
	this.customerField.click();
	this.newCustomerField.waitForExist(35000);
	this.newCustomerField.click();
	this.companyNameField.waitForExist(25000);
	this.companyNameField.setValue(customerName);

	this.imgsubsidiaryInAccPageField.scroll(10,100);
	this.imgsubsidiaryInAccPageField.click();
	browser.pause(2000);
	this.firstOptionInSubsidiarAccField.click();

	this.contactIDField.setValue(customerName);
	
	browser.keys('Tab');
	browser.keys('Tab');
	browser.keys('Tab');
	browser.keys('Tab');
	
	this.subsidiaryInContactsField.click();
	browser.pause(2000);
	this.firstOptionInSubsidiaryInContactsField.click();
	browser.pause(3000);

	this.submitOrSaveButtonField.click();
	this.customerNameFieldOnViewCustomerPage.waitForExist(35000);

	var newCustomerID=this.customerNameFieldOnViewCustomerPage.getText();
	
	if(newCustomerID==customerName){
		outPut.log('Created Customer sucessfully. Cusomer ID: ' + newCustomerID);
		return true;
	}else{
		outPut.log('Failed to created Customer. Cusomer ID not matching. Expected: ' + customerName+' Actual: '+newCustomerID);
		return false;	
	}
	
}},

/**Create new Opportunity**/
createOpportunity :{ value : function(){
	outPut.log('Going to create  Opportunity for newly created customer');
	this.menuField.moveToObject();
	browser.pause(2000);
	this.opportunityField.click();
	this.opportunityHeader.waitForExist(35000);
	this.submitOrSaveButtonField.click();
	this.checkIfTransactionSucessfull.waitForExist(35000);
	var oppurtunityNumber=this.getOpportunityNumberField.getText();
	outPut.log('Newly created Oppurtunity ID: ' + oppurtunityNumber);
	if(oppurtunityNumber!==''){
		return true;
	}else{
		return false;
	}

}},

/**Change the opportunity status to colse-own**/
closeOpportunityWon :{ value : function(){
	outPut.log('Going to change the  Opportunity status to closed own');
	this.editOpportunityField.click();
	browser.pause(2000);
	this.opportunityStatusField.click();
	this.closewoneOptionInStatus.click();
	this.submitOrSaveButtonField.click();
	this.checkIfTransactionSucessfull.waitForExist(35000);
	var oppurtunityNumber=this.getOpportunityNumberField.getText();
	if(!oppurtunityNumber!==''){
		outPut.log('Updated Oppurtunity ID: Closed-own');
		return true;
	}else{
		return false;
	}

}},

/**Logout**/
logOutFromNetSuite :{ value : function(){
	outPut.log('Loggin out from NetSuite');
	this.userHeader.moveToObject();
	browser.pause(2000);
	this.signOut.click();
	this.loginField.waitForExist(35000);
	return this.loginField.isVisible();
}},
generateUniqueString :{ value: function(){
   var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return S4();
}},

});

module.exports = netSuiteAuto;