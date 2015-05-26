var logging=require('./logging');

var mustache = require('mustache');

exports.agent = function(question,res){
    return new Agent(question,res);
}

function Agent(question,res){
    this.res = res;
    this.question = question;
    this.templates = {
        "text": "<xml><ToUserName><![CDATA[{{ToUserName}}]]></ToUserName><FromUserName><![CDATA[{{FromUserName}}]]></FromUserName><CreateTime>{{CreateTime}}</CreateTime><MsgType><![CDATA[text]]></MsgType> <Content><![CDATA[{{Content}}]]></Content> </xml>",
        "video":"<xml><ToUserName><![CDATA[{{ToUserName}}]]></ToUserName><FromUserName><![CDATA[{{FromUserName}}]]></FromUserName><CreateTime>{{CreateTime}}</CreateTime><MsgType><![CDATA[video]]></MsgType><Video><MediaId><![CDATA[{{MediaId}}]]></MediaId><Title><![CDATA[{{Title}}]]></Title><Description><![CDATA[{{Description}}]]></Description></Video></xml>",
        "voice":"<xml><ToUserName><![CDATA[{{ToUserName}}]]></ToUserName><FromUserName><![CDATA[{{FromUserName}}]]></FromUserName><CreateTime>{{CreateTime}}</CreateTime><MsgType><![CDATA[voice]]></MsgType><Voice><MediaId><![CDATA[{{MediaId}}]]></MediaId></Voice></xml>",
        "image":"<xml><ToUserName><![CDATA[{{ToUserName}}]]></ToUserName><FromUserName><![CDATA[{{FromUserName}}]]></FromUserName><CreateTime>{{CreateTime}}</CreateTime><MsgType><![CDATA[image]]></MsgType><Image><MediaId><![CDATA[{{MediaId}}]]></MediaId></Image></xml>",
        "music":"<xml><ToUserName><![CDATA[{{ToUserName}}]]></ToUserName><FromUserName><![CDATA[{{FromUserName}}]]></FromUserName><CreateTime>{{CreateTime}}</CreateTime><MsgType><![CDATA[music]]></MsgType><Music><Title><![CDATA[{{Title}}]]></Title><Description><![CDATA[{{Description}}]]></Description><MusicUrl><![CDATA[{{&MusicUrl}}]]></MusicUrl><HQMusicUrl><![CDATA[{{&HQMusicUrl}}]]></HQMusicUrl></Music></xml>",
        "news": "<xml><ToUserName><![CDATA[{{ToUserName}}]]></ToUserName><FromUserName><![CDATA[{{FromUserName}}]]></FromUserName><CreateTime>{{CreateTime}}</CreateTime><MsgType><![CDATA[news]]></MsgType><ArticleCount>{{ArticleCount}}</ArticleCount><Articles>$articles-mark</Articles></xml> ",
        "items":"{{#items}}<item><Title><![CDATA[{{Title}}]]></Title><Description><![CDATA[{{Description}}]]></Description><PicUrl><![CDATA[{{&PicUrl}}]]></PicUrl><Url><![CDATA[{{&Url}}]]></Url></item>{{/items}}"
    }
}

var agent = Agent.prototype;

agent.text = function(text){
    var data = {};
    data["Content"] = text;

    data["CreateTime"] = new Date().getTime();
    data["ToUserName"] = this.question.FromUserName[0];
    data["FromUserName"] = this.question.ToUserName[0];
    //console.log(mustache.render(this.templates.text,data));
    this.res.end(mustache.render(this.templates.text,data));
}

agent.video = function(id){
    var data = {};
    data["MediaId"] = id;
    data["Title"] = "Latest video";
    data["Description"] = "This is the latest video from user uploads";

    data["CreateTime"] = new Date().getTime();
    data["ToUserName"] = this.question.FromUserName[0];
    data["FromUserName"] = this.question.ToUserName[0];

    this.res.end(mustache.render(this.templates.video,data));
}

agent.voice = function(id){
    var data = {};
    data["MediaId"] = id;

    data["CreateTime"] = new Date().getTime();
    data["ToUserName"] = this.question.FromUserName[0];
    data["FromUserName"] = this.question.ToUserName[0];

    this.res.end(mustache.render(this.templates.voice,data));
}

agent.image = function(id){
    var data = {};
    data["MediaId"] = id;

    data["CreateTime"] = new Date().getTime();
    data["ToUserName"] = this.question.FromUserName[0];
    data["FromUserName"] = this.question.ToUserName[0];

    this.res.end(mustache.render(this.templates.image,data));
}

agent.music = function(){
    var data = {};
    data["Title"] = "The little apple";
    data["Description"] = "小苹果";
    data["MusicUrl"] = "http://yinyueshiting.baidu.com/data2/music/123297915/1201250291413518461128.mp3?xcode=fbd5b74dd1a24fa90d512d7cb03c4c45a6a03c85c06f4409";
    data["HQMusicUrl"] = "http://yinyueshiting.baidu.com/data2/music/123297915/1201250291413518461128.mp3?xcode=fbd5b74dd1a24fa90d512d7cb03c4c45a6a03c85c06f4409";

    data["CreateTime"] = new Date().getTime();
    data["ToUserName"] = this.question.FromUserName[0];
    data["FromUserName"] = this.question.ToUserName[0];

    this.res.end(mustache.render(this.templates.music,data));
}

agent.news = function(){
    var data = {};
    data["ArticleCount"] = 4;
    var temp = mustache.render(this.templates.items,{"items":[
        {   "Title":"导航式聊天室",
            "Description":"A socket io embedded geo chatroom",
            "PicUrl":"http://www.hackfestindia.com/img/gallery/thumb/05.jpg",
            "Url":"geochat.mybluemix.net"
        },
        {   "Title":"女性，化妆品，八卦",
            "Description":"Look how ladies in east asia decorates their faces",
            "PicUrl":"http://www.qqw21.com/article/UploadPic/2012-9/201292582547652.jpg",
            "Url":"node-draw.mybluemix.net"
        },
        {   "Title":"音乐，时尚，跑酷",
            "Description":"Look how ladies in east asia decorates their faces",
            "PicUrl":"http://www.rockbackingtracks.co.uk/images/mj-3.gif",
            "Url":"weixinapi.mybluemix.net/video1.html"
        },
        {   "Title":"噢，原来这条新闻的图片是附件形式发过来的",
            "Description":"Look how ladies in east asia decorates their faces",
            "PicUrl":"data:image/jpeg;base64,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",
            "Url":"node-draw.mybluemix.net"
        }
    ]});

    data["CreateTime"] = new Date().getTime();
    data["ToUserName"] = this.question.FromUserName[0];
    data["FromUserName"] = this.question.ToUserName[0];
    this.res.end(mustache.render(this.templates.news,data).replace("$articles-mark",temp));
}



/**
 * Created by Robin on 10/18/2014.
 */
