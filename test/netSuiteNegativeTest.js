
var netSuitePage = require('../pageobjects/netSuite');
var dataUtil = require('../util/datautil');
var using = require('jasmine-data-provider');
var fs = require("fs");
var outPut = require('../util/output');


describe('Negative Test for NetSuite', function(){
	   
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
		
			it('User should not be able to loing into NetSuite ', function(){
				var loginSuccessfull = netSuitePage.loginToNetSuite(data.userName,data.password);
				outPut.log('Validate if User is sucessfully in pirmary Authentication"');
				expect(loginSuccessfull).toBe(true);
			});
					
	});
})