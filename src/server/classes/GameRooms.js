class GameRoom {
    constructor() {
        this.data = {
            metadata: {
                code: undefined
            }
        }
    }
    setRoomCode(code) {
        this.data.metadata.code = code;
    }
    getRoomCode() {
        return this.data.metadata.code;
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