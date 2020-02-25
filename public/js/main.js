function onLoad(){
  socket = io();
  bindSocketEvents();
  me = new Player();
  gameAreaBuffer = new Paint("gameAreaBuffer");
  gameArea = new Paint("gameArea");
}

function setup(){
  gameAreaBuffer.setSize(1280, 720);
  gameAreaBuffer.fill(Color.felicity);
  gameAreaBuffer.box(100, 100, 100, 100, Color.white);
  gameAreaBuffer.box(1080, 100, 100, 100, Color.white);
  gameAreaBuffer.box(100, 500, 100, 100, Color.white);
  gameAreaBuffer.box(1080, 500, 100, 100, Color.white);
  gameAreaBuffer.setVisibility(false);
  gameArea.setSize(window.innerWidth, window.innerHeight);
  gameArea.copyData(gameAreaBuffer, 0, 0, gameArea.canvas.width, gameArea.canvas.height);
  gameArea.setVisibility(true);
}

function bindSocketEvents(){
  socket.on("connected_to_server", (player) => {
    me.setPlayerNumber(player.playerNumber);
    me.setPlayerNickname(player.nickname);
    setup();
  });
}

window.onload = function(){
  onLoad();
}
