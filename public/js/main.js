function onLoad(){
  socket = io();
  bindSocketEvents();
  me = new Player();
  gameAreaBuffer = new Paint("gameAreaBuffer");
  gameArea = new Paint("gameArea");
  otherHit = false;
}

function setup(){
  gameAreaBuffer.makeBuffer(gameArea);
  gameAreaBuffer.setSize(1280, 720);
  gameAreaBuffer.fill(Color.black);
  gameAreaBuffer.circButton("A", 1080, 360, 100, Color.white);
  gameAreaBuffer.text("A", 1080, 360, Color.black, 100, "Arial", "centered");
  gameAreaBuffer.circButton("B", 980, 560, 100, Color.white);
  gameAreaBuffer.text("B", 980, 560, Color.black, 100, "Arial", "centered");
  gameAreaBuffer.setVisibility(false);
  gameArea.setSize(window.innerWidth, window.innerHeight);
  gameArea.copyData(gameAreaBuffer, 0, 0, gameArea.canvas.width, gameArea.canvas.height);
  gameArea.setVisibility(true);
  tick();
}

function tick(){
  if(gameAreaBuffer.trackingAreas[0].active == true || otherHit == true){
    if(otherHit == false){
      socket.emit("button_hit");
    }
    gameAreaBuffer.circle(100, 100, 100, Color.red);
  } else {
    socket.emit("button_unhit");
    gameAreaBuffer.circle(100, 100, 100, Color.white);
  }
  gameArea.copyData(gameAreaBuffer, 0, 0, gameArea.canvas.width, gameArea.canvas.height);
  window.requestAnimationFrame(tick);
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
