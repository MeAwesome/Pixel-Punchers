//Server Requires & Port Setup

import express, { static } from "express";
import { networkInterfaces } from "os";
const app = express();
const serv = require("http").Server(app);
const io = require("socket.io")(serv,{});
const port = process.env.PORT || 52470;

//Custom Requires

import _ from "underscore";
import { connection, connections, room as _room } from "./server/classes/Network.js";
import { GameRoom, GameRooms } from "./server/classes/GameRooms.js";

//Server Setup & Initiation

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/public/index.html");
});
app.use("/public", static(__dirname + "/public"));
serv.listen(port);

if(port != process.env.PORT){
	var __ConnectTo__ = (networkInterfaces()["Wi-Fi"]) ? networkInterfaces()["Wi-Fi"][1].address + ":" + port : networkInterfaces()["Ethernet"][1].address + ":" + port;
	console.clear();
	console.log("--> Webpage Started On } " + __ConnectTo__);
}

const rooms = new GameRooms();

//Connection & Message Handling

io.on("connection", (socket) => {

	new connection(socket);

	socket.on("disconnect", () => {
		connections.getConnection(socket.id).terminate();
	});

	socket.on("create_room", () => {
		if(connections.getConnection(socket.id).room == undefined){
			var r = new _room();
			connections.getConnection(socket.id).joinRoom(r.getCode());
		}
	});

	socket.on("join_room", (code) => {
		connections.getConnection(socket.id).joinRoom(code);
	});

	socket.on("leave_room", () => {
		connections.getConnection(socket.id).leaveRoom();
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
