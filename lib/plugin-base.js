
module.exports = {
	initialize:function(config, pluginName, events, context, done){
		var _this = this;
		var plugin = config[pluginName].instance;
		
		plugin.events = require('event-framework');
		plugin.context = context;
		
		if (events)
			plugin.events.importEvents(events);
		
		////////console.log('plugin instance: ' + plugin);
		
		plugin.settings = config[pluginName].settings;
		plugin.initialize(done);
	}
}