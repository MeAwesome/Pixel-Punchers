onLoad();

function onLoad(){
  socket = io();
  bindSocketEvents();
  game = new Paint("game");
  gameDisplay = new Paint("gameDisplay");
}

function setup(){
  game.makeBuffer(gameDisplay);
  game.setSize(1280, 720);
  game.setVisibility(false);
  gameDisplay.setSize(window.innerWidth, window.innerHeight);
  gameDisplay.setVisibility(true);
  tick();
}

function tick(){
  game.fill(Color.white);
  gameDisplay.copyData(game, 0, 0, gameDisplay.canvas.width, gameDisplay.canvas.height);
  window.requestAnimationFrame(tick);
}

function bindSocketEvents(){
  socket.on("connected_to_server", (player) => {
    setup();
  });

  socket.on("player_input", (button) => {
    console.log(button);
  });
}
