/**
 * Created by fjf on 2017/12/25.
 * 微信入口（健康城市测试号）
 */
var express = require('express');
var router = express.Router();
var getRawBody = require('raw-body');
var contentType = require('content-type');
var co = require('co');

var wechatApi = require('../wechat-api/wechat-api');
var util = require('../util/util');
var platformApi = require('../platform-api/person/platform-api');
var config = require('../config/person/config');
var reply = require('../reply/person/reply');
var service = require('../reply/person/service');
var wApi = new wechatApi(config.wechat);

/**
 * 微信入口
 */
router.all('/listener',function(req, res, next){
    var token = config.wechat.token;
    var signature = req.query.signature;
    var nonce = req.query.nonce;
    var timestamp = req.query.timestamp;
    var echostr = req.query.echostr;
    var sha = util.sha1(token, timestamp, nonce);
    var data = '',content;

    if(req.method === 'GET'){
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end((sha === signature) ? echostr : '');
        return res;
    }else if(req.method === 'POST'){

        if(sha !== signature){
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end((sha === signature) ? echostr : '');
            return res;
        }

        getRawBody(req, {
            length: req.headers['content-length'],
            limit: '1mb',
            encoding: contentType.parse(req).parameters.charset
        }, function (err, string) {
            if (err) return  res.end(err);

            util.parseXMLAsync(string).then(function(content){
                var message = util.formatMessage(content.xml);
                reply.reply(req, res, next, message);
            });
        })
    }
});

/**
 * 微信点击按钮进入页面入口
 */
router.all('/jump',function(req, res, next){
    co(function* (){
        // 入参:微信带来的code(用于获取openid)，和需要跳转的页面
        var state = req.query.state;// 跳转目标
        var code = req.query.code;

        if(!code){
            res.render('404', {message:'404',error:{status:'404'}});
            return;
        }

        // 获取openid
        var data = yield wApi.getOpenId(config.wechat.appID, config.wechat.appSecret, code);

        console.log('获取openId',data);
        if(!data.openid){
            res.render('404', {message:'404',error:{status:'404'}});
            return;
        }

        // 获取用户信息
        var userInfo = yield platformApi.getUserInfo(data.openid);
        console.log('获取userInfo', userInfo);

        //未登录可以选择跳转的情况
        if("disease" === state){
            if(userInfo.code == 0){
                res.redirect(301,`${config.url.hcapp}wechat/wechat?state=${state}&token=${userInfo.data.token}&openID=${data.openid}`);
            }else{
                res.redirect(301,`${config.url.hcapp}wechat/wechat?state=${state}&openID=${data.openid}`);
            }
            return;
        }

        //登录失败重新跳转登录页面
        if(userInfo.code == 10110||userInfo.code == 10105||userInfo.code == 20104){
            res.redirect(301,`${config.url.hcapp}login/login?state=${state}&openID=${data.openid}&thirdType=WX`);
            return;
        }

        //登录成功
        if(userInfo.code == 0){
            res.redirect(301,`${config.url.hcapp}wechat/wechat?state=${state}&token=${userInfo.data.token}&openID=${data.openid}`);
        }else{
            res.render('404', {message:'404',error:{status:'404'}});
        }
    })
});

//404错误
router.get('/404',function(req, res, next){
    res.render('404.html');
});

module.exports = router;