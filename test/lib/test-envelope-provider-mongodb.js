// This is a test class of the mongodb based envelope provider
var EnvelopeData = require('../../lib/envelope-provider-mongodb').EnvelopeProvider;
/* These are the worst unit tests I've ever written. Why?
 * Because they aren't real unit tests but actually reference and interact with
 * mongodb directly. I didn't want to but man, is mocking it in javascript way 
 * more painful than it should be. So use a test database, change an identifier 
 * around and run nodeunit on the file.
 * Idea inspired from: http://skipoleschris.blogspot.com/2012/07/unit-testing-with-mongodb.html
 */

var dummyDbName = "test_envelope_development";
var dummyHost = "localhost";
var dummyDbConnectString = dummyHost + "/" + dummyDbName;
var dummyPort = "27017";
var dummyCollectionName = "envelopes";

var provider;

module.exports = {
	setUp : function(callback)
	{
		provider = EnvelopeData.newEnvelopeProvider(dummyDbConnectString, dummyCollectionName);
		callback();
	},
	tearDown : function( callback)
	{
		provider.close();
		callback();
	},
	testFindAll :function( test )
	{
		// Arrange
		/*var envelopes = [{ id : 3, description: 'test letter 1'}, 
				 { id : 2, description: 'test letter 2'}];

		when(this.provider.envelope_collection).find().thenReturn(mockCursor);
		when(mockCursor).toArray().thenReturn(envelopes);*/

		// Act, Assert
		test.expect(1);
		records_found = false;
		records_found = provider.findAll(function(err,docs){
			test.equals(docs.length, 2);
			test.done();
		});
	},
	testFindById : function(test)
	{
		// Arrange
		/*var testId = "000000000000000000000001";
		var envelopes_to_return = [{ id : testId, description: 'test letter 1'}];

		when(this.provider.envelope_collection).findOne().thenReturn(mockCursor);
		when(mockCursor).toArray().thenReturn(envelopes_to_return);*/

		// Act, Assert
		test.expect(3);
		provider.findById("532646752b5e1572edae2b1e",function(err,docs){
			test.equals(docs._id, "532646752b5e1572edae2b1e");
			test.equals(docs.id, 3);
			test.equals(docs.description, "test letter 1");
			test.done();
		});
		/*var actualEnvelopes = this.provider.findById(testId);

		// Assert
		test.equals(actualEnvelopes.length, 1);
		test.equals(actualEnvelopes[0].id, testId);*/
	},
	testFindByUserId : function(test)
	{
		// Arrange
		/*var testId = "000000000000000000000001";
		var envelopes_to_return = [{ id : testId, description: 'test letter 1'}];

		when(this.provider.envelope_collection).findOne().thenReturn(mockCursor);
		when(mockCursor).toArray().thenReturn(envelopes_to_return);*/

		// Act, Assert
		test.expect(3);
		provider.findByUserId("user_id",function(err,docs){
			test.equals(docs[0].user_id, "user_id");
			test.equals(docs[0].id, 2);
			test.equals(docs[0].description, "test letter 2");
			test.done();
		});
		/*var actualEnvelopes = this.provider.findById(testId);

		// Assert
		test.equals(actualEnvelopes.length, 1);
		test.equals(actualEnvelopes[0].id, testId);*/
	}
	/*,
	save : function(test)
	{
		//Arrange
		var newEnvelope = { id : 4, description: 'another test letter'};

		// Act
		this.provider.save(newEnvelope);

		// Assert
		verify(mockCollection).insert(); // Is there a matcher for an array the checks if items have been modified
		test.done();
	}*/
};