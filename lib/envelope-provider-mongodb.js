// This is mongodb provider code that semi-references http://howtonode.org/express-mongodb.
// Its written this way so that I can figure out how to make a generic method of storing data despite what
// my new database of the day may be and learning some cool java abstraction stuff.

var mongojs = require('mongojs');
var connect_string = "localhost/envelope_development";
var envelope_collection_name='envelopes';

EnvelopeProvider = function(){};
EnvelopeProvider.prototype.envelope_collection = [];
EnvelopeProvider.newEnvelopeProvider = function(connectionString, collName) {
  var provider = new EnvelopeProvider();
  provider.db = mongojs(connect_string);
  provider.envelope_collection = provider.db.collection(collName);
  return provider;
};

EnvelopeProvider.baseEnvelopeProvider = function()
{
  return EnvelopeProvider.newEnvelopeProvider(connect_string, envelope_collection_name);
}

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
 * @param - callback - Well, you know mongo calls are async so
 * you probably want something to happen with your results afterward
 */
EnvelopeProvider.prototype.findAll = function(callback){
    return this.envelope_collection.find({},
      function(err,docs){
        if ( err ) console.log("There was an error getting all the envelopes");
        if( callback ){ callback(err, docs)};
      });
    /*, function(err, docs){
    if( err || !docs) console.log("No envelopes found");
    else console.log("Found the envelopes "+JSON.stringify(docs.toArray(function(err,docs){})));
    });*/
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
 * @param callback
 *        A callback because this is async javascript
 */
EnvelopeProvider.prototype.save = function(envelopes,callback) {
        if( typeof(envelopes.length)=="undefined"){
          envelopes = [envelopes];
        }

        for( var i =0;i< envelopes.length;i++ ) {
          envelope = envelopes[i];
          envelope.created_at = new Date();
        }

        console.log("Inserting the envelopes :" + JSON.stringify(envelopes) + " into collection "+this.envelope_collection.collectionName);
        this.envelope_collection.insert(envelopes, {safe: true}, 
            function(err, records) {
              if( err ) console.error("Envelope not saved with err :" + err);
              console.log("Envelopes saved. First record with id: ", records[0]._id);
              if ( callback ) callback(err, records);
          });
};

/**
 * close - Closes the database and client connection
 */
 EnvelopeProvider.prototype.close = function(){
    this.client.close();
 }

new EnvelopeProvider();

exports.EnvelopeProvider = EnvelopeProvider;