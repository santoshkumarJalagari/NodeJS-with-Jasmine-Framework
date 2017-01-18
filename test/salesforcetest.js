var loginPage = require('../pageobjects/loginpage');
var homePage = require('../pageobjects/homepage');
var dataUtil = require('../util/datautil');
var outPut = require('../util/output');
var using = require('jasmine-data-provider');
var fs = require('fs');



describe('Perform basic validations in salesforce', function(){

	function dataProvider(){
		// Read data from the file data/salesforcetest/data.json
		return dataUtil.readData();
	}	
	using(dataProvider, function(data){	
		it('The user should be able to open salesforce login page successfully', function(){
				outPut.log('opening the login page');
				loginPage.open();
		});

		
		it('The user should be able to login to salesforce successfully', function(){
				var loggedIn = loginPage.login(data.username, data.password);
				outPut.log('Validating if User logged in Sucessfully into salesforce');
				expect(loggedIn).toEqual(true);
				if(!loggedIn){
						throw 'Login failed - tests cannot continue'
				}	
		});		
		
		it('The user should be able to create a new account in salesforce', function(){
			outPut.log('attempting to create a new account');
			var randomAccountName = homePage.createRandomString(8);
			var createdAccountName = homePage.createAccount(randomAccountName);
			outPut.log('Validating if Account created Sucessfully in salesforce');
			expect(createdAccountName).toBe(randomAccountName);
		});


		it('The user should be able to add a contact to a new account in salesforce', function(){
			outPut.log('attempting to create a new contact');
			var randomContactName = homePage.createRandomString(7);
			var createdContactName = homePage.createRandomContact(randomContactName);
			outPut.log('Validating if Contact created Sucessfully  in salesforce');
			expect(createdContactName).toBe(randomContactName);
		});


		it('The user should be able to create a new opportunity in salesforce with status Closed Won', function(){
			outPut.log('attempting to create a new opportunity');
			var randomopportunityName = homePage.createRandomString(7);
			var createdOpportunityName = homePage.createOpportunity(randomopportunityName, 'Closed Won');
			outPut.log('Validating if Opportunity created Sucessfully in salesforce');
			expect(createdOpportunityName).toBe(randomopportunityName);
		});


		it('The user should be able to logout from salesforce successfully', function(){
			outPut.log('Attempting to logout ');
			var isLoggedOut = homePage.logout();
			outPut.log('Validating if Logout is Sucessfull in salesforce');
			expect(isLoggedOut).toBe(true);
		})
	});

})