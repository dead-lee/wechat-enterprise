var querystring = require('querystring'),
    cypher = require('./cypher'),
    url = require('url'),
    xml2js = require('xml2js'),
    logging = require('./logging'),
    agent = require('./xmlBuilder'),
    handler = require('./messageHandler'),
    parser = new xml2js.Parser(),
    _TOKEN = "GDCIGA",
    _CORPID = 'wx606d707c8d2557a6',
    _ENCODINGAESKEY = "wUgX2FlrKrgxw2SsFhiXbuXkTf9NdMXHlInjv84gWX4",
    //_AGENTID = "10",
	_AGENTID = "14",
    query,
    davonki = cypher.davonki(_TOKEN, _CORPID, _ENCODINGAESKEY, _AGENTID);



function process(req, res, next) {
    //res.writeHead(200, {'Content-Type': 'text/plain'});
    var param = req.url.split("?")[1];
    query = param ? querystring.parse(param) : {};
    if (req.method == "GET") {
        res.set('Content-Type', 'text/plain');
        onGet(req, res, next);
    } else {
        res.set('Content-Type', 'text/xml');
        onPost(req, res, next);
    }
}

function onGet(req, res, next) {
    logging.log("[GET]:" + req.url);
    var path = url.parse(req.url).pathname;
    var sVerifyMsgSig = decodeURI(query.msg_signature);
    var sVerifyTimeStamp = decodeURI(query.timestamp);
    var sVerifyNonce = decodeURI(query.nonce);
    var sVerifyEchoStr = decodeURI(query.echostr);

    var verifyResult = davonki.verifyURL(sVerifyMsgSig, sVerifyTimeStamp, sVerifyNonce, sVerifyEchoStr);

    if (path == '/log') {
        logging.getLog(function (data) {
            res.end(data)
        });
    } else {
        res.end(verifyResult);
    }
}

function onPost(req, res, next) {
    logging.log("[POST]:" + req.url);
    var sea = "";
    req.addListener("data", function (water) {
        sea += water;
    });

    req.addListener("end", function () {
        logging.log("Original message...");
        logging.log(sea);
		var result="";
        parser.parseString(sea, function (err, result) {
            logging.log("[POST body]:" + result);
            if (err) {
                logging.log(err);
            }

			console.log(result);
			console.log(result==undefined || result.xml==undefined);
			if (result!=undefined && result.xml!=undefined)
			{
			 var xml = agent.formatMessage(result.xml);
			//console.log(result.xml);
            var sVerifyMsgSig = decodeURI(query.msg_signature);
            var sVerifyTimeStamp = decodeURI(query.timestamp);
            var sVerifyNonce = decodeURI(query.nonce);

            logging.log("Receiving message...");
            logging.log(xml);
            davonki.decryptMsg(sVerifyMsgSig, sVerifyTimeStamp, sVerifyNonce, xml, function (json) {
                logging.log("Decrypting message...");
                logging.log(json);
                var assistantHandler = handler[json.MsgType];
                if (assistantHandler && (typeof assistantHandler == "function")) {
                    assistantHandler(json, agent.build(json, davonki, res));
                }
            });
			}
			
    
			
			
			
			
			
        });
    });
}

exports.process = process;


/**
 * Created by Robin on 10/18/2014.
 */
