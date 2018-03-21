var port = '3000';//个人微信订阅号

module.exports = {
	router: function(app){
        app.use('/person',  require('./routes/person'));
	},
    port: port
};