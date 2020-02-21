const socket = io();
const me = new Player();

setup();

function setup(){

}

socket.on("connected_to_server", (player) => {
  console.log("connected");
  me.setPlayerNumber(player.playerNumber);
  me.setPlayerNickname(player.nickname);
});
