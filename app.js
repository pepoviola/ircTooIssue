 var irc = require('irc');
 var util = require('util');
 var fs = require('fs');
 var client = new irc.Client('irc.freenode.net', 'nodejsAR', {
				     channels: ['#nodejs-ar']
 });
 

 var logger = function(data){
 var d = new Date();
 var dia = d.getDate();
 var mes = d.getMonth()+1;
 var year = d.getFullYear();
 var hora = d.getHours();
 var mins = d.getMinutes();
 var file = dia+"-"+mes+"-"+year+".txt";
 data = "["+hora+":"+mins+"] "+data;
 fs.appendFile(file,data,function(err){
	 if(err){console.log(err);}
 });

 };
 
 client.addListener('message', function (from, to, message) {
	 			     console.log('MESSAGE');
				     var data = from + ' => ' + to + ': ' + message+"\n";
				     logger(data);
 });
 
	
 client.addListener('join', function (channel, nick, message) {
	 			     console.log('JOIN');
				     var data = "join to "+channel+" => "+nick+"\n";
				     logger(data);

 });
 
 client.addListener('part', function (channel, nick, message) {
	 			     console.log('PART');
				     var data = nick+" leave "+channel+"\n";
				     logger(data);

 });

 client.addListener('quit', function (nick, cmd, message) {
	 			     console.log('QUIT');
				     var data = "Quit =>"+nick+" ("+cmd+") \n";
				     logger(data);

 });

 client.addListener('error', function(message) {
				     console.log('error: ', message);
 });

 console.log("Logger Started");
// client.join('#nodejs_ar');
