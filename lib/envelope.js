var _ = require('lodash');
var util = require('util');
var EnvelopeData = require('../lib/envelope-provider-mongodb').EnvelopeProvider;

EnvelopeFunctions = function(send_to,send_from){
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
	var envelopeProvider = new EnvelopeProvider();
	var sentEnvelope = envelopeProvider.findById(id, new function(null, docs ){});
	sentEnvelope.send_date = new Date();
	sentEnvelope.sent = true;
	envelopeProvider.save([this], callback);
}

/**
 * received - This function takes in a callback and sets the status of the current
 * envelope to received along with the date it was received. It is used to scan and 
 * update the system to indicate that said letter has been sent.
 * @param id - Identifier of said letter
 * @callback - callback for post processing of said letter after the save
 */
EnvelopeFunctions.prototype.received = function(id, callback) {
	var envelopeProvider = new EnvelopeProvider();
	var receivedEnvelope = envelopeProvider.findById(id, new function(null, docs ){});
	receivedEnvelope.receivedDate = new Date();
	receivedEnvelope.received = true;
	envelopeProvider.save([receivedEnvelope], callback);
}

/**
 *
 */
EnvelopeFunctions.prototype.prepForSend = function(callback) {

}

