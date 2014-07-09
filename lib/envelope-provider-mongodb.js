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
  provider.db = mongojs(connectionString);
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
    this.envelope_collection.find({},
      function(err,docs){
        if ( err ) console.log("There was an error getting all the envelopes");
        if( callback ){ callback(err, docs); };
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
EnvelopeProvider.prototype.findById = function(id, callback) {
    return this.envelope_collection.findOne({_id: mongojs.ObjectId(id)},
      function(err, docs){
        if ( err) { console.dir(err);}
        if (callback ){ callback(err, docs); };
      });
};

/**
 * findById - takes an ID and callback, finds the identifier in the 
 * datastore said provider provides access to and returns said envelope
 * @param - userIid 
 *        identifier of record needed
 */
EnvelopeProvider.prototype.findByUserId = function(userId, callback) {
    return this.envelope_collection.find({user_id: userId},
      function(err, docs){
        if ( err) { console.dir(err);}
        if (callback ){ callback(err, docs); };
      });
};

/**
 * findAndModifyById - takes and ID, update set, and callback, adds the
 * modified properties and returns the modified doc
 * @param - id
 *          identifier of record needed
 * @param - update_set
 *          What to change in the set
 * @param - callback
 */
 EnvelopeProvider.prototype.findAndModifyById = function(id, update_set, callback) {
    return this.envelope_collection.findAndModify({
        query: {_id: mongojs.ObjectId(id)},
        update: { $set: update_set},
        new: true
      }, callback);
};

/**
 * findAndModifyById - takes and ID, update set, and callback, adds the
 * modified properties and returns the modified doc
 * @param - userId
 *          identifier of record needed
 * @param - update_set
 *          What to change in the set
 * @param - callback
 */
 EnvelopeProvider.prototype.findAndModifyByUserId = function(userId, update_set, callback) {
    return this.envelope_collection.findAndModify({
        query: {user_id: userId},
        update: { $set: update_set},
        new: true
      }, callback);
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
 * remove - takes an envelope and removes it from the backend
 * datasotre.
 * @param - envelope
 *        The envelope to remove. Cannot be empty.
 * @param callback
 *        This is async javascript
 */
 EnvelopeProvider.prototype.remove = function(id, callback) {
    if( typeof(id)=="undefined" || id == ""){
      if ( callback) callback("ID_BLANK", {"message": "ID can not be empty"});
      return;
    }

    console.log("Removing the envelope with id: "+id);
    return this.envelope_collection.remove(
      mongojs.ObjectId(id),
      true, // just one should be true
      callback);
 }
/**
 * close - Closes the database and client connection
 */
 EnvelopeProvider.prototype.close = function(){
    this.db.close();
 };

new EnvelopeProvider();

exports.EnvelopeProvider = EnvelopeProvider;