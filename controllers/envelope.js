var _ = require('lodash');
var util = require('util');
var EnvelopeData = require('../lib/envelope-provider-mongodb').EnvelopeProvider;
var EnvelopeFunctions = require('../lib/envelope_functions').EnvelopeFunctions;

// ------------------------
// Service exposed functions
// ------------------------

module.exports.show_envelopes = function(req, res, next) {
  console.log('API REQUEST: show_envelopes - body', req.body);

  var envelopeProvider = EnvelopeData.baseEnvelopeProvider();
  /*var envelopes = [{ description: 'test letter 1'}, 
				   { description: 'test letter 2'}];
  console.log("Saving the envelopes "+ JSON.stringify(envelopes));
  envelopeProvider.save(envelopes);*/
  envelopeProvider.findAll(function(err,docs){
  	if ( err ) console.log("Unable to retrieve documents");
  	res.json(docs);
  });
};

module.exports.save_envelopes = function(req, res, next) {
  console.log('API REQUEST: save_envelopes - body', req.body);
  var envelopes = req.body['envelopes'];

  var envelopeProvider = EnvelopeData.baseEnvelopeProvider();
  console.log("Saving the envelopes "+ JSON.stringify(envelopes));
  envelopeProvider.save(envelopes, function(err,docs){
  	if ( err ){
  		console.error("Error when saving of "+err.Message);
  		res.json({message: err.Message});
  	}else{
  		res.json({message: "Documents successfully saved."});
  	}
  });
};

module.exports.send = function(req, res, next) {
	console.log('API REQUEST: sent - params', req.query);
	var id = req.query.id;

	var functions = new EnvelopeFunctions();
	functions.sent( id, function(err, docs, lastErrorObject){
		if ( err) {
			console.error("Error when marking envelope sent "+err.Message);
			res.json({mesage: err.Message});
		}else {
			res.json({message: "Envelope with id "+id+" successully marked as sent"});
		}
	});
}

module.exports.receive = function(req, res, next) {
	console.log('API REQUEST: receive - params', req.query);
	var id = req.query.id;

	var functions = new EnvelopeFunctions();
	functions.receive( id, function(err, docs, lastErrorObject){
		if ( err) {
			console.error("Error when marking envelope received "+err.Message);
			res.json({mesage: err.Message});
		}else {
			res.json({message: "Envelope with id "+id+" successully marked as received"});
		}
	});
}



