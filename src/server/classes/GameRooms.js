class GameRoom {
    constructor() {
        this.roomdata = {
            metadata: {
                code: undefined,
                maxConnections: 4,
                private: false
            },
            connections:{}
        }
    }
    setRoomCode(code) {
        this.roomdata.metadata.code = code;
    }
    getRoomCode() {
        return this.roomdata.metadata.code;
    }
    addConnection(connection){
        this.roomdata.connections[connection.getId()] = connection;
    }
    removeConnection(connection){
        delete this.roomdata.connections[connection.getId()];
    }
}

class GameRooms {
    constructor() {
        this.rooms = {};
    }
    createRoom() {
        var newGeneratedRoom = new GameRoom();
        newGeneratedRoom.setRoomCode(generateRoomCode(4, false));
        this.rooms[newGeneratedRoom.getRoomCode()] = newGeneratedRoom;
    }
    getRoom(code) {
        return this.rooms[code];
    }
    deleteRoom(room) {
        delete this.rooms[room.getRoomCode()];
    }
    generateRoomCode(length, numbers) {//Generates The Unique Room Code
        var generatedCode = "";
        var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        if (numbers) {
            characters += "0123456789";
        }
        for (var i = 0; i < length; i++) {
            generatedCode += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        for (var room in this.rooms) {
            if (generatedCode == this.rooms[room].getRoomCode()) {
                generateRoomCode();
                return;
            }
        }
        return generatedCode;
    }
}

module.exports = {
    GameRoom: GameRoom,
    GameRooms: GameRooms
};