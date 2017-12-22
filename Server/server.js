var http = require('http');

var PORT = 80;

var server = http.createServer(function(request, response){
	response.end(Home.htm);
})

server.listen(PORT,function(){
	console.log('Server listening on port ' + PORT)
});