var HTTPS = require('https');
var cool = require('cool-ascii-faces');

var botID = process.env.BOT_ID;

function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      botRegex = /^\/cool$/,
      botTruth = /^\/truth$/;
  
  if (request.user_id == 20120116) { // Nicole shut up
  	this.res.writeHead(200);
  	postMessage(3);
  	this.res.end();
  } else if(request.text && botRegex.test(request.text)) { // Send face
    this.res.writeHead(200);
    postMessage(1);
    this.res.end();
  } else if(request.text && botTruth.test(request.text)) { // Michigan sucks
  	this.res.writeHead(200);
  	postMessage(2);
  	this.res.end();
  } else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
  
  if (request.user_id == 19104333) { // Love Ben
  	this.res.writeHead(200);
  	postMessage(4);
  	this.res.end();
  }
  
  if (request.text.search(/scott/i) > -1 || request.text.search(/food/i) > -1 && request.user_id != 29948664) { // scott
  	this.res.writeHead(200);
  	postMessage(5);
  	this.res.end();
  }
}

function postMessage(type) {
  var botResponse, options, body, botReq;

  switch (type) {
  	case 1:
  	  botResponse = cool();
  	  break;
  	case 2:
  	  botResponse = '*ichigan sucks';
  	  break;
  	case 3:
  	  botResponse = 'Shut up.';
  	  break;
  	case 4:
  	  botResponse = '';
  	  //botResponse = 'I LOVE YOU BEN!';
  	  body.picture_url = 'http://www.relatably.com/m/img/broken-arm-memes/vy0eI72.jpg';
  	  break;
  	case 5:
  	  botResponse = '@Nathan Balli';
  	  body.attachments = [{"type":"mentions", "user_ids":[29948664], "loci":[[0,13]]}];
  	  break;
  	default:  
  }

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : botResponse
  };

  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body)); // THIS LINE SENDS MESSAGE TO GROUP CHAT
}

exports.respond = respond;
