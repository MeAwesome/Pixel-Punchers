var express = require("express");
var os = require("os");
var app = express();
var serv = require("http").Server(app);
var io = require("socket.io")(serv,{});
var port = process.env.PORT || 52470;
app.get("/", function(req, res){
	res.sendFile(__dirname + "/public/index.html");
});
app.use("/public", express.static(__dirname + "/public"));
serv.listen(port);
if(port != process.env.PORT){
	var __ConnectTo__ = os.networkInterfaces()["Wi-Fi"][1].address + ":" + port;
	console.clear();
	console.log("--> Webpage Started On } " + __ConnectTo__);
}



var connections = {};
var rooms = [];

io.on("connection", function(socket){

	connections[socket.id] = {
		socket:socket,
		isHost:false
	};
	socket.emit("connected_to_server");

	socket.on("disconnect", () => {
		if(connections[socket.id].isHost == true){
			rooms.splice(getHostRoom(socket.id), 1);
		}
	});

	socket.on("new_host", () => {
		connections[socket.id].isHost = true;
		rooms.push({
			host:socket.id,
			code:generateRoomCode(),
			players:[]
		});
		socket.emit("room_data", getHostRoom(socket.id));
	});

	socket.on("new_controller", (code) => {
		for(var r = 0; r < rooms.length; r++){
			if(code == rooms[r].code){
				rooms[r].players.push(socket.id);
				connections[rooms[r].host].socket.emit("room_data", getHostRoom(rooms[r].host));
				socket.emit("connected_to_room");
				return;
			}
		}
		socket.emit("invalid_room");
	});

	socket.on("button_hit", (button) => {
		socket.broadcast.emit("player_input", {
			type:"button",
			button:button
		});
	});

	socket.on("joystick_moved", (values) => {
		socket.broadcast.emit("player_input", {
			type:"joystick",
			values:values
		});
	});

	socket.on("player_update", (data) => {

	});

});

function generateRoomCode(){
	var code = "";
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for(var i = 0; i < 4; i++){
   	code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
	for(var c = 0; c < rooms.length; c++){
		if(code == rooms[c].code){
			generateRoomCode();
			return;
		}
	}
  return code;
}

function getHostRoom(id){
	for(var r = 0; r < rooms.length; r++){
		if(id == rooms[r].host){
			return rooms[r];
		}
	}
}

function Player(socket){
	this.id = socket.id;
	this.playerNumber = players.length;
	this.nickname = "Player " + (players.length + 1);
}
