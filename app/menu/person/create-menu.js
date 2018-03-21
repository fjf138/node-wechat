/**
 * Created by fjf on 2017/11/28.
 */
var Wechat = require('../../wechat-api/wechat-api');
var menu = require('./menu');
var config =require('../../config/person/config');
var wechatApi = new Wechat(config.wechat);

function initMenu(){
    wechatApi.createMenu(menu).then(function(msg){
        if(!msg.errcode){
            console.log('创建菜单成功！');
        }else{
            console.log('创建菜单失败！',msg);
        }
    },function(msg){
        console.log('创建菜单失败！',msg);
    })
}

initMenu();