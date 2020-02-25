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
  gameAreaBuffer.fill(Color.felicity);
  gameAreaBuffer.circButton("testing", 100, 100, 100, Color.white);
  gameAreaBuffer.box(1080, 100, 100, Color.white);
  gameAreaBuffer.box(100, 500, 100, 100, Color.white);
  gameAreaBuffer.box(1080, 500, 100, 100, Color.white);
  gameAreaBuffer.text("testing", 200, 200, Color.blue, 50, "Arial");
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
