var _ = require('lodash');
var util = require('util');
var EnvelopeData = require('../lib/envelope-provider-memory').EnvelopeProvider;

// ------------------------
// Service exposed functions
// ------------------------

module.exports.show_envelopes = function(req, res, next) {
  console.log('API REQUEST: show_envelopes - body', req.body);

  var envelopeProvider = EnvelopeData.newEnvelopeProvider();
  		var envelopes = [{ id : 3, description: 'test letter 1'}, 
						 { id : 2, description: 'test letter 2'}];
  envelopeProvider.save(envelopes,function(error,docs){});
  envelopeProvider.findAll(function(error, docs){
  	res.json(docs);
  })
};



