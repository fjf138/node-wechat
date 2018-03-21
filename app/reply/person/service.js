/**
 * Created by fjf on 2017/12/13.
 */
var platformApi = require('../../platform-api/person/platform-api');
var util = require('../../util/util');
var config = require('../../config/person/config');

var service = {
    keywordMessage(opt){// 关键字自动回复
        return new Promise(function(resolve, reject){

            platformApi.getHealthKnowledge(opt.keyword).then(function(result){
                if(result.code == 0){
                    var reply = [], data = result.data.data;

                    if(data.length === 0){
                        resolve('');
                    }

                    for(var i = 0, len = data.length; i < len; i++){
                        var obj = {
                            title: data[i].healthEducationTitle,
                            description: data[i].briefContent,
                            picUrl: config.url.hcapp + data[i].pictureUrl,
                            url: data[i].isWx == 1?data[i].wxUrl:config.url.hcapp + data[i].contentUrl+data[i].id
                        };
                        reply.push(obj);
                    }
                    resolve(reply);
                }else{
                    console.log('关键字自动回复报错,错误信息：', result);
                    reject(result);
                }
            })
        })
    },
    welcome(){//订阅
        return "您好！欢迎关注";
    },
    doEventClick(opt){//点击推送
        switch (opt.eventKey){
            case "signed":
                return this.signed();
                break;
        }
    },
    signed(){//推送图文
        return [
            {
                title: '预约',
                picUrl: config.url.self + 'images/sign.jpg',
                url: config.wechat.buildUrl(config.url.self+'jump', 'sign')
            },
            {
                title: '申请',
                url: config.wechat.buildUrl(config.url.self+'jump', 'application')
            }
        ]
    },
    sendMes(content, wechatApi){//推送模板信息
        content = JSON.parse(content);
        var remark = content.remark,
            key = content.key,
            title = content.title,
            openId = content.openId,
            extendData = JSON.parse(content.extendData);
        var message = {
            "touser": openId,
            "template_id":config.templateId[key]
        };

        switch(key){
            case 'test':
                message = util.createTemplate(message, title, remark, [extendData.status, extendData.docName, extendData.deptName, extendData.userName, extendData.time]);
                break;
        }

        return new Promise(function(resolve, reject){
            console.log('message', message);
            wechatApi.sendTemplate(message).then(function(result){
                console.log('result', result);
                if(result.errcode == 0){
                    resolve({
                        resultType: 1,
                        message: '微信消息发送成功',
                        result: 'true'
                    });
                }else{
                    console.log('发送模板消息报错,错误信息：', result);
                    resolve({
                        resultType: 0,
                        message: '微信消息发送失败',
                        result: 'false'
                    });
                }
            })
        })
    }
};

module.exports = service;