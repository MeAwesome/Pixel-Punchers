//Developed By: Isaac Robbins

//Single Connection

class Connection{
  constructor(socket){//Initialization
    this.socket = socket;
    socket.emit("CONNETED_TO_SERVER");
  }
  getId(){
    return this.socket.id;
  }
}

//Multiple Connections

class Connections{
  constructor(){//Initialization
    this.connections = {};
  }
  addConnection(connection){//Add A Connection
    this.connections[connection.getId()] = connection;
  }
  getConnection(id){//Return A Connection
    return this.connections[id];
  }
  removeConnection(id){//Remove A Connection
    delete this.connections[id];
  }
}

module.exports = {
  Connection:Connection,
  Connections:Connections
};