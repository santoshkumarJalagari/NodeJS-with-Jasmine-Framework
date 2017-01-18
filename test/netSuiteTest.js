
var netSuitePage = require('../pageobjects/netSuite');
var dataUtil = require('../util/datautil');
var using = require('jasmine-data-provider');
var fs = require("fs");
var outPut = require('../util/output');


describe('Perform basic validations in NetSuite', function(){
	   
    function dataProvider(){
		// Read data from the file data/salesforcetest/data.json
		return dataUtil.readData();
	}

	using(dataProvider, function (data) {	

			it('User should be able to open NetSuite login Page', function(){
				netSuitePage.open(data.netSuiteURL);
				var title = browser.getTitle();
				outPut.log('the title is ' + title);
				outPut.log('Validate if Browser header is displayed as "NetSuite - Customer Login"');
				expect(title).toBe('NetSuite - Customer Login');
			});
		
			it('User should sucessfully loing into NetSuite ', function(){
				var loginSuccessfull = netSuitePage.loginToNetSuite(data.userName,data.password);
				outPut.log('Validate if User is sucessfully in pirmary Authentication"');
				expect(loginSuccessfull).toBe(true);
			});
				
			it('Secondary Authentication should sucessfully ', function(){
				var loginSuccessfull = netSuitePage.enterAuthentication();
				outPut.log('Validate if User sucessfully logged into NetSuite"');
				expect(loginSuccessfull).toBe(true);
			});


			it('Create new Customer in NetSuite should sucessfully', function(){
				var newCustomer = netSuitePage.createNewCustomer();
				outPut.log('Validate if new customer creation is sucessfully in  NetSuite"');
				expect(newCustomer).toBe(true);
			});
			
			it('Create new opportunity in NetSuite should sucessfully', function(){
				var newOppty = netSuitePage.createOpportunity();
				outPut.log('Validate if new opportunity creation is sucessfully in  NetSuite"');
				expect(newOppty).toBe(true);
				
			});

			it('Should be able to close opportunity in NetSuite with status won', function(){
				var editOppty = netSuitePage.closeOpportunityWon();
				outPut.log('Validate if user is sucessfull in changing the opportunity status to closed won in  NetSuite"');
				expect(editOppty).toBe(true);
			});
			
			it('Should be able sucessfully lougout from NetSuite', function(){
				var editOppty = netSuitePage.logOutFromNetSuite();
				outPut.log('Validate if user is sucessfull logged out from NetSuite"');
				expect(editOppty).toBe(true);
			});	
					
	});
})