/**
 * Created by fjf on 2017/11/28.
 */

var config = require('../../config/person/config');
var jump = config.url.self + 'person/jump';

module.exports = {
    'button': [{
        "type":"view",
        "name":"目录",
        "url": config.wechat.buildUrl(jump, 'menu')
    },{
        'name': '服务',
        'sub_button':[{
            'type': 'view',
            'name': '报告',
            'url': config.wechat.buildUrl(jump, 'report')
        },{
            'type': 'view',
            'name': '档案',
            'url': config.wechat.buildUrl(jump, 'file')
        }]
    },{
        'name': '我',
        'sub_button':[{
            'type': 'view',
            'name': '个人中心',
            'url': config.wechat.buildUrl(jump, 'personalCenter')
        }]
    }]
};