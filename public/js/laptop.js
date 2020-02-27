onLoad();

function onLoad(){
  socket = io();
  bindSocketEvents();
  p1 = new Player();
  game = new Paint("game");
  gameDisplay = new Paint("gameDisplay");
}

function setup(){
  game.makeBuffer(gameDisplay);
  game.setSize(1280, 720);
  game.setVisibility(false);
  player.moveTo(590, 310);
  gameDisplay.setSize(window.innerWidth, window.innerHeight);
  gameDisplay.setVisibility(true);
  tick();
}

function tick(){
  game.fill(Color.white);
  p1.draw(game);
  gameDisplay.copyData(game, 0, 0, gameDisplay.canvas.width, gameDisplay.canvas.height);
  window.requestAnimationFrame(tick);
}

function bindSocketEvents(){
  socket.on("connected_to_server", (player) => {
    setup();
  });

  socket.on("player_input", (button) => {
    switch(button){
      case "A":
        p1.move(5, 0);
        break;
      case "B":
        p1.move(0, 5);
        break;
      case "Y":
        p1.move(-5, 0);
        break;
      case "X":
        p1.move(0, -5);
        break;
      default:
        break;
    }
  });
}
