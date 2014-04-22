var expect = require('expect.js');

describe('e2e test', function() {

	var services = require('../lib/plugin-container');
	
	it('should initialize', function(callback) {
		
		services.initialize(require('./config').services, {
			'initializing plugin':{listenerName:'test', handler:function(args){
				console.log('initializing plugin');
				console.log(args);
			}},
			'initialized plugin':{listenerName:'test', handler:function(args){
				console.log('initialized plugin');
				console.log(args);
			}},
			'initialize plugin failed':{listenerName:'test', handler:function(args){
				console.log('initialize plugin failed');
				console.log(args);
			}}
		}, function(e){
			callback(e);
		});
		
	});
	
	it('should execute plugin', function(callback) {
		
		var settings = services.get('test_plugin').getSettings();
		expect(settings.testSetting == 'test').to.be(true);
		
		callback();
		
	});
	
	it('should execute another plugin', function(callback) {
		
		var settings = services.get('another_test_plugin').getSettings();
		expect(settings.testSetting == 'test1').to.be(true);
		
		callback();
		
	});
	
	
});
