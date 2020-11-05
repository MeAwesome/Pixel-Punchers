//Server Requires & Port Setup

const express = require("express");
const os = require("os");
const app = express();
const serv = require("http").Server(app);
const io = require("socket.io")(serv,{});
const port = process.env.PORT || 52470;

//Custom Requires

const _ = require("underscore");
const Network = require("./server/classes/Network.js");

//Server Setup & Initiation

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/public/index.html");
});
app.use("/public", express.static(__dirname + "/public"));
serv.listen(port);

if(port != process.env.PORT){
	var __ConnectTo__ = (os.networkInterfaces()["Wi-Fi"]) ? os.networkInterfaces()["Wi-Fi"][1].address + ":" + port : os.networkInterfaces()["Ethernet"][1].address + ":" + port;
	console.clear();
	console.log("--> Webpage Started On } " + __ConnectTo__);
}

//Connection & Message Handling

io.on("connection", (socket) => {

	new Network.connection(socket);

	socket.on("disconnect", () => {
		Network.connections.getConnection(socket.id).terminate();
	});

	socket.on("create_room", () => {
		if(Network.connections.getConnection(socket.id).room == undefined){
			var r = new Network.room();
			Network.connections.getConnection(socket.id).joinRoom(r.getCode());
		}
	});

	socket.on("join_room", (code) => {
		Network.connections.getConnection(socket.id).joinRoom(code);
	});

	socket.on("leave_room", () => {
		Network.connections.getConnection(socket.id).leaveRoom();
	});

	socket.on("find_rooms", () => {
		var open_rooms = [];
		for(var room in rooms){
			if(rooms[room].canJoin()){
				open_rooms.push(room);
			}
		}
		socket.emit("found_rooms", open_rooms);
	});

});