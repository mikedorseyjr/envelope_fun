var _ = require('lodash');
var util = require('util');
var EnvelopeData = require('../lib/envelope-provider-mongodb').EnvelopeProvider;


EnvelopeFunctions.prototype.envelopeProvider = [];
EnvelopeFunctions = function(){
	this.envelopeProvider = EnvelopeData.baseEnvelopeProvider();
};
// A constructor that creates an EnvelopeFunctions object with a 
// particular provider.
EnvelopeFunctions.prototype.newEnvelopeFunctions = function(provider){
	this.envelopeProvider = provider;
}
EnvelopeFunctions.newEnvelope = function(send_to,send_from){
	this.send_to =send_to;
	this.send_from = send_from;
	this.sent = false;
	this.received = false;
}

/**
 * sent - This function takes in a callback and sets the status of the current
 * envelope to sent along with the date it was sent. It is used to scan and 
 * update the system to indicate that said letter has been sent.
 * @param id - Identifier of said letter
 * @callback - callback for post processing of said letter after the save
 */
EnvelopeFunctions.prototype.sent = function(id, callback) {
	var envelopeProvider = EnvelopeData.baseEnvelopeProvider();
	var sentEnvelope = envelopeProvider.findAndModifyById(id, 
		{ send_date : new Date(),
	      sent : true },
	      callback);
}

/**
 * received - This function takes in a callback and sets the status of the current
 * envelope to received along with the date it was received. It is used to scan and 
 * update the system to indicate that said letter has been sent.
 * @param id - Identifier of said letter
 * @callback - callback for post processing of said letter after the save
 */
EnvelopeFunctions.prototype.receive = function(id, callback) {
	var envelopeProvider = EnvelopeData.baseEnvelopeProvider();
	var sentEnvelope = envelopeProvider.findAndModifyById(id, 
		{ received_date : new Date(),
	      received : true },
	      callback);
}

/**
 *
 */
EnvelopeFunctions.prototype.prepForSend = function(callback) {

}

new EnvelopeFunctions();

exports.EnvelopeFunctions = EnvelopeFunctions;