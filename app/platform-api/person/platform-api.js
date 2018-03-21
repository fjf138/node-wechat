/**
 * Created by fjf on 2017/12/12.
 */
var Promise = require('bluebird');
var config = require('../../config/person/config');
var request = Promise.promisify(require('request'));

var platform = {
  helper(opt){//通用接口请求
      return new Promise(function(resolve, reject){
          const option = {
              method: opt.method || 'POST',
              url: opt.url || '',
              json: true
          };

          if(option.method === 'POST'){
              option.body = opt.data || {};
          }

          console.log('option',option);
          request(option).then(function(response){
              console.log('接口请求结果：',response.statusCode,  response['body']);
              if(response.statusCode === 200){
                  var _data = response['body'];
                  resolve(_data);
              }else{
                  throw new Error('helper fails. url:'+opt.url);
              }
          }).catch(function(err){
              reject(err);
          })
      });
    },
    getUserInfo(openId){//获取用户信息
        console.log('openId', openId);
        return this.helper({
            url: config.url.hcapp+'oauth/verify',
            data: {
                "params":`{"thirdId": "${openId}"}`
            }
        });
    },
    getHealthKnowledge(keyword){//获取关键字自动回复（接口来自hcapp）
        return this.helper({
            url: config.url.hcapp + 'health/keywords',
            data:{
                'keywords': keyword
            }
        });
    }
};

module.exports = platform;