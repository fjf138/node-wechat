/**
 * Created by fjf on 2017/11/28.
 * 工具类
 */
var xml2js = require('xml2js');
var Promise = require('bluebird');
var tpl = require('./tpl');
var fs = require('fs');
var crypto = require('crypto');
var sha1 = require('sha1');

//xmlTOjs
exports.parseXMLAsync = function(xml){
    return new Promise(function(resolve, reject){
        xml2js.parseString(xml, {trim: true}, function(err, content){
            if(err) reject(err);
            else resolve(content)
        })
    })
};

//格式化消息
function formatMessage(result){
    var message = {};

    if(typeof result === 'object'){
        var keys = Object.keys(result);

        for(var i = 0; i < keys.length; i++){
            var item = result[keys[i]];
            var key = keys[i];

            if(!(item instanceof Array ) || item.length === 0){
                continue;
            }

            if(item.length === 1){
                var val = item[0];

                if(typeof val === 'object'){
                    message[key] = formatMessage(val);
                }else{
                    message[key] = (val || '').trim();
                }

            }else{
                message[key] =[];

                for(var j =0,k = item.length; j < k; j++){
                    message[key].push(formatMessage(item[j]))
                }
            }
        }

    }

    return message
}

exports.formatMessage = formatMessage;

//转换成微信普通消息xml类型
exports.tpl = function(content, message){
    var info = {};

    var type = 'text';
    var fromUserName = message.FromUserName;
    var toUserName = message.ToUserName;

    if(Array.isArray(content)){
        type = 'news'
    }

    if(typeof content === 'object')
        type = content.type || type;

    info.content = content;
    info.createTime = new Date().getTime();
    info.msgType = type;
    info.toUserName = fromUserName;
    info.fromUserName = toUserName;

    return tpl.compiled(info);
};

//读文件
exports.readFileAsync = function(fpath, encoding){
    return new Promise(function(resolve, resject){
        fs.readFile(fpath, encoding, function(err, content){
            if (err) reject(err)
            else resolve(content)
        })
    })
};

//写文件
exports.writeFileAsync = function(fpath, content){
    return new Promise(function(resolve,reject){
        fs.writeFile(fpath, content, function(err){
            if(err) reject(err)
            else resolve(content)
        })
    })
};

//生成随机字符串
var createNonce = function(){
    return Math.random().toString(36).substr(2, 15);
};

//生成时间戳
var createTimestamp = function(){
    return parseInt(new Date().getTime()/1000, 10) + '';
};

//JSSDK签名算法
var _sign = function(noncestr, ticket, timestamp, url){
    var params = ['noncestr='+noncestr,'jsapi_ticket='+ticket,'timestamp='+timestamp,'url='+url];
    var str = params.sort().join('&');
    var shasum = crypto.createHash('sha1');

    shasum.update(str);

    return shasum.digest('hex');
};

//JSSDK签名获取
exports.sign = function(ticket, url){

    var noncestr = createNonce();
    var timestamp = createTimestamp();
    var signature = _sign(noncestr, ticket, timestamp, url);

    return {
        noncestr: noncestr,
        timestamp: timestamp,
        signature: signature
    }
};

//微信sha1加密
exports.sha1 = function(token, timestamp, nonce){
    var str = [token, timestamp, nonce].sort().join('');
    return sha1(str);
};

//创建模板消息
exports.createTemplate = function(message, title, remark, keys){
    var data = {
        "first": {
            "value": title,
            "color":"#00CC12"
        },
        "remark":{
            "value": remark,
            "color":"#000000"
        }
    };

    for(var i = 1, len = keys.length; i <= len; i++){
        data[ "keyword"+i] = {
            "value": keys[i-1],
            "color":"#000000"
        }
    }
    message.data = data;

    return message;
};
