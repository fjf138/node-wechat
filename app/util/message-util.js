/**
 * Created by fjf on 2017/12/13.
 */
module.exports = {
    // 请求消息类型：文本
    REQ_MESSAGE_TYPE_TEXT : 'text',
    // 请求消息类型：图片
    REQ_MESSAGE_TYPE_IMAGE : 'image',
    // 请求消息类型：语音
    REQ_MESSAGE_TYPE_VOICE : 'voice',
    // 请求消息类型：视频
    REQ_MESSAGE_TYPE_VIDEO : 'video',
    // 请求消息类型：地理位置
    REQ_MESSAGE_TYPE_LOCATION : 'location',
    // 请求消息类型：链接
    REQ_MESSAGE_TYPE_LINK : 'link',
    // 请求消息类型：事件推送
    REQ_MESSAGE_TYPE_EVENT : 'event',
    // 事件类型：subscribe(订阅)
    EVENT_TYPE_SUBSCRIBE : 'subscribe',
    // 事件类型：unsubscribe(取消订阅)
    EVENT_TYPE_UNSUBSCRIBE : 'unsubscribe',
    // 事件类型：scan(用户已关注时的扫描带参数二维码)
    EVENT_TYPE_SCAN : 'SCAN',
    // 事件类型：scancode_waitmsg(扫码推事件且弹出“消息接收中”提示框的事件推送 )
    EVENT_TYPE_SCANCODE_WAITMSG : 'scancode_waitmsg',
    // 事件类型：scancode_push(扫码推事件用户点击按钮后，微信客户端将调起扫一扫工具，完成扫码操作后显示扫描结果（如果是URL，将进入URL），且会将扫码的结果传给开发者 )
    EVENT_TYPE_SCANCODE_PUSH : 'scancode_push',
    // 事件类型：pic_sysphoto(弹出系统拍照发图用户点击按钮后，微信客户端将调起系统相机，完成拍照操作后，会将拍摄的相片发送给开发者，并推送事件给开发者，同时收起系统相机)
    EVENT_TYPE_PIC_SYSPHOTO : 'pic_sysphoto',
    // 事件类型：pic_photo_or_album(弹出拍照或者相册发图用户点击按钮后，微信客户端将弹出选择器供用户选择“拍照”或者“从手机相册选择”)
    EVENT_TYPE_PIC_PHOTO_OR_ALBUM : 'pic_photo_or_album',
    // 事件类型：pic_weixin(弹出微信相册发图器用户点击按钮后，微信客户端将调起微信相册，完成选择操作后，将选择的相片发送给开发者的服务器)
    EVENT_TYPE_PIC_WEIXIN : 'pic_weixin',
    // 事件类型：location_select(弹出地理位置选择器用户点击按钮后，微信客户端将调起地理位置选择工具，完成选择操作后，将选择的地理位置发送给开发者的服务器)
    EVENT_TYPE_LOCATION_SELECT : 'location_select',
    // 事件类型：media_id(下发消息（除文本消息）用户点击media_id类型按钮后，微信服务器会将开发者填写的永久素材id对应的素材下发给用户)
    EVENT_TYPE_MEDIA_ID : 'media_id',
    // 事件类型：view_limited(跳转图文消息URL用户点击view_limited类型按钮后，微信客户端将打开开发者在按钮中填写的永久素材id对应的图文消息URL)
    EVENT_TYPE_VIEW_LIMITED : 'view_limited',
    // 事件类型：LOCATION(上报地理位置)
    EVENT_TYPE_LOCATION : 'LOCATION',
    // 事件类型：CLICK(自定义菜单)
    EVENT_TYPE_CLICK : 'CLICK',
    // 事件类型：VIEW(跳转URL)
    EVENT_TYPE_VIEW : 'VIEW',
    // 响应消息类型：文本
    RESP_MESSAGE_TYPE_TEXT : 'text',
    // 响应消息类型：图片
    RESP_MESSAGE_TYPE_IMAGE : 'image',
    // 响应消息类型：语音
    RESP_MESSAGE_TYPE_VOICE : 'voice',
    // 响应消息类型：视频
    RESP_MESSAGE_TYPE_VIDEO : 'video',
    // 响应消息类型：音乐
    RESP_MESSAGE_TYPE_MUSIC : 'music',
    // 响应消息类型：图文
    RESP_MESSAGE_TYPE_NEWS : 'news',
    // IM聊天类型：文本
    REQ_CHAT_TYPE_TEXT : '1',
    // IM聊天类型：语音
    REQ_CHAT_TYPE_VOICE : '2',
    // IM聊天类型：视频
    REQ_CHAT_TYPE_VIDEO : '3',
    // IM聊天类型：图片
    REQ_CHAT_TYPE_IMAGE : '4',
    // IM聊天类型：位置
    REQ_CHAT_TYPE_LOCATION : '5',
    // IM聊天类型：文件
    REQ_CHAT_TYPE_FILE : '6'
};