var express = require("express");
var app = express();
var serv = require("http").Server(app);
var io = require("socket.io")(serv,{});
var port = process.env.PORT;

app.get("/", function(req, res){
	res.sendFile(__dirname + "/public/index.html");
});
app.use("/public", express.static(__dirname + "/public"));

serv.listen(port || 3000);

var players = [];

io.on("connection", function(socket){

	var player = new Player(socket);
	players.push(player);
	socket.emit("connected_to_server", player);

	socket.on("disconnect", () => {
		for(var player = 0; player < players.length; player++){
			if(players[player].id == socket.id){
				players.splice(player, 1);
				//socket.broadcast.emit("player_disconnection", socket.id);
			}
		}
	});

	socket.on("player_update", (data) => {

	});

});

function Player(socket){
	this.id = socket.id;
	this.playerNumber = players.length++;
	this.nickname = "Player " + players.length++;
}
