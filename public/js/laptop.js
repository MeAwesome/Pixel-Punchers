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
        x++;
        break;
      case "B":
        y++;
        break;
      case "Y":
        x--;
        break;
      case "X":
        y--;
        break;
      default:
        break;
    }
  });
}
