// Basic datatype for a user. Not to be used in real life.
var $user_id; // Probably randomly generated idea created by mongo ... maybe
var $provider_id; // Unique provider specific id
var $provider_type; // A type that allows us to specify whether the identifier above is a "facebook", "twitter", etc. type of login
var $provider_blob; // Any extra info required for storing into said blob
var $associated_state;