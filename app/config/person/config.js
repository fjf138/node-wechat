/**
 * Created by fjf on 2017/11/28.
 *
 */
var path =require('path');
var util = require('../../util/util');
var wechat_file = path.join(__dirname, './wechat.txt');
var wechat_ticket_file = path.join(__dirname, './wechat_ticket.txt');

var config = {
    wechat: {
        appID: '你的appID',
        appSecret: '你的appSecret',
        token: 'ijhealth',
        getAccessToken: function(){
            return util.readFileAsync(wechat_file);
        },
        saveAccessToken: function(data){
            data = JSON.stringify(data);
            return util.writeFileAsync(wechat_file, data);
        },
        getTicket: function(){
            return util.readFileAsync(wechat_ticket_file);
        },
        saveTicket: function(data){
            data = JSON.stringify(data);
            return util.writeFileAsync(wechat_ticket_file, data);
        },
        buildUrl: function(url, state){//获取网页授权
            url = encodeURIComponent(url);
            var appID = this.appID;
            return `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appID}&redirect_uri=${url}&response_type=code&scope=snsapi_base&state=${state}#wechat_redirect`;
        }
    },
    url:{
        self: 'http://localhost:3000/',//自身地址
        hcapp: 'http://localhost:3100/'//服务项目
    },
    templateId:{//模板id
        test: 'uol0PK6vNz-E6f8FTFjS41yUdtgXJOTq45EGkB92eiY',//测试模板
    }
};

module.exports = config;