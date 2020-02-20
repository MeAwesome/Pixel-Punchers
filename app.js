var express = require("express");
var app = express();
var serv = require("http").Server(app);
var port = process.env.PORT;

app.get("/", function(req, res){
	res.sendFile(__dirname + "/public/index.html");
});
app.use("/public", express.static(__dirname + "/public"));

serv.listen(port || 3000);

var io = require("socket.io")(serv,{});
//io.on("connection", function(socket){

//});
