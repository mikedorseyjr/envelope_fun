// This is mongodb provider code that semi-references http://howtonode.org/express-mongodb.
// Its written this way so that I can figure out how to make a generic method of storing data despite what
// my new database of the day may be and learning some cool java abstraction stuff.

var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
var BSON = require('mongodb').BSON;
var ObjectID = require('mongodb').ObjectID;
var host="localhost";
var port="27017";

EnvelopeProvider = function(){};
EnvelopeProvider.prototype.envelope_collection = [];
EnvelopeProvider.newEnvelopeProvider = function(host, port) {
  this.db= new Db('envelope_db', new Server(host, port, {auto_reconnect: true}, {safe: false},{fsync: true}));
  this.db.open(function(){});
  this.envelope_collection = this.db.collection('envelopes');
};

/**
 * newEnveloperProvider - Returns a brand new EnvelopeProvider with which to start interfacing
 * directly with the backend provider.
 * @return - interface to backend store
 */
EnvelopeProvider.dummyEnvelopeProvider = function() {
  return new EnvelopeProvider();
}

/**
 * findAll - returns all envelopes stored within backend
 * this provider provides data for.
 */
EnvelopeProvider.prototype.findAll = function(){
    return this.envelope_collection.find({}).toArray(function(err,docs){
      // Cool error logging goes here
    });
};

/**
 * findById - takes an ID and callback, finds the identifier in the 
 * datastore said provider provides access to and returns said envelope
 * @param - id 
 *        identifier of record needed
 */
EnvelopeProvider.prototype.findById = function(id) {
    return this.envelope_collection.findOne({_id: ObjectID.createFromHexString(id)}).toArray(function(err,docs){});
};

/**
 * save - takes an array of envelopes and saves them to
 * the backend datastore said provider provides access to.
 * @param - envelopes
 *        envelopes to save
 */
EnvelopeProvider.prototype.save = function(envelopes) {
        if( typeof(envelopes.length)=="undefined")
          envelopes = [envelopes];

        for( var i =0;i< envelopes.length;i++ ) {
          envelope = envelopes[i];
          envelope.created_at = new Date();
        }

        this.envelope_collection.insert(envelopes, function(err, objects) {
          // Probably have some cool logging of errors here
        });
};

new EnvelopeProvider();

exports.EnvelopeProvider = EnvelopeProvider;