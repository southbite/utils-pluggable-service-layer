var pluginBase = require('./plugin-base'),
async = require('async');

module.exports = {
	instances:{},
	events:require('event-framework'),
	initializeContextual:function(config, events, context, done){
		this.initializeInternal({config:config,events:events,context:context},done);
	},
	initializeInternal:function(args, done){
		
//console.log('importing events');
		
		var config = args.config;
		var events = args.events;
		var context = args.context;
		
		var _this = this;
		if (events){
			_this.events.importEvents(events);
		}
		
		//console.log('imported events');
		
		async.eachSeries(Object.keys(config), function (pluginName, callback){ 
			_this.events.emit('initializing plugin', {name:pluginName});
			
			pluginBase.initialize(config, pluginName, {'error':{
				listenerName:'plugin-container', 
				handler:function(args){
					_this.events.emit('plugin error', args);
				}},'info':{
				listenerName:'plugin-container', 
				handler:function(args){
					_this.events.emit('plugin info', args);
				}
			}},
			context,
			function(e, plugin){
				_this.instances[pluginName] = plugin;
				
				//console.log(e);
				//console.log('pluginName');
				//console.log(pluginName);
				
				
				if (!e)
					_this.events.emit('initialized plugin', {name:pluginName, instance:plugin});
				else
					_this.events.emit('initialize plugin failed', {name:pluginName, error:e});
					
				//console.log(e);
				callback(e);
			});

			
		}.bind(_this), 
		function(e) {
			done(e);
		}.bind(_this)); 
		
	},
	initialize:function(config, events, done){
		this.initializeInternal({config:config,events:events},done);
	},
	get:function(key){
		var _this = this;
		if (_this.instances[key])
			return _this.instances[key];
		else
			throw 'Plugin ' + key + ' not found';
	}
}