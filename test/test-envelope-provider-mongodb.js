// This is a test class of the mongodb based envelope provider
var EnvelopeData = require('../lib/envelope-provider-mongodb').EnvelopeProvider;
var JsMockito = require('jsmockito').JsMockito;
JsMockito.Integration.Nodeunit();
var Db = require('mongodb').Db;
var Server = require('mongodb').Server;
var Collection = require('mongodb').Collection;
var Cursor = require('mongodb').Cursor;

var mockCollection = {};
var mockCursor = {};

module.exports = {
	setUp : function(callback)
	{
		var envelopes = [{ id : 3, description: 'test letter 1'}, 
						 { id : 2, description: 'test letter 2'}];
		this.provider = EnvelopeData.dummyEnvelopeProvider();
		/**
		 * Why do I have to create real objects in order to mock them the 
		 * right way?!?!
		 */
		dummyDb = new Db('dummyDb', new Server('dummyHost', 'dummyPort'));
		dummyCollection = dummyDb.collection('dummyCollection');
		dummyCursor = dummyCollection.find({});
		mockCollection = mock(dummyCollection);
		mockCursor = mock(dummyCursor);
		this.provider.envelope_collection = mockCollection;

		callback();
	},
	tearDown : function(callback)
	{
		//this.provider.clear();
		callback();
	},
	findAll :function( test )
	{
		// Arrange
		var envelopes = [{ id : 3, description: 'test letter 1'}, 
				 { id : 2, description: 'test letter 2'}];

		when(this.provider.envelope_collection).find().thenReturn(mockCursor);
		when(mockCursor).toArray().thenReturn(envelopes);

		// Act
		var actualEnvelopes = this.provider.findAll();

		// Assert
		test.equals(actualEnvelopes.length, 2);
		test.done();
	},
	findById : function(test)
	{
		// Arrange
		var testId = "000000000000000000000001";
		var envelopes_to_return = [{ id : testId, description: 'test letter 1'}];

		when(this.provider.envelope_collection).findOne().thenReturn(mockCursor);
		when(mockCursor).toArray().thenReturn(envelopes_to_return);

		// Act
		var actualEnvelopes = this.provider.findById(testId);

		// Assert
		test.equals(actualEnvelopes.length, 1);
		test.equals(actualEnvelopes[0].id, testId);
		test.done();		
	},
	save : function(test)
	{
		//Arrange
		var newEnvelope = { id : 4, description: 'another test letter'};

		// Act
		this.provider.save(newEnvelope);

		// Assert
		verify(mockCollection).insert(); // Is there a matcher for an array the checks if items have been modified
		test.done();
	}
};