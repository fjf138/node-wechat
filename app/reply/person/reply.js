/**
 * Created by fjf on 2017/11/28.
 */
var path = require('path');
var co = require('co');
var util = require('../../util/util');
var messageUtil = require('../../util/message-util');
var service = require('./service');
var config =require('../../config/person/config');

exports.reply = function(req,res,next,message){
    co(function *(){
        var body = '';

        if(message.MsgType === messageUtil.REQ_MESSAGE_TYPE_EVENT){//事件推送
            switch (message.Event){
                case messageUtil.EVENT_TYPE_SUBSCRIBE://订阅
                    body = service.welcome();
                    break;
                case messageUtil.EVENT_TYPE_UNSUBSCRIBE://取消订阅
                    console.log('取关');
                    break;
                case messageUtil.EVENT_TYPE_LOCATION://位置
                    body = '位置是： '+message.Latitude+'/'+message.Longitude+'-'+message.Precision;
                    break;
                case messageUtil.EVENT_TYPE_CLICK://点击
                    body = yield service.doEventClick({eventKey: message.EventKey});
                    break;
            }
        }else if(message.MsgType === messageUtil.REQ_MESSAGE_TYPE_TEXT){//输入文本
            var content = message.Content;
            body = yield service.keywordMessage({keyword: content});
            console.log('body',body);
        }

        var xml = "";
        if(body !== "")
        xml = util.tpl(body, message);
        console.log('返回消息类型:', xml);

        res.setHeader("Content-Type", "application/xml");
        res.end(xml);
    })
};