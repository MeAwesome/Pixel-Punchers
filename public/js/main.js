const socket = io();
const me = new Player();

setup();

function setup(){

}

socket.on("connected_to_server", () => {
  console.log("connected");
});
