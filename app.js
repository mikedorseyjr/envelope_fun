var express = require('express');
var app = express();
var server = require('http').createServer(app);
var controllers = require('./controllers')({verbose: true});
var _ = require('lodash');
var util = require('util');
var path = require('path');

// load controllers
var envelope = controllers.envelope;

// all environments
app.set('port', process.env.PORT || 3000);
app.use('/', express.static(path.join(__dirname, 'public'), {}));
app.use(express.logger('dev'));
app.use(express.bodyParser());

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// creating a url to map to this controller
app.get('/envelope/show_envelopes',envelope.show_envelopes);
app.post('/envelope/send_envelope',envelope.send);
app.post('/envelope/receive_envelope',envelope.receive);
app.put('/envelope/save_envelopes',envelope.save_envelopes);
app.delete('/envelope/remove_envelope',envelope.remove);

server.listen(3000);
