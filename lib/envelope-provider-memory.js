var _ = require('lodash');

// This is dummy in-memory provider code that semi-references http://howtonode.org/express-mongodb.
// Its written this way so that I can figure out how to make a generic method of storing data despite what
// my new database of the day may be and learning some cool java abstraction stuff.
var envelopeCounter = 1;

EnvelopeProvider = function(){};
EnvelopeProvider.prototype.dummyData = [];

/**
 * setData - dummy setter for the data
 * @param data - data to set the provider with
 */
 EnvelopeProvider.prototype.setData = function(data){
  this.dummyData = data;
 };

/**
 * newEnvelopeProvider - Returns a brand new EnvelopeProvider with which to start interfacing
 * directly with the backend provider.
 * @return - interface to backend store
 */
EnvelopeProvider.newEnvelopeProvider = function() {
  return new EnvelopeProvider();
}

/**
 * findAll - returns all envelopes stored within backend
 * this provider provides data for.
 */
EnvelopeProvider.prototype.findAll = function() {
  return this.dummyData;
};

/**
 * findById - takes an ID and callback, finds the identifier in the 
 * datastore said provider provides access to and returns said envelope
 * @param - id 
 *        identifier of record needed
 */
EnvelopeProvider.prototype.findById = function(id) {
  var result = null;
  for(var i =0;i<this.dummyData.length;i++) {
    if( this.dummyData[i].id == id ) {
      result = this.dummyData[i];
      break;
    }
  }
  return result;
};

/**
 * save - takes an array of envelopes and saves them to
 * the backend datastore said provider provides access to.
 * @param - envelopes
 *        envelopes to save
 */
EnvelopeProvider.prototype.save = function(envelopes) {
  var envelope = null;

  if( typeof(envelopes.length)=="undefined")
    envelopes = [envelopes];

  for( var i =0;i< envelopes.length;i++ ) {
    envelope = envelopes[i];
    envelope._id = envelopeCounter++;
    envelope.created_at = new Date();

    if( envelope.comments === undefined )
      envelope.comments = [];

    for(var j =0;j< envelope.comments.length; j++) {
      envelope.comments[j].created_at = new Date();
    }
    this.dummyData[this.dummyData.length]= envelope;
  }
  return true;
};

EnvelopeProvider.prototype.clear = function(){
  this.dummyData.length = 0;
}

/* Lets bootstrap with dummy data */
new EnvelopeProvider();

exports.EnvelopeProvider = EnvelopeProvider;