onLoad();

var x = 400;
var y = 400;

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
  game.box(x, y, 100, 100);
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
        x+=5;
        break;
      case "B":
        y+=5;
        break;
      case "Y":
        x-=5;
        break;
      case "X":
        y-=5;
        break;
      default:
        break;
    }
  });
}
