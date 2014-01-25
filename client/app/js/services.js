var ser = angular.module('services',[]);
ser.factory('socket',['$rootScope',function($rootScope){
	var ws = new WebSocket("ws://127.0.0.1:8000/websocket");
	var wordOcc = {};
	var listcallback = {};
    ws.onopen = function()
    {
       ws.send("Hello");
       console.log("Message is sending...");
    };
    ws.onmessage = function (message) 
    { 
       var msg = message.data;
       console.log("Message is received...");
	   msgToWord(msg);
    };
    ws.onclose = function()
    { 
       console.log("Connection is closed..."); 
    };
	function msgToWord(data){
		var stringmsg = data.split(" ")
		for(var i = 0; i <= stringmsg.length; i++)
		{
			wordOcc[stringmsg[i]] = (wordOcc[stringmsg[i]] || 0) + 1;
		}
		$rootScope.$apply(wordOcc);
	}
	return wordOcc;
}]);