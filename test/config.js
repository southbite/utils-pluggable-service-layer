module.exports = {
	services:{
		test_plugin:{
			settings:{
				testSetting:'test'
			},
			instance:require('./test_plugin')
		},
		another_test_plugin:{
			settings:{
				testSetting:'test1'
			},
			instance:require('./another_test_plugin')
		}
	}
}