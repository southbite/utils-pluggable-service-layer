
module.exports = {
	initialize:function(config, pluginName, events, done){
		var _this = this;
		var plugin = config[pluginName].instance;
		
		plugin.events = require('utils-event-framework');
		
		if (events)
			plugin.events.importEvents(events);
		
		//////console.log('plugin instance: ' + plugin);
		
		plugin.settings = config[pluginName].settings;
		plugin.initialize(done);
	}
}