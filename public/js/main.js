function onLoad(){
  socket = io();
  bindSocketEvents();
  me = new Player();
  game = new Paint("game");
  gameDisplay = new Paint("gameDisplay");
  otherHit = false;
}

function setup(){
  game.makeBuffer(gameDisplay);
  game.setSize(1280, 720);
  drawController();
  game.setVisibility(false);
  gameDisplay.setSize(window.innerWidth, window.innerHeight);
  gameDisplay.setVisibility(true);
  tick();
}

function tick(){
  if(game.getButtonState("A") == true || otherHit == true){
    if(otherHit == false){
      socket.emit("button_hit");
    }
    game.circle(100, 100, 100, Color.red);
  } else {
    socket.emit("button_unhit");
    game.circle(100, 100, 100, Color.white);
  }
  gameDisplay.copyData(game, 0, 0, gameDisplay.canvas.width, gameDisplay.canvas.height);
  window.requestAnimationFrame(tick);
}

function drawController(){
  game.fill(Color.black);
  game.circButton("A", 1140, 360, 100, Color.white);
  game.text("A", 1140, 360, Color.black, 100, "Arial", "centered");
  game.circButton("B", 980, 560, 100, Color.white);
  game.text("B", 980, 560, Color.black, 100, "Arial", "centered");
  game.circButton("Y", 820, 360, 100, Color.white);
  game.text("Y", 820, 360, Color.black, 100, "Arial", "centered");
  game.circButton("X", 980, 160, 100, Color.white);
  game.text("X", 980, 160, Color.black, 100, "Arial", "centered");
}

function bindSocketEvents(){
  socket.on("connected_to_server", (player) => {
    me.setPlayerNumber(player.playerNumber);
    me.setPlayerNickname(player.nickname);
    setup();
  });

  socket.on("player_hit_button", () => {
    otherHit = true;
  });

  socket.on("player_unhit_button", () => {
    otherHit = false;
  });
}

window.onload = function(){
  onLoad();
  window.addEventListener("resize", () => {
    gameDisplay.setSize(window.innerWidth, window.innerHeight);
    game.removeTrackingAreas();
    drawController();
  });
  window.addEventListener("orientationchange", () => {
    gameDisplay.setSize(window.innerWidth, window.innerHeight);
    game.removeTrackingAreas();
    drawController();
  });
  window.addEventListener("touchstart", (e) => {
		e.preventDefault();
		checkPaintTouches(e);
	}, false);
	window.addEventListener("touchmove", (e) => {
		e.preventDefault();
		checkPaintTouches(e);
	}, false);
	window.addEventListener("touchend", (e) => {
		e.preventDefault();
		checkPaintTouches(e);
	}, false);
	window.addEventListener("touchcancel", (e) => {
		e.preventDefault();
		checkPaintTouches(e);
	}, false);
}
