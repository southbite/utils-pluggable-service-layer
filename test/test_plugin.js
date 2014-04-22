module.exports = {
	initialize:function(callback){
		callback(null, this);
	},
	getSettings:function(){
		return this.settings;
	}
}