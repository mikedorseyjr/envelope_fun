// This is a test class of the memory based envelope provider
var EnvelopeData = require('../../lib/envelope-provider-memory').EnvelopeProvider;

module.exports = {
	setUp : function(callback)
	{
		var envelopes = [{ id : 3, description: 'test letter 1'}, 
						 { id : 2, description: 'test letter 2'}];
		this.provider = EnvelopeData.newEnvelopeProvider();
		this.provider.setData(envelopes);
		callback();
	},
	tearDown : function(callback)
	{
		this.provider.clear();
		callback();
	},
	findById :function( test )
	{
		// Arrange
		var testId = 2;

		// Act
		var actualEnvelope = this.provider.findById(testId);

		// Assert
		test.equals(actualEnvelope.description, 'test letter 2');
		test.done();
	},
	findAll : function(test)
	{
		// Arrange
		// Act
		var actualEnvelopes = this.provider.findAll();

		// Assert
		test.equals(actualEnvelopes.length, 2);
		test.done();		
	},
	save : function(test)
	{
		//Arrange
		var newEnvelope = { id : 4, description: 'another test letter'};

		// Act
		this.provider.save(newEnvelope);

		// Assert
		var actualEnvelopes = this.provider.findAll();
		test.equals(actualEnvelopes.length, 3);
		test.done();
	}
};