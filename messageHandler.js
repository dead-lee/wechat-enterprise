var image, voice, video, logging = require('./logging');
//var content = "";


var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var model = require('./model');
var Contact = model.Contact;
mongoose.connect('mongodb://admin:admin@ds037447.mongolab.com:37447/db1');

function list_message(dept,cb) {
    Contact.findOne({'title':dept},function(err, doc) {
        cb(doc.content);
    });
}

/*
var mongo = {
      "username" : "admin",
      "password" : "admin",
      "url" : "mongodb://admin:admin@ds037447.mongolab.com:37447/db1"
}




function list_message(dept,cb) {
  require('mongodb').connect(mongo.url, function(err, conn) {
    var collection = conn.collection('contacts');
   
    
    collection.find({'title':dept},{'content':1}, function(err, cursor) {
      cursor.toArray(function(err, items) {
	content=items[0].content;
	cb(items[0].content);
      });
    });
  });
}
*/



exports.text = function (json, next) {

    var text = json.Content;
    if (text == "video") {
        next.video(video);
    } else if (text == "voice") {
        next.voice(voice);
    } else if (text == "image") {
        next.image(image);
    } else if (text == "music") {
        next.music();
    } else if (text == "news") {
        next.news();
    } else if (text == "cams-social") {
        next.news({"items": [
            {   "Title": "CAMS以及相关技术聊天室",
                "Description": "描述：IBM CAMS 技术社区\n" +
                    "群主：ftaft2000\n" +
                    "主旨：帮助ibmer学习加强CAMS知识\n" +
                    "加入方式：点入链接，下载二维码图片，即可本地扫描加入\n" +
                    "人数：100人",
                "PicUrl": "http://gdc-ibmaccount.mybluemix.net/img/cams-social-post.jpg",
                "Url": "weixin.qq.com/g/AWY6WJpfH_YuvNm7"
            }
        ]});
    }else if (text == "cams-ad") {
        next.news({"items": [
            {   "Title": "CAMS招聘用广告",
                "Description": "描述：IBM CAMS 广告\n" +
                    "作者：Jun Jie Hu/China/IBM",
                "PicUrl": "http://nodejstest102.mybluemix.net/1.jpg",
                "Url": "http://nodejstest102.mybluemix.net/index1.html"
            }
        ]});
    } 
	else if(text == "part0001")
	{
		list_message('part0001',function(content){
		next.text(content);
		}
        );
	}
	
	
	else {
        next.text("You may type [video], [voice], [image] for the latest follower uploads, or type [cams-social] for a technique group chat and [news] for latest news ");
    }
}

exports.video = function (json, next) {
    logging.log(json)
    video = json.MediaId;
    next.text("thank you for sending this video, type [video] for the latest updates on server ");
}

exports.voice = function (json, next) {

    voice = json.MediaId;
    next.text("thank you for sending this voice, type [voice] for the latest updates on server");
}

exports.image = function (json, next) {

    image = json.MediaId;
    next.text("thank you for sending this image, type [image] for the latest updates on server ");
}

exports.location = function (json, next) {

    next.text("you are now at: " + json.Location_X + "," + json.Location_Y);
}

exports.link = function (json, next) {

    next.text("the link <" + json.Title + "> has been received and recorded in our logs");
}

exports.event = function (json, next) {
    var event = json.Event;
    if (event == 'click') {
        var eventKey = json.EventKey;
        if (eventKey == "send-text") {
            next.text("You have triggered text sending From "+json.FromUserName);
        }
		
		else if (eventKey == "requestBuzzHR") {
	
        //next.text("China(IBM China, China GDC, and ISC),Email: buzzhr@cn.ibm.com,Telephone: (0)4008822035");
		list_message('GDCHR',function(content){
		next.text(content);
		}
        );
        }
		
		else if(eventKey=='requestBuzzIT'){
			
			//next.text("requestIT");
			
			next.news({"items": [
                {   "Title": "IT BUZZ",
                    "Description": "欢迎使用IT BUZZ\n" +
                    "加入方式：点入链接，下载二维码图片，即可本地扫描加入\n" +
                    "人数：100人",
                    "PicUrl": "http://farm5.static.flickr.com/4023/4520977138_2bd6ffde45_z.jpg" ,
                    "Url": "http://121.42.163.27/BuzzIT/index.html"
                }
            ]});
			
			}
			
		else if (eventKey == "requestclaim") {
        next.news({"items": [
            {   "Title": "WWER Expense Reimbursement Guide",
                "Description": "How to claim on WWER\n" +
                    "Author：Team",
                "PicUrl": "http://121.42.163.27/Reimbursement/claim.png" ,
                "Url": "http://121.42.163.27/Reimbursement/Mobile_Claim.html"
            }
        ]});
    } 

	else if (eventKey == "requestprocess") {
        next.news({"items": [
            {   "Title": "GCG Employee Travel Guidance",
                "Description": "Things needed before travel\n" +
                    "Author：Team",
                "PicUrl": "http://121.42.163.27/Reimbursement/travel.png" ,
                "Url": "http://121.42.163.27/Reimbursement/Travel.html" 
            }
        ]});
    } 

		else if (eventKey == "requesttinfor") {
        next.news({"items": [
            {   "Title": "Travel tips Info",
                "Description": "Something maybe help when travel\n" +
                    "Author：Team",
                "PicUrl": "http://121.42.163.27/Reimbursement/zonghe.jpg" ,
                "Url": "http://121.42.163.27/Reimbursement/collections.html" 
            }
        ]});
    }
		
		
		
		
	else if (eventKey == "send-image") {
            next.text("You have triggered image sending, type [image] for the recent image uploaded");
        }
		
		
		else if (eventKey == "requestHoliday") {
    next.news({"items": [
        {   "Title": "2015 holiday of IBM GDC",
            "Description": "2015年IBM GDC休假安排",
            "PicUrl": "http://121.42.163.27/HR/picture/holiday.jpg",
            "Url": "http://121.42.163.27/HR/holiday2015.html"
        }
    ]});
}

else if (eventKey == "requestShuttle") {
    next.news({"items": [
        {   "Title": "Shuttle Information",
            "Description": "班车信息",
            "PicUrl": "http://121.42.163.27/HR/picture/shuttlelogo.jpg",
            "Url": "http://121.42.163.27/HR/requestShuttle.html"
        }
    ]});
}
else if (eventKey == "requestvacationclaim") {
    next.news({"items": [
        {   "Title": "Vacation Claim",
            "Description": "假期Claim详情",
            "PicUrl": "http://121.42.163.27/HR/picture/claiming.jpg",
            "Url": "http://121.42.163.27/HR/claim.html"
        }
    ]});
}
	else if (eventKey == "requestLKFocal") {


            next.text("GDC L&K Focal by BU:\n Chengdu: Ji Ke/China/IBM,\nDalian:xxx,\nWuhan:xxx,\n Shanghai:xxx.\n Shenzhen:xxx.");
			}


        else if (eventKey == "requestBuzzHR") {
	
        
		next.text("China(IBM China, China GDC, and ISC),Email: buzzhr@cn.ibm.com,Telephone: (0)4008822035");
		}
       
	 	
        
		
		
		

        else if (eventKey == "requestHR") {
	
        list_message('GDCHR',function(content){
		next.text(content);
		}
        );
	//next.text("China(IBM China, China GDC, and ISC),Email: buzzhr@cn.ibm.com,Telephone: (0)4008822035");
        }

        else if (eventKey == "requestS") {

            list_message('GDCSecurity',function(content){
                    next.text(content);}
            );
            //next.text("China(IBM China, China GDC, and ISC),Email: buzzhr@cn.ibm.com,Telephone: (0)4008822035");
        }

        else if (eventKey == "requestMR") {

            list_message('GDCMailRoom',function(content){
                    next.text(content);}
            );
            //next.text("China(IBM China, China GDC, and ISC),Email: buzzhr@cn.ibm.com,Telephone: (0)4008822035");
        }
        else if (eventKey == "requestIT") {

            list_message('GDCIT',function(content){
                    next.text(content);}
            );
            //next.text("China(IBM China, China GDC, and ISC),Email: buzzhr@cn.ibm.com,Telephone: (0)4008822035");
        }

        else if (eventKey == "send-voice") {
            next.text("You have triggered voice sending, type [voice] for the recent voice uploaded");
        } else if (eventKey == "send-video") {
            next.text("You have triggered video sending, type [video] for the recent video uploaded");
        } else if (eventKey == "on-voice") {
            next.voice(voice);
        } else if (eventKey == "on-image") {
            next.image(image);
        } else if (eventKey == "on-video") {
            next.video(video);
        } else if (eventKey == "on-text") {
			
            next.text("You may type [video], [voice], [image] for the latest follower uploads, or type [cams-social] for a technique group chat and [news] for latest news ");
        
		} else if (eventKey == "on-news") {
            next.news();
        } else {
            next.text("You may type [video], [voice], [image] for the latest follower uploads, or type [cams-social] for a technique group chat and [news] for latest news ");
        }
    } else {
        next.news();
    }
}


/**
 * Created by Robin on 10/18/2014.
 * Modified by Jeff on 1/1/2015
 */