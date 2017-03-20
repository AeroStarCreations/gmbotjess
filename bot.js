var HTTPS = require('https');
var cool = require('cool-ascii-faces');

var botID = process.env.BOT_ID;

function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      botRegex = /^\/cool$/,
      botTruth = /^\/truth$/;
  
  console.log(request.name + "  " + request.user_id);
  /*
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
  */
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
  	  botResponse = 'Zach loves me more';
  	  break;
  	case 4:
  	  botResponse = 'Benjamin Higgins. Just as I suspected...';
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
