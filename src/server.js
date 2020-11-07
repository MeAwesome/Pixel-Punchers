//Server Requires & Port Setup

const express = require("express");
const os = require("os");
const app = express();
const serv = require("http").Server(app);
const io = require("socket.io")(serv,{});
const port = process.env.PORT || 52470;

//Custom Requires

const { Connection, Connections } = require(__dirname + "/server/classes/Connections.js");
const { GameRoom, GameRooms } = require(__dirname + "/server/classes/GameRooms.js");

//Server Setup & Initiation

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/public/index.html");
});
app.use("/src/public", express.static(__dirname + "/public", {
	setHeaders: function (res, path) {
		res.set("Service-Worker-Allowed", "/");
	}
}));
serv.listen(port);

if(port != process.env.PORT){
	var __ConnectTo__ = (os.networkInterfaces()["Wi-Fi"]) ? os.networkInterfaces()["Wi-Fi"][1].address + ":" + port : os.networkInterfaces()["Ethernet"][1].address + ":" + port;
	console.clear();
	console.log("--> Webpage Started On } " + __ConnectTo__);
}

const CONNECTIONS = new Connections();
const ROOMS = new GameRooms();

//Connection & Message Handling

io.on("connection", (socket) => {

	CONNECTIONS.addConnection(new Connection(socket));

	socket.on("disconnect", () => {
		CONNECTIONS.removeConnection(socket.id);
	});

});
