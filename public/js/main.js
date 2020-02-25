const socket = io();
const me = new Player();

function setup(){

}

socket.on("connected_to_server", (player) => {
  me.setPlayerNumber(player.playerNumber);
  me.setPlayerNickname(player.nickname);
  setup();
});
